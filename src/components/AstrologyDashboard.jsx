import React, { useState } from 'react';
import axios from 'axios';

const AstrologyDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [kundliData, setKundliData] = useState(null);
  const [panchangData, setPanchangData] = useState(null);
  const [activeView, setActiveView] = useState('form');
  const [formData, setFormData] = useState({
    date: '', month: '', year: '', 
    hour: '', minute: '',
    latitude: '', longitude: '', 
    timezone: '5.5'
  });

  const getToken = () => localStorage.getItem('token');

  const api = axios.create({
    baseURL: '/api'
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toFixed(4),
            longitude: position.coords.longitude.toFixed(4)
          });
        },
        () => alert('Unable to get location')
      );
    }
  };

  const generateAstrology = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/astrology/generate', formData);
      if (response.data.success) {
        setKundliData(response.data.kundli);
        setPanchangData(response.data.panchang);
        setActiveView('kundli');
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const getZodiacSign = (longitude) => {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return signs[Math.floor(longitude / 30) % 12];
  };

  const formatDegrees = (longitude) => {
    const deg = Math.floor(longitude);
    const min = Math.floor((longitude - deg) * 60);
    return `${deg}° ${min}'`;
  };

  const planetNames = {
    sun: '☀️ Sun', moon: '🌙 Moon', mars: '♂️ Mars', 
    mercury: '☿ Mercury', jupiter: '♃ Jupiter', venus: '♀️ Venus', 
    saturn: '♄ Saturn', rahu: '☊ Rahu', ketu: '☋ Ketu'
  };

  // Render Form
  const renderForm = () => (
    <div className="form-container">
      <h2>🔮 Generate Your Kundli & Panchang</h2>
      <form onSubmit={generateAstrology}>
        <div className="form-section">
          <h3>📅 Date & Time</h3>
          <div className="form-row">
            <input type="number" name="date" placeholder="Date" 
                   value={formData.date} onChange={handleInputChange} required />
            <input type="number" name="month" placeholder="Month" 
                   value={formData.month} onChange={handleInputChange} required />
            <input type="number" name="year" placeholder="Year" 
                   value={formData.year} onChange={handleInputChange} required />
          </div>
          <div className="form-row">
            <input type="number" name="hour" placeholder="Hour (0-23)" 
                   value={formData.hour} onChange={handleInputChange} required />
            <input type="number" name="minute" placeholder="Minute" 
                   value={formData.minute} onChange={handleInputChange} required />
            <select name="timezone" value={formData.timezone} onChange={handleInputChange}>
              <option value="5.5">India (IST) UTC+5:30</option>
              <option value="0">UTC+0</option>
              <option value="-5">USA (EST) UTC-5</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>📍 Location</h3>
          <div className="form-row">
            <input type="number" step="any" name="latitude" placeholder="Latitude" 
                   value={formData.latitude} onChange={handleInputChange} required />
            <input type="number" step="any" name="longitude" placeholder="Longitude" 
                   value={formData.longitude} onChange={handleInputChange} required />
            <button type="button" onClick={getCurrentLocation} className="location-btn">
              📍 Get Location
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Generating...' : '✨ Generate Kundli ✨'}
        </button>
      </form>
    </div>
  );

  // Render Kundli
  const renderKundli = () => (
    <div className="result-container">
      <div className="result-header">
        <h2>📊 Your Kundli</h2>
        <div className="btn-group">
          <button onClick={() => setActiveView('panchang')} className="switch-btn">
            📅 View Panchang
          </button>
          <button onClick={() => setActiveView('form')} className="back-btn">
            ← New Search
          </button>
        </div>
      </div>

      <div className="ascendant-card">
        <h3>🌅 Lagna (Ascendant)</h3>
        <div className="ascendant-value">{getZodiacSign(kundliData.ascendant)}</div>
        <div>{formatDegrees(kundliData.ascendant)}</div>
      </div>

      <h3>🪐 Planetary Positions</h3>
      <div className="planets-grid">
        {Object.keys(planetNames).map(planet => {
          const p = kundliData.planets?.[planet];
          if (!p) return null;
          return (
            <div key={planet} className="planet-card">
              <div className="planet-name">{planetNames[planet]}</div>
              <div>Sign: {getZodiacSign(p.longitude)}</div>
              <div>Degree: {formatDegrees(p.longitude)}</div>
              <div>House: {p.house}</div>
            </div>
          );
        })}
      </div>

      {kundliData.dasha && (
        <div className="dasha-card">
          <h4>⏰ Current Dasha</h4>
          <div>Maha Dasha: {kundliData.dasha.current?.maha_dasha}</div>
          <div>Antar Dasha: {kundliData.dasha.current?.antar_dasha}</div>
        </div>
      )}
    </div>
  );

  // Render Panchang
  const renderPanchang = () => (
    <div className="result-container">
      <div className="result-header">
        <h2>📅 Daily Panchang</h2>
        <div className="btn-group">
          <button onClick={() => setActiveView('kundli')} className="switch-btn">
            📊 View Kundli
          </button>
          <button onClick={() => setActiveView('form')} className="back-btn">
            ← New Search
          </button>
        </div>
      </div>

      <div className="sun-times">
        <div>🌅 Sunrise: {panchangData.sunrise}</div>
        <div>🌇 Sunset: {panchangData.sunset}</div>
        <div>🌙 Moonrise: {panchangData.moonrise}</div>
      </div>

      <div className="panchang-grid">
        <div className="panchang-card">
          <strong>Tithi:</strong> {panchangData.tithi?.name}
        </div>
        <div className="panchang-card">
          <strong>Nakshatra:</strong> {panchangData.nakshatra?.name}
        </div>
        <div className="panchang-card">
          <strong>Yoga:</strong> {panchangData.yoga?.name}
        </div>
        <div className="panchang-card">
          <strong>Karana:</strong> {panchangData.karana?.name}
        </div>
      </div>
    </div>
  );

  if (activeView === 'form') return renderForm();
  if (activeView === 'kundli' && kundliData) return renderKundli();
  if (activeView === 'panchang' && panchangData) return renderPanchang();
  return renderForm();
};

export default AstrologyDashboard;