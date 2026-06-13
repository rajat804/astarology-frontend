import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { getToken, user, logout } = useAuth();
  const navigate = useNavigate();
  const [purchasedKundlis, setPurchasedKundlis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedKundli, setSelectedKundli] = useState(null);
  const [showKundliModal, setShowKundliModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('kundli'); // 'kundli' or 'panchang'

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://nakshatraganak-backend.vercel.app/api';

  const api = axios.create({ baseURL: API_BASE_URL });
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const token = getToken();
    if (!token) {
      toast.error('Please login to view your profile');
      navigate('/auth');
      return;
    }
    fetchPurchasedKundlis();
  }, []);

  const fetchPurchasedKundlis = async () => {
  try {
    setLoading(true);
    const res = await api.get('/astrology/my-purchased-kundlis');
    console.log('📊 API Response:', res.data);
    
    if (res.data.success) {
      // ✅ REVERSE ORDER: Index 13 se 0 tak show karega (Latest first)
      const kundlis = (res.data.kundlis || []);
      const reversedKundlis = [...kundlis].reverse(); // Reverse the array
      
      console.log(`✅ Found ${reversedKundlis.length} kundlis`);
      console.log(`First item (Latest):`, reversedKundlis[0]?.purchasedAt);
      console.log(`Last item (Oldest):`, reversedKundlis[reversedKundlis.length - 1]?.purchasedAt);
      
      setPurchasedKundlis(reversedKundlis);
    } else {
      setError(res.data.message || 'Failed to load kundlis');
    }
  } catch (err) {
    console.error('Error:', err);
    setError('Failed to load your kundlis');
  } finally {
    setLoading(false);
  }
};

 
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

  const viewKundliDetails = (kundli) => {
    setSelectedKundli(kundli);
    setActiveModalTab('kundli');
    setShowKundliModal(true);
  };

  const downloadPDF = async (kundli) => {
    setDownloading(true);
    try {
      const res = await api.post('/astrology/download-pdf', {
        kundliData: kundli.kundliData,
        panchangData: kundli.panchangData,
        userDetails: {
          name: user?.fullName || 'User',
          email: user?.email || '',
          birthDetails: kundli.birthDetails
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
      setDownloading(false);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading your kundlis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>⚠️</div>
        <p>{error}</p>
        <button onClick={fetchPurchasedKundlis} style={styles.retryBtn}>Retry</button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>
            {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </div>
          <div style={styles.userInfo}>
            <h1>{user?.fullName || 'User'}</h1>
            <p>{user?.email}</p>
            <button onClick={logout} style={styles.logoutBtn}>Logout</button>
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{purchasedKundlis.length}</div>
            <div style={styles.statLabel}>Kundlis Purchased</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>₹{purchasedKundlis.length * 99}</div>
            <div style={styles.statLabel}>Total Spent</div>
          </div>
        </div>

        {/* Purchased Kundlis Section */}
        <h2 style={styles.sectionTitle}>📊 My Purchased Kundlis</h2>

        {purchasedKundlis.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🔮</div>
            <p>You haven't purchased any kundli yet.</p>
            <button onClick={() => navigate('/astrology')} style={styles.buyBtn}>
              Generate Your First Kundli
            </button>
          </div>
        ) : (
          <div style={styles.kundliGrid}>
            {purchasedKundlis.map((kundli, index) => (
              <div key={kundli._id || index} style={styles.kundliCard}>
                <div style={styles.kundliHeader}>
                  <span style={styles.kundliNumber}>#{index + 1}</span>
                  <span style={styles.kundliDate}>{formatDateTime(kundli.purchasedAt)}</span>
                </div>
                <div style={styles.kundliDetails}>
                  <div><strong>📅 DOB:</strong> {kundli.birthDetails?.date}/{kundli.birthDetails?.month}/{kundli.birthDetails?.year}</div>
                  <div><strong>⏰ Time:</strong> {kundli.birthDetails?.hour}:{String(kundli.birthDetails?.minute || 0).padStart(2, '0')}</div>
                  <div><strong>📍 Location:</strong> {kundli.birthDetails?.latitude}, {kundli.birthDetails?.longitude}</div>
                  <div><strong>🌅 Lagna:</strong> {getValue(kundli.kundliData, ['ascendant_sign', 'lagna', 'ascendant'], 'N/A')}</div>
                  <div><strong>⭐ Rashi:</strong> {getValue(kundli.kundliData, ['sign', 'rashi', 'moon_sign'], 'N/A')}</div>
                  <div><strong>⭐ Nakshatra:</strong> {getValue(kundli.kundliData, ['nakshatra', 'Naksahtra'], 'N/A')}</div>
                </div>
                <div style={styles.kundliActions}>
                  <button onClick={() => viewKundliDetails(kundli)} style={styles.viewBtn}>
                    📊 View Details
                  </button>
                  <button onClick={() => downloadPDF(kundli)} disabled={downloading} style={styles.downloadBtn}>
                    {downloading ? '...' : '📥 Download PDF'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Kundli Details Modal - COMPLETE VIEW */}
        {showKundliModal && selectedKundli && (
          <div style={styles.modalOverlay} onClick={() => setShowKundliModal(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h2>📊 Complete Kundli Report</h2>
                <button onClick={() => setShowKundliModal(false)} style={styles.closeBtn}>×</button>
              </div>

              {/* Modal Tabs */}
              <div style={styles.modalTabs}>
                <button
                  className={activeModalTab === 'kundli' ? 'active' : ''}
                  onClick={() => setActiveModalTab('kundli')}
                  style={{ ...styles.tabBtn, ...(activeModalTab === 'kundli' ? styles.tabActive : {}) }}
                >
                  🔮 Kundli Details
                </button>
                <button
                  className={activeModalTab === 'panchang' ? 'active' : ''}
                  onClick={() => setActiveModalTab('panchang')}
                  style={{ ...styles.tabBtn, ...(activeModalTab === 'panchang' ? styles.tabActive : {}) }}
                >
                  📅 Panchang
                </button>
              </div>

              <div style={styles.modalBody}>
                {activeModalTab === 'kundli' ? (
                  // ========== KUNDLI DETAILS ==========
                  <>
                    {/* Birth Details */}
                    <div style={styles.modalSection}>
                      <h3 style={styles.sectionTitleSmall}>📅 Birth Details</h3>
                      <div style={styles.infoRow}>
                        <span><strong>Date:</strong> {selectedKundli.birthDetails?.date}/{selectedKundli.birthDetails?.month}/{selectedKundli.birthDetails?.year}</span>
                        <span><strong>Time:</strong> {selectedKundli.birthDetails?.hour}:{String(selectedKundli.birthDetails?.minute || 0).padStart(2, '0')}</span>
                        <span><strong>Location:</strong> {selectedKundli.birthDetails?.latitude}, {selectedKundli.birthDetails?.longitude}</span>
                      </div>
                    </div>

                    {/* Lagna */}
                    <div style={styles.modalSection}>
                      <h3 style={styles.sectionTitleSmall}>🌅 Lagna (Ascendant)</h3>
                      <div style={styles.lagnaBox}>
                        {getValue(selectedKundli.kundliData, ['ascendant_sign', 'lagna', 'ascendant', 'sign'], 'N/A')}
                        <small>Lord: {getValue(selectedKundli.kundliData, ['ascendant_lord', 'lagna_lord'], 'N/A')}</small>
                      </div>
                    </div>

                    {/* Rashi & Nakshatra */}
                    <div style={styles.modalSection}>
                      <h3 style={styles.sectionTitleSmall}>⭐ Rashi & Nakshatra</h3>
                      <div style={styles.twoColumnGrid}>
                        <div><strong>Rashi (Moon Sign):</strong> {getValue(selectedKundli.kundliData, ['sign', 'rashi', 'moon_sign'], 'N/A')}</div>
                        <div><strong>Nakshatra:</strong> {getValue(selectedKundli.kundliData, ['nakshatra', 'Naksahtra'], 'N/A')}</div>
                        <div><strong>Nakshatra Lord:</strong> {getValue(selectedKundli.kundliData, ['nakshatra_lord', 'lord'], 'N/A')}</div>
                        <div><strong>Pada/Charan:</strong> {getValue(selectedKundli.kundliData, ['pada', 'Charan', 'charan'], 'N/A')}</div>
                      </div>
                    </div>

                    {/* Manglik Dosha */}
                    <div style={styles.modalSection}>
                      <h3 style={styles.sectionTitleSmall}>🔴 Manglik Dosha</h3>
                      <div style={{
                        background: getValue(selectedKundli.kundliData, ['manglik', 'Manglik', 'is_manglik'], 'No') === 'Yes' ? '#ff4444' : '#4caf50',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}>
                        {getValue(selectedKundli.kundliData, ['manglik', 'Manglik', 'is_manglik'], 'Non-Manglik')}
                      </div>
                    </div>

                    {/* Vedic Details */}
                    <div style={styles.modalSection}>
                      <h3 style={styles.sectionTitleSmall}>📖 Vedic Astrological Details</h3>
                      <div style={styles.vedicGrid}>
                        <div><strong>Yoga:</strong> {getValue(selectedKundli.kundliData, ['yoga', 'yog', 'Yog'], 'N/A')}</div>
                        <div><strong>Tithi:</strong> {getValue(selectedKundli.kundliData, ['tithi', 'Tithi'], 'N/A')}</div>
                        <div><strong>Karana:</strong> {getValue(selectedKundli.kundliData, ['karana', 'Karan'], 'N/A')}</div>
                        <div><strong>Gan:</strong> {getValue(selectedKundli.kundliData, ['gan', 'Gan'], 'N/A')}</div>
                        <div><strong>Nadi:</strong> {getValue(selectedKundli.kundliData, ['nadi', 'Nadi'], 'N/A')}</div>
                        <div><strong>Varna:</strong> {getValue(selectedKundli.kundliData, ['varna', 'Varna'], 'N/A')}</div>
                        <div><strong>Vashya:</strong> {getValue(selectedKundli.kundliData, ['vashya', 'Vashya'], 'N/A')}</div>
                        <div><strong>Yoni:</strong> {getValue(selectedKundli.kundliData, ['yoni', 'Yoni'], 'N/A')}</div>
                        <div><strong>Sign Lord:</strong> {getValue(selectedKundli.kundliData, ['sign_lord', 'SignLord'], 'N/A')}</div>
                        <div><strong>Tatva:</strong> {getValue(selectedKundli.kundliData, ['tatva', 'element'], 'N/A')}</div>
                        <div><strong>Paya:</strong> {getValue(selectedKundli.kundliData, ['paya'], 'N/A')}</div>
                        <div><strong>Name Alphabet:</strong> {getValue(selectedKundli.kundliData, ['name_alphabet'], 'N/A')}</div>
                      </div>
                    </div>

                    {/* Planetary Positions */}
                    <div style={styles.modalSection}>
                      <h3 style={styles.sectionTitleSmall}>🪐 Planetary Positions</h3>
                      <div style={styles.tableWrapper}>
                        <table style={styles.modalTable}>
                          <thead>
                            <tr><th>Planet</th><th>Sign</th><th>Degree</th><th>House</th></tr>
                          </thead>
                          <tbody className='text-center'>
                            {selectedKundli.kundliData?.planets && Object.entries(selectedKundli.kundliData.planets).map(([planet, info]) => (
                              <tr key={planet}>
                                <td>{planet.toUpperCase()}</td>
                                <td>{info.sign || 'N/A'}</td>
                                <td>{info.degree || 'N/A'}°</td>
                                <td>{info.house || 'N/A'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Houses */}
                    <div style={styles.modalSection}>
                      <h3 style={styles.sectionTitleSmall}>🏠 Houses (Bhavas)</h3>
                      <div style={styles.tableWrapper}>
                        <table style={styles.modalTable}>
                          <thead>
                            <tr><th>House</th><th>Sign</th><th>Lord</th></tr>
                          </thead>
                          <tbody className='text-center'>
                            {selectedKundli.kundliData?.houses && selectedKundli.kundliData.houses.slice(0, 12).map((house, i) => (
                              <tr key={i}>
                                <td>House {i + 1}</td>
                                <td>{house.sign || 'N/A'}</td>
                                <td>{house.lord || 'N/A'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Dasha */}
                    {(getValue(selectedKundli.kundliData, ['dasha.maha_dasha', 'current_dasha.maha_dasha'], 'N/A') !== 'N/A') && (
                      <div style={styles.modalSection}>
                        <h3 style={styles.sectionTitleSmall}>⏳ Current Vimshottari Dasha</h3>
                        <div style={styles.dashaBox}>
                          <div><strong>Maha Dasha:</strong> {getValue(selectedKundli.kundliData, ['dasha.maha_dasha', 'current_dasha.maha_dasha'], 'N/A')}</div>
                          <div><strong>Antar Dasha:</strong> {getValue(selectedKundli.kundliData, ['dasha.antar_dasha', 'current_dasha.antar_dasha'], 'N/A')}</div>
                          <div><strong>Valid Until:</strong> {getValue(selectedKundli.kundliData, ['dasha.end_date', 'current_dasha.end_date'], 'N/A')}</div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  // ========== PANCHANG DETAILS ==========
                  <div style={styles.modalSection}>
                    <h3 style={styles.sectionTitleSmall}>📅 Daily Panchang</h3>
                    <div style={styles.panchangGrid}>
                      <div><strong>🌅 Sunrise:</strong> {getValue(selectedKundli.panchangData, ['sunrise', 'Sunrise'], 'N/A')}</div>
                      <div><strong>🌇 Sunset:</strong> {getValue(selectedKundli.panchangData, ['sunset', 'Sunset'], 'N/A')}</div>
                      <div><strong>🌙 Moonrise:</strong> {getValue(selectedKundli.panchangData, ['moonrise', 'Moonrise'], 'N/A')}</div>
                      <div><strong>🌚 Moonset:</strong> {getValue(selectedKundli.panchangData, ['moonset', 'Moonset'], 'N/A')}</div>
                      <div><strong>📖 Tithi:</strong> {getValue(selectedKundli.panchangData, ['tithi', 'Tithi'], 'N/A')}</div>
                      <div><strong>⭐ Nakshatra:</strong> {getValue(selectedKundli.panchangData, ['nakshatra', 'Naksahtra'], 'N/A')}</div>
                      <div><strong>🧘 Yoga:</strong> {getValue(selectedKundli.panchangData, ['yog', 'yoga', 'Yog'], 'N/A')}</div>
                      <div><strong>🌊 Karana:</strong> {getValue(selectedKundli.panchangData, ['karan', 'Karan'], 'N/A')}</div>
                      <div><strong>🔴 Rahu Kaal:</strong> {getValue(selectedKundli.panchangData, ['rahukaal', 'Rahukaal', 'rahukal'], 'N/A')}</div>
                      <div><strong>🟡 Yamaganda:</strong> {getValue(selectedKundli.panchangData, ['yamaganda', 'Yamaganda'], 'N/A')}</div>
                      <div><strong>🟢 Gulika:</strong> {getValue(selectedKundli.panchangData, ['gulika', 'Gulika'], 'N/A')}</div>
                      <div><strong>📅 Paksha:</strong> {getValue(selectedKundli.panchangData, ['paksha', 'Paksha'], 'N/A')}</div>
                      <div><strong>🌸 Ritu:</strong> {getValue(selectedKundli.panchangData, ['ritu', 'Ritu'], 'N/A')}</div>
                      <div><strong>☀️ Ayana:</strong> {getValue(selectedKundli.panchangData, ['ayana', 'Ayana'], 'N/A')}</div>
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.modalFooter}>
                <button onClick={() => downloadPDF(selectedKundli)} disabled={downloading} style={styles.downloadBtnModal}>
                  {downloading ? 'Downloading...' : '📥 Download Full PDF Report'}
                </button>
                <button onClick={() => setShowKundliModal(false)} style={styles.closeModalBtn}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 0' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
  loadingContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: '20px', color: 'white' },
  errorContainer: { background: 'white', borderRadius: '20px', padding: '40px', textAlign: 'center', maxWidth: '500px', margin: '0 auto' },
  errorIcon: { fontSize: '3rem', marginBottom: '15px' },
  retryBtn: { marginTop: '20px', padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  spinner: { width: '40px', height: '40px', border: '3px solid white', borderTopColor: '#667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' },
  profileHeader: { background: 'white', borderRadius: '20px', padding: '30px', display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' },
  avatar: { width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: 'white' },
  userInfo: { flex: 1 },
  logoutBtn: { marginTop: '10px', padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  statsContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' },
  statCard: { background: 'white', borderRadius: '15px', padding: '20px', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' },
  statNumber: { fontSize: '2.5rem', fontWeight: 'bold', color: '#667eea' },
  statLabel: { color: '#666', marginTop: '5px' },
  sectionTitle: { color: 'white', fontSize: '1.8rem', marginBottom: '20px' },
  emptyState: { background: 'white', borderRadius: '20px', padding: '60px', textAlign: 'center', color: '#666' },
  emptyIcon: { fontSize: '4rem', marginBottom: '20px' },
  buyBtn: { marginTop: '20px', padding: '12px 24px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  kundliGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' },
  kundliCard: { background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' },
  kundliHeader: { background: '#f8f9fa', padding: '15px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee' },
  kundliNumber: { fontWeight: 'bold', color: '#667eea' },
  kundliDate: { color: '#666', fontSize: '12px' },
  kundliDetails: { padding: '15px', fontSize: '14px', lineHeight: '1.8' },
  kundliActions: { padding: '15px', display: 'flex', gap: '10px', borderTop: '1px solid #eee' },
  viewBtn: { flex: 1, padding: '10px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  downloadBtn: { flex: 1, padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },

  // Modal Styles
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalContent: { background: 'white', borderRadius: '20px', maxWidth: '800px', width: '90%', maxHeight: '85vh', overflow: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #eee', position: 'sticky', top: 0, background: 'white', zIndex: 10 },
  closeBtn: { background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: '#666' },
  modalTabs: { display: 'flex', borderBottom: '1px solid #eee', background: '#f8f9fa' },
  tabBtn: { flex: 1, padding: '12px', background: 'none', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', color: '#666', transition: 'all 0.3s' },
  tabActive: { color: '#667eea', borderBottom: '3px solid #667eea', background: 'white' },
  modalBody: { padding: '20px' },
  modalFooter: { padding: '20px', borderTop: '1px solid #eee', display: 'flex', gap: '10px', position: 'sticky', bottom: 0, background: 'white' },
  modalSection: { marginBottom: '25px', padding: '15px', background: '#f8f9fa', borderRadius: '12px' },
  sectionTitleSmall: { fontSize: '16px', color: '#667eea', marginBottom: '12px', borderLeft: '3px solid #667eea', paddingLeft: '10px' },
  infoRow: { display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '14px' },
  lagnaBox: { textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#667eea', padding: '15px', background: '#e8e8ff', borderRadius: '10px' },
  twoColumnGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '14px' },
  vedicGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '13px' },
  panchangGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '14px' },
  tableWrapper: { overflowX: 'auto' },
  modalTable: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
  dashaBox: { background: '#fff3cd', padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' },
  downloadBtnModal: { flex: 1, padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  closeModalBtn: { flex: 1, padding: '12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin { to { transform: rotate(360deg); } }
  .active { background: white; color: #667eea; border-bottom: 3px solid #667eea; }
`;
document.head.appendChild(styleSheet);

export default ProfilePage;