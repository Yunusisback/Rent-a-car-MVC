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

        {/* Üst Bölüm - Kolonlar */}l
        <div className="footer-columns">

          {/* Kolon 1 - Hakkımızda */}
          
          <div className="footer-column">
            <h3 className="footer-title">KeyGo</h3>
            <p className="footer-text">
              Avrupa genelinde premium araç kiralama hizmetleri sunuyoruz. 
              Güvenilir, konforlu ve lüks araçlarla seyahat edin.
            </p>
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
            <h4 className="footer-heading">Hizmetler</h4>
            <ul className="footer-links">
              <li><a href="#">Araç Kiralama</a></li>
              <li><a href="#">Kurumsal Çözümler</a></li>
              <li><a href="#">Havalimanı Transferi</a></li>
              <li><a href="#">Uzun Dönem Kiralama</a></li>
              <li><a href="#">Mobil Uygulama</a></li>
            </ul>
          </div>

          {/* Kolon 3 - Yasal */}

          <div className="footer-column">
            <h4 className="footer-heading">Yasal Bilgiler</h4>
            <ul className="footer-links">
              <li><a href="#">Kullanım Koşulları</a></li>
              <li><a href="#">Gizlilik Politikası</a></li>
              <li><a href="#">Çerez Politikası</a></li>
              <li><a href="#">KVKK</a></li>
              <li><a href="#">İptal ve İade</a></li>
            </ul>
          </div>

          {/* Kolon 4 - İletişim */}

          <div className="footer-column">
            <h4 className="footer-heading">İletişim</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={18} />
                <span>İstanbul, Türkiye</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+90 555 123 4567</span>
              </li>
              <li>
                <Mail size={18} />
                <span>info@keygo.eu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt bölüm - copyright */}

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © KeyGo 2025 
            </p>
            <div className="footer-bottom-links">
              <a href="#">Site Haritası</a>
              <span className="separator">•</span>
              <a href="#">Yasal Uyarı</a>
              <span className="separator">•</span>
              <a href="#">Erişilebilirlik</a>
              <span className="separator">•</span>
              <a href="#">Bize Ulaşın</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}