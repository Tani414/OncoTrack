import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, PlusCircle, LogOut, Search, Activity, TrendingUp, Copy, Check, PieChart } from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import './ClinicianDashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const ClinicianDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  
  const docId = localStorage.getItem('displayId'); 
  const docName = localStorage.getItem('userName');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Double check this URL matches your server's GET route exactly
        const response = await fetch(`http://localhost:5050/record/by-clinician/${docId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Data:", data); // Check your console to see what the server actually sends
          setPatients(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    if (docId) fetchPatients();
  }, [docId]);

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Logic to count statuses for the Donut Chart
  const statusCounts = patients.reduce((acc, p) => {
    const s = p.status || 'Stable';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: ['Active Cases', 'Recent Admissions', 'Completed'],
    datasets: [{
      label: 'Volume',
      data: [patients.length, patients.length > 0 ? 1 : 0, 0],
      backgroundColor: ['#059669', '#10b981', '#6ee7b7'],
      borderRadius: 6,
    }]
  };

  const donutData = {
    labels: Object.keys(statusCounts).length > 0 ? Object.keys(statusCounts) : ['No Data'],
    datasets: [{
      data: Object.values(statusCounts).length > 0 ? Object.values(statusCounts) : [1],
      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
      hoverOffset: 4,
      borderWidth: 0,
    }]
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'bottom', labels: { boxWidth: 12, usePointStyle: true } }
    }
  };

  const filteredPatients = patients.filter(p => {
    const searchTerm = search.toLowerCase();
    // Safety check: if name is missing (common in entries), search ID only
    const nameMatch = (p.name || "Patient").toLowerCase().includes(searchTerm);
    const idMatch = (p.patientId || p._id || "").toLowerCase().includes(searchTerm);
    return nameMatch || idMatch;
  });

  return (
    <div className="dash-container">
      <header className="dash-nav">
        <div className="nav-brand">
          <Activity className="emerald-text" />
          <h2>OncoTrack <span className="role-tag">Clinician</span></h2>
        </div>
        <div className="nav-user">
          <div className="user-info">
            <strong>Dr. {docName}</strong>
            <span className="doc-id-display">ID: {docId}</span>
          </div>
          <Link to="/login" className="logout-btn" onClick={() => localStorage.clear()}>
            <LogOut size={18} />
          </Link>
        </div>
      </header>

      <main className="dash-content">
        <div className="action-row">
          <div className="welcome-msg">
            <h1>Clinical Overview</h1>
            <p>Managing {patients.length} active linked clinical entries.</p>
          </div>
          <Link to="/clinician-entry" className="btn-primary">
            <PlusCircle size={20} /> <span>New Clinical Entry</span>
          </Link>
        </div>

        <div className="bento-grid">
          <div className="bento-card chart-card">
            <div className="card-header">
              <TrendingUp size={18} /> <h3>Case Volume</h3>
            </div>
            <div className="chart-wrapper" style={{ height: '220px', position: 'relative' }}>
              {patients.length > 0
                ? <Bar data={barData} options={chartOptions} />
                : <div className="no-data-msg">No data for Bar Chart.</div>}
            </div>
          </div>

          <div className="bento-card chart-card">
            <div className="card-header">
              <PieChart size={18} /> <h3>Status Distribution</h3>
            </div>
            <div className="chart-wrapper" style={{ height: '220px', position: 'relative' }}>
              {patients.length > 0
                ? <Doughnut data={donutData} options={{ ...chartOptions, cutout: '70%' }} />
                : <div className="no-data-msg">No data for Donut Chart.</div>}
            </div>
          </div>

          <div className="bento-card search-card">
            <div className="card-header">
              <Search size={18} /> <h3>Registry Filter</h3>
            </div>
            <p className="search-hint">Search by name or ID.</p>
            <input 
              type="text"
              placeholder="Search records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="dash-search-input"
            />
          </div>

          <div className="bento-card table-card full-width">
            <div className="card-header">
              <Users size={18} /> <h3>Clinical Records</h3>
            </div>
            <div className="table-responsive">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Diagnosis</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.length > 0 ? filteredPatients.map((p) => (
                    <tr key={p._id}>
                      <td className="id-cell">
                        <code className="mongo-id-text">{p.patientId || p._id}</code>
                        <button
                          className="copy-icon-btn"
                          onClick={() => handleCopy(p.patientId || p._id)}
                        >
                          {copiedId === (p.patientId || p._id)
                            ? <Check size={14} color="#10b981" />
                            : <Copy size={14} />}
                        </button>
                      </td>
                      {/* Using fallback "Not Recorded" if the entry field is empty */}
                      <td><strong>{p.diagnosis || "Not Recorded"}</strong></td>
                      <td>
                        <span className={`status-tag ${(p.status || 'stable').toLowerCase()}`}>
                          {p.status || 'Stable'}
                        </span>
                      </td>
                      <td>
                        <Link to="/clinician-entry" className="action-link">
                          Update Entry
                        </Link>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="empty-state-text">
                        No entries found for your ID ({docId}).
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClinicianDashboard;