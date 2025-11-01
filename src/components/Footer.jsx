// src/components/Footer.jsx
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import '../styles/Footer.css';

export function Footer() {
  const { language } = useApp();
  const t = useTranslation(language);

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Üst Bölüm - Kolonlar */}
        <div className="footer-columns">

          {/* Kolon 1 - Hakkımızda */}
          <div className="footer-column">
            <h3 className="footer-title">{t.title}</h3>
            <p className="footer-text">{t.aboutDescription}</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Kolon 2 - Hizmetler */}
          <div className="footer-column">
            <h4 className="footer-heading">{t.services}</h4>
            <ul className="footer-links">
              <li><a href="#">{t.carRental}</a></li>
              <li><a href="#">{t.corporateSolutions}</a></li>
              <li><a href="#">{t.airportTransfer}</a></li>
              <li><a href="#">{t.longTermRental}</a></li>
              <li><a href="#">{t.mobileApp}</a></li>
            </ul>
          </div>

          {/* Kolon 3 - Yasal */}

          <div className="footer-column">
            <h4 className="footer-heading">{t.legalInfo}</h4>
            <ul className="footer-links">
              <li><a href="#">{t.termsOfUse}</a></li>
              <li><a href="#">{t.privacyPolicy}</a></li>
              <li><a href="#">{t.cookiePolicy}</a></li>
              <li><a href="#">{t.kvkk}</a></li>
              <li><a href="#">{t.cancellationRefund}</a></li>
            </ul>
          </div>

          {/* Kolon 4 - İletişim */}

          <div className="footer-column">
            <h4 className="footer-heading">{t.contact}</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={18} />
                <span>{t.location}</span>
              </li>
              <li>
                <Phone size={18} />
                <span>{t.phone}</span>
              </li>
              <li>
                <Mail size={18} />
                <span>{t.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt bölüm - copyright */}
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">{t.copyright}</p>
            <div className="footer-bottom-links">
              <a href="#">{t.siteMap}</a>
              <span className="separator">•</span>
              <a href="#">{t.legalNotice}</a>
              <span className="separator">•</span>
              <a href="#">{t.accessibility}</a>
              <span className="separator">•</span>
              <a href="#">{t.contactUs}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
