import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AstrologyPage = () => {
  const { getToken, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [kundliData, setKundliData] = useState(null);
  const [panchangData, setPanchangData] = useState(null);
  const [activeView, setActiveView] = useState('form');
  const [gettingLocation, setGettingLocation] = useState(false);
  const [searchingCity, setSearchingCity] = useState(false);
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const [formData, setFormData] = useState({
    date: '', month: '', year: '', hour: '', minute: '',
    latitude: '', longitude: '', timezone: '5.5',
    city: ''
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://nakshatraganak-backend.vercel.app/api';

  const api = axios.create({ baseURL: API_BASE_URL });
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  useEffect(() => {
    const pendingData = localStorage.getItem('pending_kundli_data');
    if (pendingData && isAuthenticated) {
      const data = JSON.parse(pendingData);
      localStorage.removeItem('pending_kundli_data');
      setPendingFormData(data);
      setShowPaymentModal(true);
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    
    setGettingLocation(true);
    toast.loading('Getting your location...', { id: 'location' });
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('📍 Location received:', latitude, longitude);
        
        setFormData(prev => ({
          ...prev,
          latitude: latitude.toFixed(6),
          longitude: longitude.toFixed(6)
        }));
        
        toast.success(`Location set: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`, { id: 'location' });
        setGettingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Unable to get location';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please allow location access and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Please enter manually.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
        }
        
        toast.error(errorMessage, { id: 'location' });
        setGettingLocation(false);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 0 
      }
    );
  };

  const searchCity = async () => {
    if (!formData.city.trim()) return toast.error('Enter city name');
    setSearchingCity(true);
    try {
      const res = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: formData.city, format: 'json', limit: 1 }
      });
      if (res.data?.length > 0) {
        const loc = res.data[0];
        setFormData(prev => ({
          ...prev,
          latitude: parseFloat(loc.lat).toFixed(6),
          longitude: parseFloat(loc.lon).toFixed(6)
        }));
        toast.success(`✅ ${loc.display_name.split(',')[0]} selected`);
      } else toast.error('City not found');
    } catch (err) {
      toast.error('Search failed');
      console.log(err);
    } finally {
      setSearchingCity(false);
    }
  };

  const popularCities = [
    { name: 'Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
    { name: 'Jaipur', lat: 26.9124, lon: 75.7873 },
    { name: 'Lucknow', lat: 26.8467, lon: 80.9462 },
    { name: 'Pune', lat: 18.5204, lon: 73.8567 },
    { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 }
  ];

  const selectPopularCity = (city) => {
    setFormData(prev => ({
      ...prev,
      city: city.name,
      latitude: city.lat.toString(),
      longitude: city.lon.toString()
    }));
    toast.success(`${city.name} selected`);
  };

  const generate = async (e) => {
    e.preventDefault();
    
    const token = getToken();
    if (!token && !isAuthenticated) {
      const requestData = {
        date: parseInt(formData.date),
        month: parseInt(formData.month),
        year: parseInt(formData.year),
        hour: parseInt(formData.hour),
        minute: parseInt(formData.minute),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        timezone: parseFloat(formData.timezone)
      };
      localStorage.setItem('pending_kundli_data', JSON.stringify(requestData));
      localStorage.setItem('redirect_after_login', '/astrology');
      toast.error('Please login to generate Kundli');
      navigate('/auth');
      return;
    }
    
    const dateNum = parseInt(formData.date);
    const monthNum = parseInt(formData.month);
    const yearNum = parseInt(formData.year);
    const hourNum = parseInt(formData.hour);
    const minuteNum = parseInt(formData.minute);
    const latNum = parseFloat(formData.latitude);
    const lonNum = parseFloat(formData.longitude);
    
    if (isNaN(dateNum) || dateNum < 1 || dateNum > 31) {
      toast.error('Please enter a valid date (1-31)');
      return;
    }
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      toast.error('Please enter a valid month (1-12)');
      return;
    }
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear()) {
      toast.error(`Please enter a valid year (1900-${new Date().getFullYear()})`);
      return;
    }
    if (isNaN(hourNum) || hourNum < 0 || hourNum > 23) {
      toast.error('Please enter a valid hour (0-23)');
      return;
    }
    if (isNaN(minuteNum) || minuteNum < 0 || minuteNum > 59) {
      toast.error('Please enter a valid minute (0-59)');
      return;
    }
    if (isNaN(latNum) || isNaN(lonNum)) {
      toast.error('Please select a location (use popular cities or search)');
      return;
    }
    if (formData.date === '' || formData.month === '' || formData.year === '' || 
        formData.hour === '' || formData.minute === '' || 
        formData.latitude === '' || formData.longitude === '') {
      toast.error('Please fill all fields');
      return;
    }

    const requestData = {
      date: dateNum, month: monthNum, year: yearNum,
      hour: hourNum, minute: minuteNum,
      latitude: latNum, longitude: lonNum,
      timezone: parseFloat(formData.timezone)
    };
    
    setPendingFormData(requestData);
    setShowPaymentModal(true);
  };

  const generateKundli = async (data) => {
    setLoading(true);
    try {
      const res = await api.post('/astrology/generate', data);
      if (res.data.success) {
        const kundli = res.data.kundli;
        const panchang = res.data.panchang;
        
        setKundliData(kundli);
        setPanchangData(panchang);
        setActiveView('kundli');
        
        try {
          const saveRes = await api.post('/astrology/save-purchased-kundli', {
            kundliData: kundli,
            panchangData: panchang,
            birthDetails: data
          });
          if (saveRes.data.success) {
            console.log('✅ Kundli saved to profile');
          }
        } catch (saveErr) {
          console.error('Failed to save kundli to profile:', saveErr);
        }
        
        toast.success('✨ Kundli Generated & Saved to Your Profile!');
      } else {
        toast.error(res.data.message || 'Failed to generate Kundli');
      }
    } catch (err) {
      console.error('Generation error:', err);
      if (err.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        navigate('/auth');
      } else {
        toast.error('Error generating kundli. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderRes = await api.post('/kundlipayments/create-order', {
        amount: 99,
        currency: 'INR'
      });
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        name: 'Nakshatra Ganak',
        description: 'Kundli Generation Service',
        order_id: orderRes.data.id,
        handler: async (response) => {
          const verifyRes = await api.post('/kundlipayments/verify-payment', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });
          
          if (verifyRes.data.success) {
            setShowPaymentModal(false);
            toast.success('Payment successful! Generating your Kundli...');
            generateKundli(pendingFormData);
          } else {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: user?.fullName || '',
          email: user?.email || ''
        },
        theme: { color: '#667eea' }
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!kundliData) return;
    
    setLoading(true);
    try {
      const res = await api.post('/astrology/download-pdf', {
        kundliData,
        panchangData,
        userDetails: {
          name: user?.fullName || 'User',
          email: user?.email || '',
          birthDetails: pendingFormData || {
            date: formData.date,
            month: formData.month,
            year: formData.year,
            hour: formData.hour,
            minute: formData.minute
          }
        }
      }, { responseType: 'blob' });
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `kundli_${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('PDF downloaded successfully!');
    } catch (err) {
      console.error('Download error:', err);
      toast.error('Failed to download PDF');
    } finally {
      setLoading(false);
    }
  };

  const PaymentModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>💰 Unlock Your Complete Kundli</h2>
        <p>Get detailed analysis including:</p>
        <ul style={{ textAlign: 'left', marginBottom: '20px' }}>
          <li>✓ Complete birth chart analysis</li>
          <li>✓ Planetary positions with degrees</li>
          <li>✓ Dasha predictions</li>
          <li>✓ Remedies and suggestions</li>
          <li>✓ Downloadable PDF report</li>
        </ul>
        <div style={styles.price}>₹99</div>
        <button onClick={handlePayment} disabled={loading} style={styles.payBtn}>
          {loading ? 'Processing...' : 'Pay ₹99 & Generate'}
        </button>
        <button onClick={() => setShowPaymentModal(false)} style={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );

  const getValue = (obj, keys, defaultValue = 'N/A') => {
    if (!obj) return defaultValue;
    const keyArray = Array.isArray(keys) ? keys : [keys];
    for (const key of keyArray) {
      if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
        return obj[key];
      }
    }
    return defaultValue;
  };

  const renderForm = () => (
    <div style={styles.formContainer}>
      <h1 style={styles.title}>🔮 Generate Kundli & Panchang</h1>

      <form onSubmit={generate}>
        <div style={styles.section}>
          <h3>📅 Date of Birth</h3>
          <div style={styles.row}>
            <input type="number" name="date" placeholder="DD" value={formData.date} onChange={handleChange} style={styles.input} required />
            <input type="number" name="month" placeholder="MM" value={formData.month} onChange={handleChange} style={styles.input} required />
            <input type="number" name="year" placeholder="YYYY" value={formData.year} onChange={handleChange} style={styles.input} required />
          </div>
        </div>

        <div style={styles.section}>
          <h3>⏰ Time of Birth</h3>
          <div style={styles.row}>
            <input type="number" name="hour" placeholder="Hour (0-23)" value={formData.hour} onChange={handleChange} style={styles.input} required />
            <input type="number" name="minute" placeholder="Minute (00-59)" value={formData.minute} onChange={handleChange} style={styles.input} required />
            <select name="timezone" value={formData.timezone} onChange={handleChange} style={styles.input}>
              <option value="5.5">India (IST) +5:30</option>
              <option value="0">UTC</option>
            </select>
          </div>
        </div>

        <div style={styles.section}>
          <h3>📍 Place of Birth</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <p style={{ marginBottom: '8px', fontWeight: '600' }}>Popular Cities:</p>
            <div style={styles.cityGrid}>
              {popularCities.map((city, i) => (
                <button key={i} type="button" onClick={() => selectPopularCity(city)} style={styles.cityChip}>
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.row}>
            <input type="text" name="city" placeholder="Enter City Name" value={formData.city} onChange={handleChange} style={styles.input} />
            <button type="button" onClick={searchCity} disabled={searchingCity} style={styles.cityBtn}>
              {searchingCity ? 'Searching...' : '🔍 Search'}
            </button>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <input type="number" step="any" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} style={styles.input} required />
            </div>
            <div style={styles.inputGroup}>
              <input type="number" step="any" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} style={styles.input} required />
            </div>
            <div style={styles.inputGroup}>
              <button type="button" onClick={getCurrentLocation} disabled={gettingLocation} style={styles.locationBtn}>
                {gettingLocation ? '⏳ Getting...' : '📍 My Current Location'}
              </button>
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? 'Generating...' : '✨ Generate Kundli (₹99) ✨'}
        </button>
      </form>
    </div>
  );

  const renderKundli = () => {
    const data = kundliData || {};
    
    return (
      <div style={styles.resultContainer}>
        <div style={styles.header}>
          <h2>📊 Your Kundli</h2>
          <div>
            <button onClick={() => setActiveView('panchang')} style={styles.switchBtn}>📅 Panchang</button>
            <button onClick={() => setActiveView('form')} style={styles.backBtn}>← New</button>
          </div>
        </div>

        {data && (
          <>
            <div style={styles.ascendantCard}>
              <h3>🌅 Lagna (Ascendant)</h3>
              <div style={styles.ascendantValue}>
                {getValue(data, ['ascendant_sign', 'lagna', 'ascendant', 'sign'], 'N/A')}
              </div>
            </div>

            <h3 style={styles.sectionTitle}>⭐ Rashi (Moon Sign)</h3>
            <div style={styles.specialCard}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#667eea' }}>
                {getValue(data, ['sign', 'rashi', 'moon_sign', 'zodiac'], 'N/A')}
              </div>
            </div>

            <h3 style={styles.sectionTitle}>⭐ Nakshatra (Birth Star)</h3>
            <div style={styles.specialCard}>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#667eea' }}>
                {getValue(data, ['nakshatra', 'Naksahtra', 'nakshstra', 'star'], 'N/A')}
              </div>
              <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><strong>Lord:</strong> {getValue(data, ['nakshatra_lord', 'NaksahtraLord', 'lord'], 'N/A')}</div>
                <div><strong>Pada/Charan:</strong> {getValue(data, ['pada', 'Charan', 'charan'], 'N/A')}</div>
              </div>
            </div>

            <div style={{
              background: getValue(data, ['manglik', 'Manglik', 'is_manglik'], 'No') === 'Yes' ? '#ff4444' : '#4caf50',
              color: 'white', padding: '18px', borderRadius: '12px', marginBottom: '25px', textAlign: 'center'
            }}>
              <h3>🔴 Manglik Dosha</h3>
              <div style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>
                {getValue(data, ['manglik', 'Manglik', 'is_manglik'], 'Non-Manglik')}
              </div>
            </div>

            <h3 style={styles.sectionTitle}>📖 Vedic Astrological Details</h3>
            <div style={styles.grid}>
              <div style={styles.planetCard}><strong>🧘 Yoga:</strong> {getValue(data, ['yoga', 'yog', 'Yog'], 'N/A')}</div>
              <div style={styles.planetCard}><strong>📖 Tithi:</strong> {getValue(data, ['tithi', 'Tithi'], 'N/A')}</div>
              <div style={styles.planetCard}><strong>🌊 Karana:</strong> {getValue(data, ['karana', 'Karan'], 'N/A')}</div>
              <div style={styles.planetCard}><strong>👨‍👩‍👧 Gan:</strong> {getValue(data, ['gan', 'Gan'], 'N/A')}</div>
              <div style={styles.planetCard}><strong>💫 Nadi:</strong> {getValue(data, ['nadi', 'Nadi'], 'N/A')}</div>
              <div style={styles.planetCard}><strong>🎨 Varna:</strong> {getValue(data, ['varna', 'Varna'], 'N/A')}</div>
              <div style={styles.planetCard}><strong>🤝 Vashya:</strong> {getValue(data, ['vashya', 'Vashya'], 'N/A')}</div>
              <div style={styles.planetCard}><strong>🐘 Yoni:</strong> {getValue(data, ['yoni', 'Yoni'], 'N/A')}</div>
              <div style={styles.planetCard}><strong>👑 Sign Lord:</strong> {getValue(data, ['sign_lord', 'SignLord'], 'N/A')}</div>
              <div style={styles.planetCard}><strong>🌍 Tatva:</strong> {getValue(data, ['tatva', 'element'], 'N/A')}</div>
              <div style={styles.planetCard}><strong>💰 Paya:</strong> {getValue(data, ['paya'], 'N/A')}</div>
              <div style={styles.planetCard}><strong>🔤 Name Alphabet:</strong> {getValue(data, ['name_alphabet'], 'N/A')}</div>
            </div>

            {(data.planets && Object.keys(data.planets).length > 0) && (
              <>
                <h3 style={styles.sectionTitle}>🪐 Planetary Positions</h3>
                <div style={styles.planetsGrid}>
                  {Object.entries(data.planets).map(([planet, info]) => (
                    <div key={planet} style={styles.planetDetailCard}>
                      <div style={{ fontWeight: 'bold', color: '#667eea' }}>{planet.toUpperCase()}</div>
                      <div>Sign: {info.sign || 'N/A'}</div>
                      <div>Degree: {info.degree || 'N/A'}°</div>
                      <div>House: {info.house || 'N/A'}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {(data.houses && data.houses.length > 0) && (
              <>
                <h3 style={styles.sectionTitle}>🏠 Houses (Bhavas)</h3>
                <div style={styles.housesGrid}>
                  {data.houses.slice(0, 12).map((house, i) => (
                    <div key={i} style={styles.houseCard}>
                      <div style={{ fontWeight: 'bold', color: '#667eea' }}>House {i+1}</div>
                      <div>{house.sign || 'N/A'}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {(data.dasha || data.current_dasha) && (
              <div style={styles.dashaCard}>
                <h3>⏳ Current Vimshottari Dasha</h3>
                <div style={styles.dashaGrid}>
                  <div><strong>Maha Dasha:</strong> {getValue(data, ['dasha.maha_dasha', 'current_dasha.maha_dasha'], 'N/A')}</div>
                  <div><strong>Antar Dasha:</strong> {getValue(data, ['dasha.antar_dasha', 'current_dasha.antar_dasha'], 'N/A')}</div>
                  <div><strong>Valid Until:</strong> {getValue(data, ['dasha.end_date', 'current_dasha.end_date'], 'N/A')}</div>
                </div>
              </div>
            )}

            <button onClick={downloadPDF} disabled={loading} style={styles.downloadBtn}>
              {loading ? 'Generating PDF...' : '📥 Download PDF Report'}
            </button>
          </>
        )}
      </div>
    );
  };

  const renderPanchang = () => {
    const data = panchangData || {};
    
    return (
      <div style={styles.resultContainer}>
        <div style={styles.header}>
          <h2>📅 Daily Panchang</h2>
          <div>
            <button onClick={() => setActiveView('kundli')} style={styles.switchBtn}>📊 Kundli</button>
            <button onClick={() => setActiveView('form')} style={styles.backBtn}>← New</button>
          </div>
        </div>

        {data && (
          <>
            <div style={styles.sunTimes}>
              <div style={styles.sunCard}>🌅 Sunrise: {getValue(data, ['sunrise', 'Sunrise'], 'N/A')}</div>
              <div style={styles.sunCard}>🌇 Sunset: {getValue(data, ['sunset', 'Sunset'], 'N/A')}</div>
              <div style={styles.sunCard}>🌙 Moonrise: {getValue(data, ['moonrise', 'Moonrise'], 'N/A')}</div>
              <div style={styles.sunCard}>🌚 Moonset: {getValue(data, ['moonset', 'Moonset'], 'N/A')}</div>
            </div>

            <div style={styles.panchangGrid}>
              <div style={styles.panchangCard}>📖 Tithi: {getValue(data, ['tithi', 'Tithi'], 'N/A')}</div>
              <div style={styles.panchangCard}>⭐ Nakshatra: {getValue(data, ['nakshatra', 'Naksahtra'], 'N/A')}</div>
              <div style={styles.panchangCard}>🧘 Yoga: {getValue(data, ['yog', 'yoga', 'Yog'], 'N/A')}</div>
              <div style={styles.panchangCard}>🌊 Karana: {getValue(data, ['karan', 'Karan'], 'N/A')}</div>
            </div>

            <div style={styles.panchangGrid}>
              <div style={styles.muhuratCard}>🔴 Rahu Kaal: {getValue(data, ['rahukaal', 'Rahukaal', 'rahukal'], 'N/A')}</div>
              <div style={styles.muhuratCard}>🟡 Yamaganda: {getValue(data, ['yamaganda', 'Yamaganda'], 'N/A')}</div>
              <div style={styles.muhuratCard}>🟢 Gulika: {getValue(data, ['gulika', 'Gulika'], 'N/A')}</div>
              <div style={styles.muhuratCard}>📅 Paksha: {getValue(data, ['paksha', 'Paksha'], 'N/A')}</div>
            </div>

            <div style={styles.additionalInfo}>
              <div><strong>🌸 Ritu:</strong> {getValue(data, ['ritu', 'Ritu'], 'N/A')}</div>
              <div><strong>☀️ Ayana:</strong> {getValue(data, ['ayana', 'Ayana'], 'N/A')}</div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {activeView === 'form' && renderForm()}
        {activeView === 'kundli' && kundliData && renderKundli()}
        {activeView === 'panchang' && panchangData && renderPanchang()}
      </div>
      {showPaymentModal && <PaymentModal />}
    </div>
  );
};

// ✅ ONLY CSS CHANGED - Responsive styles added
const styles = {
  page: { 
    minHeight: '100vh', 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
    padding: 'clamp(20px, 5vw, 40px) 0' 
  },
  container: { 
    maxWidth: '1200px', 
    margin: '0 auto', 
    padding: '0 clamp(15px, 4vw, 20px)' 
  },
  formContainer: { 
    background: 'white', 
    borderRadius: 'clamp(15px, 4vw, 20px)', 
    padding: 'clamp(20px, 5vw, 40px)', 
    maxWidth: '1000px', 
    margin: '0 auto', 
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)' 
  },
  resultContainer: { 
    background: 'white', 
    borderRadius: 'clamp(15px, 4vw, 20px)', 
    padding: 'clamp(20px, 5vw, 40px)', 
    margin: '0 auto', 
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)' 
  },
  title: { 
    textAlign: 'center', 
    color: '#667eea', 
    marginBottom: 'clamp(20px, 5vw, 30px)', 
    fontSize: 'clamp(1.5rem, 6vw, 2.2rem)' 
  },
  section: { 
    background: '#f8f9fa', 
    padding: 'clamp(15px, 4vw, 25px)', 
    borderRadius: '15px', 
    marginBottom: '25px' 
  },
  sectionTitle: { 
    color: '#667eea', 
    marginTop: 'clamp(20px, 4vw, 30px)', 
    marginBottom: '15px', 
    fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', 
    borderLeft: '4px solid #667eea', 
    paddingLeft: '15px' 
  },
  row: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
    gap: '15px' 
  },
  inputGroup: { 
    display: 'flex', 
    flexDirection: 'column' 
  },
  input: { 
    padding: '12px', 
    border: '2px solid #e0e0e0', 
    borderRadius: '8px', 
    fontSize: 'clamp(14px, 3vw, 16px)' 
  },
  locationBtn: { 
    padding: '12px', 
    background: '#ffd700', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    width: '100%'
  },
  cityBtn: { 
    padding: '12px', 
    background: '#4caf50', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer',
    width: '100%'
  },
  submitBtn: { 
    width: '100%', 
    padding: 'clamp(12px, 4vw, 16px)', 
    background: 'linear-gradient(135deg, #667eea, #764ba2)', 
    color: 'white', 
    border: 'none', 
    borderRadius: '10px', 
    fontSize: 'clamp(14px, 4vw, 18px)', 
    fontWeight: 'bold', 
    cursor: 'pointer', 
    marginTop: '20px' 
  },
  downloadBtn: { 
    width: '100%', 
    padding: 'clamp(12px, 4vw, 16px)', 
    background: '#28a745', 
    color: 'white', 
    border: 'none', 
    borderRadius: '10px', 
    fontSize: 'clamp(14px, 4vw, 18px)', 
    fontWeight: 'bold', 
    cursor: 'pointer', 
    marginTop: '30px' 
  },
  header: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '30px', 
    flexWrap: 'wrap', 
    gap: '15px' 
  },
  switchBtn: { 
    padding: '10px 20px', 
    background: '#667eea', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    marginRight: '10px' 
  },
  backBtn: { 
    padding: '10px 20px', 
    background: '#6c757d', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer' 
  },
  ascendantCard: { 
    background: 'linear-gradient(135deg, #667eea, #764ba2)', 
    color: 'white', 
    padding: 'clamp(20px, 5vw, 30px)', 
    borderRadius: '15px', 
    textAlign: 'center', 
    marginBottom: '30px' 
  },
  ascendantValue: { 
    fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', 
    fontWeight: 'bold', 
    margin: '10px 0' 
  },
  specialCard: { 
    background: '#f0f0ff', 
    padding: 'clamp(15px, 4vw, 20px)', 
    borderRadius: '12px', 
    textAlign: 'center', 
    marginBottom: '20px', 
    border: '1px solid #667eea' 
  },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
    gap: '12px', 
    margin: '20px 0' 
  },
  planetCard: { 
    background: '#f8f9fa', 
    padding: '12px', 
    borderRadius: '10px', 
    borderLeft: '4px solid #667eea' 
  },
  planetsGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
    gap: '12px', 
    margin: '20px 0' 
  },
  planetDetailCard: { 
    background: '#f8f9fa', 
    padding: '12px', 
    borderRadius: '10px', 
    borderLeft: '3px solid #667eea' 
  },
  housesGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', 
    gap: '12px', 
    margin: '20px 0' 
  },
  houseCard: { 
    background: '#f8f9fa', 
    padding: '12px', 
    borderRadius: '10px', 
    textAlign: 'center' 
  },
  dashaCard: { 
    marginTop: '30px', 
    background: '#fff3cd', 
    padding: '20px', 
    borderRadius: '12px' 
  },
  dashaGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
    gap: '12px', 
    marginTop: '10px' 
  },
  sunTimes: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
    gap: '15px', 
    marginBottom: '30px', 
    textAlign: 'center' 
  },
  sunCard: { 
    background: 'linear-gradient(135deg, #ffd700, #ffed4e)', 
    padding: '15px', 
    borderRadius: '10px', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
  panchangGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
    gap: '15px', 
    marginBottom: '20px' 
  },
  panchangCard: { 
    background: 'linear-gradient(135deg, #667eea, #764ba2)', 
    color: 'white', 
    padding: '20px', 
    borderRadius: '10px', 
    textAlign: 'center' 
  },
  muhuratCard: { 
    background: '#f8f9fa', 
    padding: '15px', 
    borderRadius: '10px', 
    textAlign: 'center', 
    border: '1px solid #ddd' 
  },
  additionalInfo: { 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '30px', 
    background: '#f8f9fa', 
    padding: '15px', 
    borderRadius: '12px', 
    marginTop: '20px', 
    flexWrap: 'wrap' 
  },
  cityGrid: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '8px', 
    marginBottom: '15px' 
  },
  cityChip: { 
    padding: '8px 16px', 
    background: '#e0f0ff', 
    border: 'none', 
    borderRadius: '20px', 
    cursor: 'pointer', 
    fontSize: 'clamp(12px, 3vw, 14px)' 
  },
  modalOverlay: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    background: 'rgba(0,0,0,0.7)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    zIndex: 1000,
    padding: '20px'
  },
  modalContent: { 
    background: 'white', 
    padding: 'clamp(20px, 5vw, 30px)', 
    borderRadius: '20px', 
    maxWidth: '400px', 
    width: '90%', 
    textAlign: 'center' 
  },
  price: { 
    fontSize: 'clamp(1.5rem, 5vw, 2rem)', 
    fontWeight: 'bold', 
    color: '#28a745', 
    margin: '20px 0' 
  },
  payBtn: { 
    width: '100%', 
    padding: 'clamp(12px, 4vw, 15px)', 
    background: '#28a745', 
    color: 'white', 
    border: 'none', 
    borderRadius: '10px', 
    fontSize: 'clamp(14px, 4vw, 18px)', 
    fontWeight: 'bold', 
    cursor: 'pointer', 
    marginBottom: '10px' 
  },
  cancelBtn: { 
    width: '100%', 
    padding: 'clamp(10px, 3vw, 12px)', 
    background: '#dc3545', 
    color: 'white', 
    border: 'none', 
    borderRadius: '10px', 
    cursor: 'pointer' 
  }
};

export default AstrologyPage;