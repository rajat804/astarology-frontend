import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AstrologyPage = () => {
  const { getToken, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // ✅ Redirect if not authenticated
  useEffect(() => {
    const token = getToken();
    if (!token && !isAuthenticated) {
      toast.error('Please login to access Astrology features');
      navigate('/auth');
    }
  }, [isAuthenticated, getToken, navigate]);
  const [loading, setLoading] = useState(false);
  const [kundliData, setKundliData] = useState(null);
  const [panchangData, setPanchangData] = useState(null);
  const [activeView, setActiveView] = useState('form');
  const [gettingLocation, setGettingLocation] = useState(false);
  const [searchingCity, setSearchingCity] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) return toast.error('Geolocation not supported');
    
    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData(prev => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(4),
          longitude: pos.coords.longitude.toFixed(4)
        }));
        toast.success('✅ Location fetched!');
        setGettingLocation(false);
      },
      () => {
        toast.error('Failed to get location');
        setGettingLocation(false);
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
          latitude: parseFloat(loc.lat).toFixed(4),
          longitude: parseFloat(loc.lon).toFixed(4)
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
  
  // Parse values
  const dateNum = parseInt(formData.date);
  const monthNum = parseInt(formData.month);
  const yearNum = parseInt(formData.year);
  const hourNum = parseInt(formData.hour);
  const minuteNum = parseInt(formData.minute);
  const latNum = parseFloat(formData.latitude);
  const lonNum = parseFloat(formData.longitude);
  
  // Check if values are valid (not NaN)
  if (isNaN(dateNum)) {
    toast.error('Please enter a valid date');
    return;
  }
  if (dateNum < 1 || dateNum > 31) {
    toast.error('Date must be between 1 and 31');
    return;
  }
  
  if (isNaN(monthNum)) {
    toast.error('Please enter a valid month');
    return;
  }
  if (monthNum < 1 || monthNum > 12) {
    toast.error('Month must be between 1 and 12');
    return;
  }
  
  if (isNaN(yearNum)) {
    toast.error('Please enter a valid year');
    return;
  }
  if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
    toast.error(`Year must be between 1900 and ${new Date().getFullYear()}`);
    return;
  }
  
  if (isNaN(hourNum)) {
    toast.error('Please enter a valid hour');
    return;
  }
  if (hourNum < 0 || hourNum > 23) {
    toast.error('Hour must be between 0 and 23');
    return;
  }
  
  // ✅ Minute validation - 0 is valid
  if (isNaN(minuteNum)) {
    toast.error('Please enter a valid minute');
    return;
  }
  if (minuteNum < 0 || minuteNum > 59) {
    toast.error('Minute must be between 0 and 59');
    return;
  }
  
  if (isNaN(latNum)) {
    toast.error('Please enter a valid latitude');
    return;
  }
  if (isNaN(lonNum)) {
    toast.error('Please enter a valid longitude');
    return;
  }

  // Check if fields are empty (string empty)
  if (formData.date === '' || formData.month === '' || formData.year === '' || 
      formData.hour === '' || formData.minute === '' || 
      formData.latitude === '' || formData.longitude === '') {
    toast.error('Please fill all fields');
    return;
  }

  setLoading(true);
  try {
    const res = await api.post('/astrology/generate', {
      date: dateNum,
      month: monthNum,
      year: yearNum,
      hour: hourNum,
      minute: minuteNum,
      latitude: latNum,
      longitude: lonNum,
      timezone: parseFloat(formData.timezone)
    });

    if (res.data.success) {
      setKundliData(res.data.kundli);
      setPanchangData(res.data.panchang);
      setActiveView('kundli');
      toast.success(res.data.isMockData ? '✨ Demo Mode - Sample Kundli' : '✨ Kundli Generated!');
    } else {
      toast.error(res.data.message || 'Failed to generate Kundli');
    }
  } catch (err) {
    console.error('Generation error:', err);
    if (err.response?.status === 401) {
      toast.error('Session expired. Please login again.');
      navigate('/auth');
    } else if (err.response?.status === 400) {
      toast.error(err.response?.data?.message || 'Invalid birth details. Please check your entries.');
    } else {
      toast.error('Error generating kundli. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

  // Helper function to safely get nested values
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
            <input type="number" step="any" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} style={styles.input} required />
            <input type="number" step="any" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} style={styles.input} required />
            <button type="button" onClick={getCurrentLocation} disabled={gettingLocation} style={styles.locationBtn}>
              {gettingLocation ? 'Fetching...' : '📍 My Location'}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? 'Generating...' : '✨ Generate Kundli ✨'}
        </button>
      </form>
    </div>
  );

  const renderKundli = () => {
  const data = kundliData || {};
  console.log('📊 Full Kundli Data:', data);
  
  // Debug planets data
  console.log('🪐 Planets Data:', data.planets);
  console.log('🏠 Houses Data:', data.houses);
  
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
          {/* ================= ASCENDANT / LAGNA ================= */}
          <div style={styles.ascendantCard}>
            <h3>🌅 Lagna (Ascendant)</h3>
            <div style={styles.ascendantValue}>
              {getValue(data, ['ascendant_sign', 'lagna', 'ascendant', 'sign'], 'N/A')}
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>
              {getValue(data, ['ascendant_degree', 'lagna_degree'], '')}
            </div>
          </div>

          {/* ================= RASHI / MOON SIGN ================= */}
          <h3 style={styles.sectionTitle}>⭐ Rashi (Moon Sign)</h3>
          <div style={styles.specialCard}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#667eea' }}>
              {getValue(data, ['sign', 'rashi', 'moon_sign', 'zodiac'], 'N/A')}
            </div>
          </div>

          {/* ================= NAKSHATRA ================= */}
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

          {/* ================= MANGALIK DOSHA ================= */}
          <div style={{
            background: getValue(data, ['manglik', 'Manglik', 'is_manglik'], 'No') === 'Yes' ? '#ff4444' : '#4caf50',
            color: 'white', padding: '18px', borderRadius: '12px', marginBottom: '25px', textAlign: 'center'
          }}>
            <h3>🔴 Manglik Dosha</h3>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>
              {getValue(data, ['manglik', 'Manglik', 'is_manglik'], 'Non-Manglik')}
            </div>
          </div>

          {/* ================= VEDIC DETAILS ================= */}
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

          {/* ================= PLANETARY POSITIONS ================= */}
          {/* <h3 style={styles.sectionTitle}>🪐 Planetary Positions (Grahas)</h3> */}
          
          {/* Check if planets exist in different possible formats */}
          {(data.planets && Object.keys(data.planets).length > 0) ? (
            <div style={styles.planetsGrid}>
              {Object.entries(data.planets).map(([planet, info]) => {
                // Get planet details safely
                const planetInfo = info || {};
                const planetName = planet.charAt(0).toUpperCase() + planet.slice(1);
                const planetEmoji = {
                  sun: '☀️', moon: '🌙', mars: '♂️', mercury: '☿',
                  jupiter: '♃', venus: '♀️', saturn: '♄', rahu: '☊', ketu: '☋'
                }[planet] || '🪐';
                
                return (
                  <div key={planet} style={styles.planetDetailCard}>
                    <div style={{ fontWeight: 'bold', color: '#667eea' }}>
                      {planetEmoji} {planetName}
                    </div>
                    <div>Sign: {planetInfo.sign || planetInfo.sign_name || 'N/A'}</div>
                    <div>Degree: {planetInfo.degree || planetInfo.longitude || planetInfo.deg || 'N/A'}°</div>
                    <div>House: {planetInfo.house || planetInfo.house_no || 'N/A'}</div>
                    {planetInfo.retrograde && <div style={{ color: '#ff4444', fontSize: '12px' }}>⭕ Retrograde</div>}
                  </div>
                );
              })}
            </div>
          ) : (
            // Fallback: Try to get planets from root level
            <div style={styles.planetsGrid}>
              {['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'].map(planet => {
                const planetInfo = data[planet] || data[`${planet}_sign`];
                if (!planetInfo) return null;
                
                const planetEmoji = {
                  sun: '☀️', moon: '🌙', mars: '♂️', mercury: '☿',
                  jupiter: '♃', venus: '♀️', saturn: '♄', rahu: '☊', ketu: '☋'
                }[planet] || '🪐';
                
                const planetName = planet.charAt(0).toUpperCase() + planet.slice(1);
                const sign = typeof planetInfo === 'string' ? planetInfo : planetInfo.sign;
                const degree = typeof planetInfo === 'object' ? (planetInfo.degree || planetInfo.longitude) : '';
                const house = typeof planetInfo === 'object' ? planetInfo.house : '';
                
                return (
                  <div key={planet} style={styles.planetDetailCard}>
                    <div style={{ fontWeight: 'bold', color: '#667eea' }}>
                      {planetEmoji} {planetName}
                    </div>
                    <div>Sign: {sign || 'N/A'}</div>
                    <div>Degree: {degree || 'N/A'}°</div>
                    <div>House: {house || 'N/A'}</div>
                  </div>
                );
              }).filter(Boolean)}
            </div>
          )}

          {/* ================= HOUSES (BHAVAS) ================= */}
          <h3 style={styles.sectionTitle}>🏠 Houses (Bhavas)</h3>
          
          {/* Check if houses exist */}
          {(data.houses && data.houses.length > 0) ? (
            <div style={styles.housesGrid}>
              {data.houses.slice(0, 12).map((house, i) => {
                const houseNum = i + 1;
                const houseData = house || {};
                return (
                  <div key={i} style={styles.houseCard}>
                    <div style={{ fontWeight: 'bold', color: '#667eea' }}>House {houseNum}</div>
                    <div>{houseData.sign || houseData.sign_name || houseData.name || 'N/A'}</div>
                    <div style={{ fontSize: '11px', color: '#666' }}>
                      {houseData.degree || houseData.cusp || houseData.deg || 'N/A'}°
                    </div>
                    {houseData.lord && <div style={{ fontSize: '10px' }}>Lord: {houseData.lord}</div>}
                  </div>
                );
              })}
            </div>
          ) : (
            // Fallback: Generate houses from ascendant if available
            (() => {
              const ascendant = data.ascendant || data.ascendant_sign || data.lagna;
              if (ascendant) {
                const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
                let startIndex = zodiacSigns.findIndex(s => s.toLowerCase() === ascendant.toLowerCase());
                if (startIndex === -1) startIndex = 0;
                
                return (
                  <div style={styles.housesGrid}>
                    {Array.from({ length: 12 }, (_, i) => {
                      const signIndex = (startIndex + i) % 12;
                      return (
                        <div key={i} style={styles.houseCard}>
                          <div style={{ fontWeight: 'bold', color: '#667eea' }}>House {i+1}</div>
                          <div>{zodiacSigns[signIndex]}</div>
                          <div style={{ fontSize: '11px', color: '#666' }}>{i * 30}° - {(i+1) * 30}°</div>
                        </div>
                      );
                    })}
                  </div>
                );
              }
              return <div style={{ textAlign: 'center', padding: '20px' }}>No house data available</div>;
            })()
          )}

          {/* ================= DASHA PERIOD ================= */}
          {(data.dasha || data.current_dasha) && (
            <div style={styles.dashaCard}>
              <h3>⏳ Current Vimshottari Dasha</h3>
              <div style={styles.dashaGrid}>
                <div><strong>Maha Dasha:</strong> {getValue(data, ['dasha.maha_dasha', 'current_dasha.maha_dasha'], 'N/A')}</div>
                <div><strong>Antar Dasha:</strong> {getValue(data, ['dasha.antar_dasha', 'current_dasha.antar_dasha'], 'N/A')}</div>
                <div><strong>Pratyantar Dasha:</strong> {getValue(data, ['dasha.pratyantar_dasha'], 'N/A')}</div>
                <div><strong>Valid Until:</strong> {getValue(data, ['dasha.end_date', 'current_dasha.end_date'], 'N/A')}</div>
              </div>
            </div>
          )}
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
            <h3>🌅 Sun & Moon Timing</h3>
            <div style={styles.sunTimes}>
              <div style={styles.sunCard}>🌅 Sunrise: {getValue(data, ['sunrise', 'Sunrise'], 'N/A')}</div>
              <div style={styles.sunCard}>🌇 Sunset: {getValue(data, ['sunset', 'Sunset'], 'N/A')}</div>
              <div style={styles.sunCard}>🌙 Moonrise: {getValue(data, ['moonrise', 'Moonrise'], 'N/A')}</div>
              <div style={styles.sunCard}>🌚 Moonset: {getValue(data, ['moonset', 'Moonset'], 'N/A')}</div>
            </div>

            <h3>🌌 Panchang Details</h3>
            <div style={styles.panchangGrid}>
              <div style={styles.panchangCard}>
                <div style={{ fontSize: '1.8rem' }}>📖</div>
                <div><strong>Tithi</strong></div>
                <div>{getValue(data, ['tithi', 'Tithi'], 'N/A')}</div>
              </div>
              <div style={styles.panchangCard}>
                <div style={{ fontSize: '1.8rem' }}>⭐</div>
                <div><strong>Nakshatra</strong></div>
                <div>{getValue(data, ['nakshatra', 'Naksahtra'], 'N/A')}</div>
              </div>
              <div style={styles.panchangCard}>
                <div style={{ fontSize: '1.8rem' }}>🧘</div>
                <div><strong>Yoga</strong></div>
                <div>{getValue(data, ['yog', 'yoga', 'Yog'], 'N/A')}</div>
              </div>
              <div style={styles.panchangCard}>
                <div style={{ fontSize: '1.8rem' }}>🌊</div>
                <div><strong>Karana</strong></div>
                <div>{getValue(data, ['karan', 'Karan'], 'N/A')}</div>
              </div>
            </div>

            <h3>⚡ Muhurat & Kaal</h3>
            <div style={styles.panchangGrid}>
              <div style={styles.muhuratCard}>🔴 Rahu Kaal: {getValue(data, ['rahukaal', 'Rahukaal', 'rahukal'], 'N/A')}</div>
              <div style={styles.muhuratCard}>🟡 Yamaganda: {getValue(data, ['yamaganda', 'Yamaganda'], 'N/A')}</div>
              <div style={styles.muhuratCard}>🟢 Gulika: {getValue(data, ['gulika', 'Gulika'], 'N/A')}</div>
              <div style={styles.muhuratCard}>📅 Paksha: {getValue(data, ['paksha', 'Paksha'], 'N/A')}</div>
            </div>

            <div style={styles.additionalInfo}>
              <div><strong>🌸 Ritu (Season):</strong> {getValue(data, ['ritu', 'Ritu'], 'N/A')}</div>
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
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 0' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
  formContainer: { background: 'white', borderRadius: '20px', padding: '40px', maxWidth: '1000px', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  resultContainer: { background: 'white', borderRadius: '20px', padding: '40px', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  title: { textAlign: 'center', color: '#667eea', marginBottom: '30px', fontSize: '2.2rem' },
  section: { background: '#f8f9fa', padding: '25px', borderRadius: '15px', marginBottom: '25px' },
  sectionTitle: { color: '#667eea', marginTop: '30px', marginBottom: '15px', fontSize: '1.3rem', borderLeft: '4px solid #667eea', paddingLeft: '15px' },
  row: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' },
  input: { padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' },
  locationBtn: { padding: '12px', background: '#ffd700', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  cityBtn: { padding: '12px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  submitBtn: { width: '100%', padding: '16px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' },
  switchBtn: { padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  backBtn: { padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  ascendantCard: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', marginBottom: '30px' },
  ascendantValue: { fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0' },
  specialCard: { background: '#f0f0ff', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '20px', border: '1px solid #667eea' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px', margin: '20px 0' },
  planetCard: { background: '#f8f9fa', padding: '12px', borderRadius: '10px', borderLeft: '4px solid #667eea' },
  planetsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', margin: '20px 0' },
  planetDetailCard: { background: '#f8f9fa', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #667eea' },
  housesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px', margin: '20px 0' },
  houseCard: { background: '#f8f9fa', padding: '12px', borderRadius: '10px', textAlign: 'center' },
  dashaCard: { marginTop: '30px', background: '#fff3cd', padding: '20px', borderRadius: '12px' },
  dashaGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '10px' },
  infoCard: { display: 'flex', justifyContent: 'space-around', background: '#e8f4f8', padding: '15px', borderRadius: '12px', marginTop: '20px', flexWrap: 'wrap', gap: '15px' },
  sunTimes: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '30px' },
  sunCard: { background: 'linear-gradient(135deg, #ffd700, #ffed4e)', padding: '15px', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold' },
  panchangGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' },
  panchangCard: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' },
  muhuratCard: { background: '#f8f9fa', padding: '15px', borderRadius: '10px', textAlign: 'center', border: '1px solid #ddd' },
  additionalInfo: { display: 'flex', justifyContent: 'center', gap: '30px', background: '#f8f9fa', padding: '15px', borderRadius: '12px', marginTop: '20px', flexWrap: 'wrap' },
  cityGrid: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  cityChip: { padding: '8px 16px', background: '#e0f0ff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '14px' }
};

export default AstrologyPage;