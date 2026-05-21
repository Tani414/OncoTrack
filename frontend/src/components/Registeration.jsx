import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Search, ShieldCheck, Activity } from "lucide-react";
import "./Registeration.css";

export default function Registeration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    role: "patient", 
    name: "", 
    email: "", 
    password: "", 
    clinicianId: "" 
  });
  const [docSearch, setDocSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (val) => {
    setDocSearch(val);
    if (val.length > 2) {
      try {
        // Corrected URL with /record prefix
        const res = await fetch(`http://localhost:5050/record/search-doctor?name=${val}`);
        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        console.error("Search failed:", err);
      }
    } else setSearchResults([]);
  };

  const onRegister = async (e) => {
    e.preventDefault();
    console.log("Submitting registration data:", form);

    try {
      // FIX: Added /record to the URL to match your backend router
      const res = await fetch("http://localhost:5050/record/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Registration Success:", data);
        alert(`Account Created! Your Identifier is: ${data.generatedID}`);
        navigate("/login");
      } else {
        console.error("Registration Server Error:", data);
        alert(data.error || "Registration failed. Check server logs.");
      }
    } catch (err) {
      console.error("Network connection error:", err);
      alert("Cannot reach the server. Make sure your backend (node server.js) is running on port 5050.");
    }
  };

  return (
    <div className="reg-screen">
      <div className="reg-card">
        {/* Left Info Panel */}
        <div className="reg-info-panel">
          <Activity size={44} className="reg-icon" />
          <h1>OncoTrack</h1>
          <p>Join our secure healthcare network</p>
          <div className="reg-badge"><ShieldCheck size={16} /> HIPAA Secure</div>
        </div>

        {/* Right Form Panel */}
        <div className="reg-form-panel">
          <div className="reg-header">
            <h2>Create Account</h2>
            <p>Select your role to get started</p>
          </div>

          <form onSubmit={onRegister}>
            <div className="reg-grid">
              <div className="reg-group full">
                <label className="reg-label">User Role</label>
                <select 
                  className="reg-input" 
                  value={form.role}
                  onChange={(e) => setForm({...form, role: e.target.value})}
                >
                  <option value="patient">Patient</option>
                  <option value="clinician">Clinician (Doctor)</option>
                </select>
              </div>

              <div className="reg-group full">
                <label className="reg-label">Full Name</label>
                <input 
                  className="reg-input" 
                  type="text" 
                  placeholder="John Doe" 
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})} 
                  required 
                />
              </div>

              <div className="reg-group">
                <label className="reg-label">Email</label>
                <input 
                  className="reg-input" 
                  type="email" 
                  placeholder="john@example.com" 
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})} 
                  required 
                />
              </div>

              <div className="reg-group">
                <label className="reg-label">Password</label>
                <input 
                  className="reg-input" 
                  type="password" 
                  placeholder="••••••••" 
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})} 
                  required 
                />
              </div>
              
              {form.role === "patient" && (
                <div className="reg-group full search-wrapper">
                  <label className="reg-label emerald-text">Link Your Clinician</label>
                  <div className="reg-search-container">
                    <Search size={16} className="search-icon" />
                    <input 
                      className="reg-input" 
                      type="text" 
                      placeholder="Search doctor by name..." 
                      value={docSearch} 
                      onChange={(e) => handleSearch(e.target.value)} 
                    />
                  </div>
                  {searchResults.length > 0 && (
                    <ul className="reg-results">
                      {searchResults.map(d => (
                        <li key={d._id} onClick={() => { 
                          setForm({...form, clinicianId: d._id}); 
                          setDocSearch(d.name); 
                          setSearchResults([]); 
                        }}>
                          <strong>{d.name}</strong> <span className="id-hint">({d._id})</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {form.clinicianId && <p className="linked-msg">✓ Doctor Linked</p>}
                </div>
              )}
            </div>
            
            <button type="submit" className="reg-submit-btn">
              Register Account
            </button>
          </form>
          <p className="reg-footer">Already a member? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}