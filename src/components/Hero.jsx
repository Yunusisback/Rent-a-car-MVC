import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';
import '../styles/Hero.css';



export function Hero() {
  const { language } = useApp();
  const t = useTranslation(language);

  return (
    <div className="hero-section">
      {/* Background Pattern */}
      <div className="hero-pattern"></div>
      
      <div className="hero-content">
        {/* Icon */}

        <div className="hero-icon">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" stroke="url(#gradient)" strokeWidth="4"/>
            <path d="M25 45L30 35L40 50L50 30L55 40" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="80" y2="80">
                <stop offset="0%" stopColor="#667eea"/>
                <stop offset="100%" stopColor="#764ba2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Başlık */}

        <h1 className="hero-title">
          <span className="title-main">{t.title}</span>
          <span className="title-badge">Premium</span>
        </h1>

        {/* Alt Başlık */}

        <p className="hero-subtitle">{t.subtitle}</p>

        {/* Özellikler */}
        
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon"><img src="../public/stopwatch.png"  /></span>
            <span className="feature-text">{t.fastReservation}</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">  <img src="../public/protection.png"  />  </span>
            <span className="feature-text">{t.insuranceIncluded}</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon"><img src="../public/diamond.png"  /></span>
            <span className="feature-text">{t.luxuryCars}</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon"><img src="../public/european-union.png"  /></span>
            <span className="feature-text">{t.europeWide}</span>
          </div>
        </div>
      </div>
    </div>
  );
}