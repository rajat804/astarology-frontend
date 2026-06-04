import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AstrologyPage = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [kundliData, setKundliData] = useState(null);
  const [panchangData, setPanchangData] = useState(null);
  const [activeView, setActiveView] = useState('form');

  const [formData, setFormData] = useState({
    date: '', month: '', year: '', hour: '', minute: '',
    latitude: '', longitude: '', timezone: '5.5'
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const api = axios.create({ baseURL: API_BASE_URL });
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData({
            ...formData,
            latitude: pos.coords.latitude.toFixed(4),
            longitude: pos.coords.longitude.toFixed(4)
          });
          toast.success('Current location fetched!');
        },
        () => toast.error('Unable to get location')
      );
    }
  };

  const fillDelhiExample = () => {
    setFormData({ ...formData, latitude: '28.6139', longitude: '77.2090' });
    toast.success('Delhi example filled!');
  };

  const generate = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.month || !formData.year || !formData.hour ||
        !formData.minute || !formData.latitude || !formData.longitude) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/astrology/generate', {
        date: parseInt(formData.date),
        month: parseInt(formData.month),
        year: parseInt(formData.year),
        hour: parseInt(formData.hour),
        minute: parseInt(formData.minute),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        timezone: parseFloat(formData.timezone)
      });

      if (res.data.success) {
        setKundliData(res.data.kundli);
        setPanchangData(res.data.panchang);
        setActiveView('kundli');
        toast.success('Kundli generated successfully! ✨');
      } else {
        toast.error(res.data.message || 'Failed to generate Kundli');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error generating kundli');
    } finally {
      setLoading(false);
    }
  };

  const getZodiac = (sign) => {
    if (!sign) return "Unknown";
    return typeof sign === 'string' ? sign : "N/A";
  };

  const renderForm = () => (
    <div style={styles.formContainer}>
      <h1 style={styles.title}>🔮 Generate Kundli & Panchang</h1>
      <form onSubmit={generate}>
        <div style={styles.section}>
          <h3>📅 Date of Birth</h3>
          <div style={styles.row}>
            <input type="number" name="date" placeholder="DD (e.g. 15)" value={formData.date} onChange={handleChange} style={styles.input} required />
            <input type="number" name="month" placeholder="MM (e.g. 8)" value={formData.month} onChange={handleChange} style={styles.input} required />
            <input type="number" name="year" placeholder="YYYY (e.g. 1995)" value={formData.year} onChange={handleChange} style={styles.input} required />
          </div>
        </div>

        <div style={styles.section}>
          <h3>⏰ Time of Birth</h3>
          <div style={styles.row}>
            <input type="number" name="hour" placeholder="Hour (0-23)" value={formData.hour} onChange={handleChange} style={styles.input} required />
            <input type="number" name="minute" placeholder="Minute (0-59)" value={formData.minute} onChange={handleChange} style={styles.input} required />
            <select name="timezone" value={formData.timezone} onChange={handleChange} style={styles.input}>
              <option value="5.5">India (IST) UTC+5:30</option>
              <option value="0">UTC+0</option>
              <option value="-5">USA (EST) UTC-5</option>
            </select>
          </div>
        </div>

        <div style={styles.section}>
          <h3>📍 Place of Birth</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
            Enter Latitude & Longitude or use example below:
          </p>
          <div style={styles.row}>
            <input type="number" step="any" name="latitude" placeholder="Latitude (e.g. 28.6139)" value={formData.latitude} onChange={handleChange} style={styles.input} required />
            <input type="number" step="any" name="longitude" placeholder="Longitude (e.g. 77.2090)" value={formData.longitude} onChange={handleChange} style={styles.input} required />
            <button type="button" onClick={getLocation} style={styles.locationBtn}>📍 My Location</button>
          </div>
          <button type="button" onClick={fillDelhiExample} style={{ marginTop: '12px', padding: '10px 16px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            📍 Fill Delhi Example
          </button>
        </div>

        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? 'Generating...' : '✨ Generate Kundli ✨'}
        </button>
      </form>
    </div>
  );

  const renderKundli = () => (
    <div style={styles.resultContainer}>
      <div style={styles.header}>
        <h2>📊 Complete Kundli Analysis</h2>
        <div>
          <button onClick={() => setActiveView('panchang')} style={styles.switchBtn}>📅 Panchang</button>
          <button onClick={() => setActiveView('form')} style={styles.backBtn}>← New Chart</button>
        </div>
      </div>

      {kundliData && (
        <>
          {/* Lagna / Ascendant */}
          <div style={styles.ascendantCard}>
            <h3>🌅 Lagna (Ascendant)</h3>
            <div style={styles.ascendantValue}>{getZodiac(kundliData.ascendant || kundliData.sign)}</div>
          </div>

          {/* Manglik Status */}
          <div style={{
            background: (kundliData.manglik === "Yes" || kundliData.Manglik === "Yes" || kundliData.is_manglik === "Yes") ? '#ff4444' : '#4caf50',
            color: 'white', padding: '18px', borderRadius: '12px', marginBottom: '25px', textAlign: 'center'
          }}>
            <h3>🔴 Manglik Status</h3>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>
              {kundliData.manglik || kundliData.Manglik || kundliData.is_manglik || 'Non-Manglik'}
            </div>
          </div>

          {/* Vedic Details */}
          <h3>⭐ Vedic & Astrological Details</h3>
          <div style={styles.grid}>
            <div style={styles.planetCard}><strong>Rashi / Sign:</strong> {kundliData.sign || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Nakshatra:</strong> {kundliData.Naksahtra || kundliData.nakshatra || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Nakshatra Lord:</strong> {kundliData.NaksahtraLord || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Charan / Pada:</strong> {kundliData.Charan || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Yoga:</strong> {kundliData.Yog || kundliData.yog || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Tithi:</strong> {kundliData.Tithi || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Karan:</strong> {kundliData.Karan || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Gan:</strong> {kundliData.Gan || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Nadi:</strong> {kundliData.Nadi || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Varna:</strong> {kundliData.Varna || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Vashya:</strong> {kundliData.Vashya || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Yoni:</strong> {kundliData.Yoni || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Sign Lord:</strong> {kundliData.SignLord || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Tatva (Element):</strong> {kundliData.tatva || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Paya:</strong> {kundliData.paya || 'N/A'}</div>
            <div style={styles.planetCard}><strong>Name Alphabet:</strong> {kundliData.name_alphabet || 'N/A'}</div>
          </div>

          {/* Future / Dasha */}
          {(kundliData.dasha || kundliData.current_dasha) && (
            <div style={{ marginTop: '30px', background: '#fff3cd', padding: '20px', borderRadius: '12px' }}>
              <h3>⏳ Current & Future Dasha</h3>
              <div><strong>Maha Dasha:</strong> {kundliData.dasha?.maha_dasha || kundliData.current_dasha?.maha_dasha || 'N/A'}</div>
              <div><strong>Antar Dasha:</strong> {kundliData.dasha?.antar_dasha || kundliData.current_dasha?.antar_dasha || 'N/A'}</div>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderPanchang = () => (
    <div style={styles.resultContainer}>
      <div style={styles.header}>
        <h2>📅 Daily Panchang</h2>
        <div>
          <button onClick={() => setActiveView('kundli')} style={styles.switchBtn}>📊 Kundli</button>
          <button onClick={() => setActiveView('form')} style={styles.backBtn}>← New Chart</button>
        </div>
      </div>

      {panchangData && (
        <>
          <div style={styles.sunTimes}>
            <div>🌅 Sunrise: {panchangData.sunrise || 'N/A'}</div>
            <div>🌇 Sunset: {panchangData.sunset || 'N/A'}</div>
          </div>
          <div style={styles.panchangGrid}>
            <div style={styles.panchangCard}>📖 Tithi: {panchangData.tithi || panchangData.Tithi || 'N/A'}</div>
            <div style={styles.panchangCard}>⭐ Nakshatra: {panchangData.nakshatra || panchangData.Naksahtra || 'N/A'}</div>
            <div style={styles.panchangCard}>🧘 Yoga: {panchangData.yog || panchangData.Yog || 'N/A'}</div>
            <div style={styles.panchangCard}>🌊 Karan: {panchangData.karan || panchangData.Karan || 'N/A'}</div>
          </div>
        </>
      )}
    </div>
  );

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
  formContainer: { background: 'white', borderRadius: '20px', padding: '40px', maxWidth: '900px', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  resultContainer: { background: 'white', borderRadius: '20px', padding: '40px', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  title: { textAlign: 'center', color: '#667eea', marginBottom: '30px' },
  section: { background: '#f8f9fa', padding: '20px', borderRadius: '15px', marginBottom: '25px' },
  row: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' },
  input: { padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' },
  locationBtn: { padding: '12px', background: '#ffd700', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '24px' },
  submitBtn: { width: '100%', padding: '15px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' },
  switchBtn: { padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginRight: '10px' },
  backBtn: { padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  ascendantCard: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', marginBottom: '30px' },
  ascendantValue: { fontSize: '3rem', fontWeight: 'bold', margin: '10px 0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px', margin: '20px 0' },
  planetCard: { background: '#f8f9fa', padding: '15px', borderRadius: '10px', borderLeft: '4px solid #667eea' },
  sunTimes: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '30px', textAlign: 'center' },
  panchangGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' },
  panchangCard: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }
};

export default AstrologyPage;