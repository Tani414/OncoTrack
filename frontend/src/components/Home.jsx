import React from 'react';
import { BookOpen, PlayCircle, Heart, CheckCircle } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container light-theme">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Heart size={14} fill="#2563eb" /> Empowering Global Cancer Care
          </div>
          <h1>
            Precision Support for <br />
            <span className="blue-gradient-text">Oncology Journeys.</span>
          </h1>
          <p className="hero-subtitle">
            Your trusted platform for treatment tracking, patient support, and 
            connected healthcare—designed for the next generation of care.
          </p>
          {/* CTA Buttons Removed from here */}
        </div>
        
        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000" 
            alt="Professional Doctor" 
            className="hero-doctor-img"
          />
          <div className="floating-card">
            <CheckCircle size={20} color="#059669" />
            <span>Verified Clinical Care</span>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="bento-grid">
        <div className="bento-card blog-card">
          <div className="card-header">
            <BookOpen className="icon" size={24} />
            <h3>Latest Cancer Blogs</h3>
          </div>
          <ul className="content-list">
            <li>
              <a href="https://www.expresshealthcare.in/news/surviving-a-rare-cancer-my-journey-through-thymoma-and-myasthenia-gravis/451758/" target="_blank" rel="noopener noreferrer">
                Surviving a Rare Cancer Journey
              </a>
            </li>
            <li>
              <a href="https://www.apollohospitals.com/cancer-treatment-centres/blog/" target="_blank" rel="noopener noreferrer">
                Apollo Cancer Centre Blog
              </a>
            </li>
            <li>
              <a href="https://www.curetoday.com/news/blogs" target="_blank" rel="noopener noreferrer">
                CURE Today Expert Insights
              </a>
            </li>
          </ul>
        </div>

        <div className="bento-card video-card">
          <div className="card-header">
            <PlayCircle className="icon" size={24} />
            <h3>Awareness Videos</h3>
          </div>
          <ul className="content-list">
            <li><a href="https://www.youtube.com/watch?v=aUkLPWEpijU" target="_blank" rel="noopener noreferrer">Breast Cancer for Kids</a></li>
            <li><a href="https://www.youtube.com/watch?v=bg2kCN1kRkI" target="_blank" rel="noopener noreferrer">Early Detection Guide</a></li>
            <li><a href="https://www.youtube.com/watch?v=a7ajHLxTEv4" target="_blank" rel="noopener noreferrer">Oncology Awareness</a></li>
          </ul>
        </div>
      </div>

      <footer className="home-footer">
        <p>© 2025 OncoTrack • Precision Oncology Care System</p>
      </footer>
    </div>
  );
};

export default Home;