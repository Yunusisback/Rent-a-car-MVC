import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';
import { Shield, Clock, Smartphone } from 'lucide-react';
import '../styles/Benefits.css';

export function Benefits() {
  const { language } = useApp();
  const t = useTranslation(language);

  const benefits = [
    {
      icon: <Shield size={48} />,
      title: language === 'tr' ? 'Tam Kapsamlı Sigorta' : 'Full Coverage Insurance',
      description: language === 'tr' 
        ? 'Tüm araçlarımız kapsamlı sigortaya sahiptir' 
        : 'All our vehicles have comprehensive insurance',
      buttonText: language === 'tr' 
        ? 'Detaylı Bilgi' 
        : 'Learn More',
      link: '#'
    },
    {
      icon: <Clock size={48} />,
      title: language === 'tr' ? '7/24 Müşteri Desteği' : '24/7 Customer Support',
      description: language === 'tr' 
        ? 'Her zaman yanınızdayız, yardıma hazırız' 
        : 'We are always with you, ready to help',
      buttonText: language === 'tr' 
        ? 'Bize Ulaşın' 
        : 'Contact Us',
      link: '#'
    },
    {
      icon: <Smartphone size={48} />,
      title: language === 'tr' ? 'Online Check-in' : 'Online Check-in',
      description: language === 'tr' 
        ? 'Mümkün olan en hızlı şekilde yola çıkın' 
        : 'Get on the road as fast as possible',
      buttonText: language === 'tr' 
        ? 'Şimdi Check-in Yap' 
        : 'Check in now',
      link: '#'
    }
  ];

  return (
    <section className="benefits-section">
      <div className="benefits-container">
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">
                {benefit.icon}
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
              <a href={benefit.link} className="benefit-button">
                {benefit.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}