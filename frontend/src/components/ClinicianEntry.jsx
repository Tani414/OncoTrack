import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Activity, FileText, Calendar, Pill, Clock, History } from 'lucide-react';
import './ClinicianEntry.css';

export default function ClinicianEntry() {
  const navigate = useNavigate();
  const docId = localStorage.getItem('displayId'); 
  const docName = localStorage.getItem('userName');

  const [entry, setEntry] = useState({
    patientId: '',
    diagnosis: '',
    medication: '',
    dosage: '',
    frequency: '',
    nextAppointment: '',
    medHistory: '',
    notes: '',
    status: 'Stable'
  });

  const handleSave = async (e) => {
    e.preventDefault();

    if (entry.patientId.length !== 24) {
      alert("Invalid Patient ID. Please enter the full 24-character MongoDB System ID.");
      return;
    }

    try {
      const payload = { 
        ...entry, 
        clinicianId: docId, 
        clinicianName: docName,
        createdAt: new Date().toISOString()
      };

      const res = await fetch("http://localhost:5050/record/entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Clinical Record Finalized and Synced.");
        navigate("/clinician-dashboard");
      } else {
        alert("Failed to save record.");
      }
    } catch (err) {
      alert("Backend connection error.");
    }
  };

  return (
    <div className="entry-screen">
      <nav className="entry-nav">
        <button onClick={() => navigate(-1)} className="back-link">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div className="doc-signature">
          Dr. {docName || "Unknown"} <span className="id-pill">{docId || "No ID"}</span>
        </div>
      </nav>

      <div className="entry-wrapper">
        <header className="entry-header-text">
          <h1>New Treatment Entry</h1>
          <p>Update medication, dosages, and scheduling for the patient portal.</p>
        </header>

        <form onSubmit={handleSave} className="entry-grid">
          
          <div className="entry-card">
            <label className="reg-label"><User size={16} /> Patient System ID</label>
            <input
              value={entry.patientId}
              onChange={(e) => setEntry({...entry, patientId: e.target.value})}
              required
            />
          </div>

          <div className="entry-card">
            <label className="reg-label"><Activity size={16} /> Patient Condition</label>
            <select
              value={entry.status}
              onChange={(e) => setEntry({...entry, status: e.target.value})}
            >
              <option value="Stable">Stable</option>
              <option value="Active Treatment">Active Treatment</option>
              <option value="Remission">Remission</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="entry-card full-row">
            <label className="reg-label"><FileText size={16} /> Primary Diagnosis</label>
            <input
              value={entry.diagnosis}
              onChange={(e) => setEntry({...entry, diagnosis: e.target.value})}
              required
            />
          </div>

          <div className="entry-card">
            <label className="reg-label"><Pill size={16} /> Current Medication</label>
            <input
              value={entry.medication}
              onChange={(e) => setEntry({...entry, medication: e.target.value})}
              required
            />
          </div>

          <div className="entry-card split-input">
            <div className="field-half">
              <label className="reg-label"><Activity size={14} /> Dosage</label>
              <input
                value={entry.dosage}
                onChange={(e) => setEntry({...entry, dosage: e.target.value})}
                required
              />
            </div>
            <div className="field-half">
              <label className="reg-label"><Clock size={14} /> Frequency</label>
              <input
                value={entry.frequency}
                onChange={(e) => setEntry({...entry, frequency: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="entry-card">
            <label className="reg-label"><Calendar size={16} /> Next Appointment</label>
            <input
              type="date"
              value={entry.nextAppointment}
              onChange={(e) => setEntry({...entry, nextAppointment: e.target.value})}
              required
            />
          </div>

          <div className="entry-card">
            <label className="reg-label"><History size={16} /> History of Medication</label>
            <input
              value={entry.medHistory}
              onChange={(e) => setEntry({...entry, medHistory: e.target.value})}
            />
          </div>

          <div className="entry-card full-row">
            <label className="reg-label"><FileText size={16} /> Additional Clinical Notes</label>
            <textarea
              value={entry.notes}
              onChange={(e) => setEntry({...entry, notes: e.target.value})}
              required
            />
          </div>

          <div className="full-row">
            <button type="submit" className="finalize-btn">
              <Save size={18} /> Finalize Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
