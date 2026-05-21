import React, { useState, useEffect } from 'react';
import { Activity, FileText, ShieldCheck, Pill, Clock, Calendar, User } from 'lucide-react';
import './PatientDashboard.css';

export default function PatientDashboard() {
  const [records, setRecords] = useState([]);
  const patId = localStorage.getItem('displayId');
  const patName = localStorage.getItem('userName');

  useEffect(() => {
    if (patId) {
      fetch(`http://localhost:5050/record/my-records/${patId}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setRecords(data);
        })
        .catch(err => console.error("Error loading history:", err));
    }
  }, [patId]);

  return (
    <div className="pat-dash-container">
      {/* Header Section */}
      <header className="pat-header">
        <div>
          <h1 className="emerald-text">Welcome, {patName}</h1>
          <div className="pat-id-badge">ID: {patId}</div>
        </div>
        <div className="pat-security">
          <ShieldCheck size={18} className="emerald-text" />
          HIPAA Secured Connection
        </div>
      </header>

      {/* Bento Grid */}
      <div className="pat-bento-grid">
        
        {/* Latest Medication Summary (Visual highlight) */}
        {records.length > 0 && (
          <div className="pat-bento-item">
            <div className="card-label"><Pill size={16} /> Active Prescription</div>
            <h2 style={{ color: '#1e293b', marginBottom: '8px' }}>{records[0].medication}</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              <Clock size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Take {records[0].dosage} — {records[0].frequency}
            </p>
          </div>
        )}

        {/* Next Appointment Card */}
        {records.length > 0 && (
          <div className="pat-bento-item">
            <div className="card-label"><Calendar size={16} /> Upcoming Visit</div>
            <h2 style={{ color: '#1e293b', marginBottom: '8px' }}>{records[0].nextAppointment}</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Primary Diagnosis: {records[0].diagnosis}</p>
          </div>
        )}

        {/* Full History Table */}
        <div className="pat-bento-item full-width">
          <div className="card-label"><FileText size={16} /> Complete Clinical History</div>
          
          <div className="pat-table-wrapper">
            {records.length > 0 ? (
              <table className="pat-history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Diagnosis</th>
                    <th>Medication</th>
                    <th>Dosage & Frequency</th>
                    <th>Notes</th>
                    <th>Next Appt.</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{new Date(r.date).toLocaleDateString()}</strong></td>
                      <td>{r.diagnosis}</td>
                      <td><span className="emerald-text" style={{ fontWeight: '700' }}>{r.medication}</span></td>
                      <td>
                        <span className="doc-tag">{r.dosage}</span>
                        <span style={{ margin: '0 8px', color: '#cbd5e1' }}>|</span>
                        <span style={{ fontSize: '0.85rem' }}>{r.frequency}</span>
                      </td>
                      <td style={{ maxWidth: '200px', fontSize: '0.85rem', color: '#64748b' }}>{r.notes}</td>
                      <td><strong>{r.nextAppointment}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <Activity size={48} style={{ marginBottom: '15px', opacity: 0.2 }} />
                <p>No clinical records have been synchronized to your account yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}