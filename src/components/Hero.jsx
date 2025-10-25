import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';
import { MapPin, Calendar, Clock } from 'lucide-react';
import '../styles/Hero.css';

export function Hero() {
  const { language, searchFilters, updateFilters, setShowCarList } = useApp();
  const t = useTranslation(language);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFilters({ [name]: value });
  };

  const handleSearch = () => {

    // Tüm alanlar dolu, CarListi göster
    setShowCarList(true);
    
    // CarListe scroll

    setTimeout(() => {
      const carListElement = document.querySelector('.car-list-wrapper');
      if (carListElement) {
        carListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const locations = [
    'İstanbul Havalimanı',
    'Sabiha Gökçen Havalimanı',
    'Ankara Esenboğa',
    'Bodrum Havalimanı',
    'Dalaman Havalimanı',
    'Trabzon Havalimanı'
  ];

  //  buton aktif mi kontrolü

  const isFormValid = 
    searchFilters.pickupLocation && 
    searchFilters.dropoffLocation && 
    searchFilters.pickupDate && 
    searchFilters.dropoffDate;

  return (
    <div className="hero-section-new">
      <div className="hero-overlay"></div>

      <div className="hero-wrapper">

        {/* Başlık Bölümü */}
        <div className="hero-header">
          <h1 className="hero-main-title">{t.title}</h1>
          <p className="hero-main-subtitle">{t.subtitle}</p>
        </div>

        {/* Arama Formu */}
        <div className="search-box-main">
          <div className="search-box-inner">

            {/* Lokasyon Seçimi */}
            <div className="search-row">
              <div className="search-field">
                <div className="field-icon">
                  <MapPin size={20} />
                </div>
                <div className="field-content">
                  <label className="field-label">{t.pickupLocation}</label>
                  <select 
                    name="pickupLocation"
                    value={searchFilters.pickupLocation}
                    onChange={handleInputChange}
                    className="field-select"
                  >
                    <option value="">{t.selectLocation}</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="search-field">
                <div className="field-icon">
                  <MapPin size={20} />
                </div>
                <div className="field-content">
                  <label className="field-label">{t.dropoffLocation}</label>
                  <select 
                    name="dropoffLocation"
                    value={searchFilters.dropoffLocation}
                    onChange={handleInputChange}
                    className="field-select"
                  >
                    <option value="">{t.selectLocation}</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tarih ve Saat Seçimi */}
            
            <div className="search-row">
              <div className="search-field">
                <div className="field-icon">
                  <Calendar size={20} />
                </div>
                <div className="field-content">
                  <label className="field-label">{t.pickupDate}</label>
                  <input 
                    type="date"
                    name="pickupDate"
                    value={searchFilters.pickupDate}
                    onChange={handleInputChange}
                    className="field-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="search-field search-field-small">
                <div className="field-icon">
                  <Clock size={20} />
                </div>
                <div className="field-content">
                  <label className="field-label">{t.pickupTime}</label>
                  <input 
                    type="time"
                    name="pickupTime"
                    value={searchFilters.pickupTime}
                    onChange={handleInputChange}
                    className="field-input"
                  />
                </div>
              </div>

              <div className="search-field">
                <div className="field-icon">
                  <Calendar size={20}  />
                </div>
                <div className="field-content">
                  <label className="field-label">{t.dropoffDate}</label>
                  <input 
                    type="date"
                    name="dropoffDate"
                    value={searchFilters.dropoffDate}
                    onChange={handleInputChange}
                    className="field-input"
                    min={searchFilters.pickupDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="search-field search-field-small">
                <div className="field-icon">
                  <Clock size={20} />
                </div>
                <div className="field-content">
                  <label className="field-label">{t.dropoffTime}</label>
                  <input 
                    type="time"
                    name="dropoffTime"
                    value={searchFilters.dropoffTime}
                    onChange={handleInputChange}
                    className="field-input"
                  />
                </div>
              </div>
            </div>

            {/*  Disable Butonu */}

            <button 
              onClick={handleSearch} 
              className={`search-btn-main ${!isFormValid ? 'disabled' : ''}`}
              disabled={!isFormValid}
            >
              {t.searchCars}
            </button>
          </div>
        </div>

        {/* Alt Özellikler */}
        
        <div className="hero-features-new">
          <div className="feature-new">
            <div className="feature-icon-new">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <span>{t.fastReservation}</span>
          </div>
          <div className="feature-new">
            <div className="feature-icon-new">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span>{t.insuranceIncluded}</span>
          </div>
          <div className="feature-new">
            <div className="feature-icon-new">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span>{t.luxuryCars}</span>
          </div>
          <div className="feature-new">
            <div className="feature-icon-new">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <span>{t.europeWide}</span>
          </div>
        </div>
      </div>
    </div>
  );
}