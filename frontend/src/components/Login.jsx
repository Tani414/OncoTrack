import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Stethoscope, ShieldCheck, Mail, Lock, UserCheck } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ role: 'patient', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5050/record/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Updated: Explicitly saving the MongoDB _id as the displayId
        localStorage.setItem('displayId', data.user._id);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        
        navigate(formData.role === 'patient' ? "/patient-dashboard" : "/clinician-dashboard");
      } else {
        alert(data.error || "Login Failed");
      }
    } catch (err) {
      alert("Server error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        {/* Left Branding Panel */}
        <div className="auth-info-panel">
          <div className="auth-logo-area">
            <Stethoscope size={48} className="auth-icon-white" />
            <h1>OncoTrack</h1>
            <p>Secure Healthcare Gateway</p>
          </div>
          <div className="auth-trust-list">
            <div className="auth-trust-item">
              <ShieldCheck size={18} /> <span>HIPAA Compliant</span>
            </div>
            <div className="auth-trust-item">
              <UserCheck size={18} /> <span>Secure ID Verified</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="auth-form-panel">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your secure portal</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label className="auth-label">Portal Role</label>
              <select 
                className="auth-input" 
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="patient">Patient Portal</option>
                <option value="clinician">Clinician Portal</option>
              </select>
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-field-wrapper">
                <Mail size={18} className="field-icon" />
                <input 
                  className="auth-input" 
                  type="email" 
                  placeholder="email@oncotrack.com" 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  required 
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Password</label>
              <div className="auth-field-wrapper">
                <Lock size={18} className="field-icon" />
                <input 
                  className="auth-input" 
                  type="password" 
                  placeholder="••••••••" 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  required 
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Secure Sign In"}
            </button>
          </form>

          <p className="auth-footer">
            Need an account? <Link to="/register">Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;