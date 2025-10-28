import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';
import { Globe, User, HelpCircle, Car } from 'lucide-react';
import '../styles/Navbar.css';

export function Navbar() {
  const { language, changeLanguage } = useApp();
  const t = useTranslation(language);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo + İkon */}

        <div className="navbar-logo">
          <Car size={28} className="logo-icon" />
          <h2>{t.title}</h2>
        </div>

        

        {/* Sağ Menü */}

        <div className="navbar-menu">
          
          {/* Help */}

          <div className="navbar-item">
            <button className="navbar-btn" title="Yardım">
              <HelpCircle size={20} />
              <span>Help</span>
            </button>
            <div className="dropdown">
              <button className="dropdown-item">
                SSS
              </button>
              <button className="dropdown-item">
                İletişim
              </button>
              <button className="dropdown-item">
                Destek
              </button>
            </div>
          </div>

          {/* Dil Seçimi */}

          <div className="navbar-item">
            <button className="navbar-btn" title={t.language}>
              <Globe size={20} />
            </button>
            <div className="dropdown">
              <button
                className={`dropdown-item ${language === 'tr' ? 'active' : ''}`}
                onClick={() => changeLanguage('tr')}
              >
                 Türkçe
              </button>
              <button
                className={`dropdown-item ${language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
              >
                 English
              </button>
            </div>
          </div>

          {/* Kullanıcı Girişi */}
          
          <div className="navbar-item">
            <button 
              className="navbar-btn navbar-user"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <User size={20} />
              <span>Giriş Yap</span>
            </button>
            
            {showUserMenu && (
              <div className="dropdown dropdown-user">
                <button className="dropdown-item">
                  Giriş Yap
                </button>
                <button className="dropdown-item">
                  Kayıt Ol
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}