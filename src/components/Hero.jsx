import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';
import { MapPin, Calendar, Clock, ChevronDown } from 'lucide-react';
import '../styles/Hero.css';

export function Hero() {
  const { language, searchFilters, updateFilters, setShowCarList } = useApp();
  const t = useTranslation(language);
  
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showPickupCalendar, setShowPickupCalendar] = useState(false);
  const [showDropoffCalendar, setShowDropoffCalendar] = useState(false);
  const [pickupCalendarMonth, setPickupCalendarMonth] = useState(new Date());
  const [dropoffCalendarMonth, setDropoffCalendarMonth] = useState(new Date());
  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);
  const pickupTimeRef = useRef(null);
  const dropoffTimeRef = useRef(null);
  const pickupDateRef = useRef(null);
  const dropoffDateRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = [pickupRef, dropoffRef, pickupTimeRef, dropoffTimeRef, pickupDateRef, dropoffDateRef];
      const clickedOutside = refs.every(ref => 
        !ref.current || !ref.current.contains(event.target)
      );
      if (clickedOutside) {
        setOpenDropdown(null);
        setShowPickupCalendar(false);
        setShowDropoffCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
    setShowPickupCalendar(false);
    setShowDropoffCalendar(false);
  };

  const handleSelectLocation = (name, value) => {
    updateFilters({ [name]: value });
    setOpenDropdown(null);
  };

  const handleSelectTime = (name, value) => {
    updateFilters({ [name]: value });
    setOpenDropdown(null);
  };

  const handleSelectDate = (name, value) => {
    updateFilters({ [name]: value });
    setShowPickupCalendar(false);
    setShowDropoffCalendar(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
  };

  const generateCalendar = (displayMonth, minDate) => {
    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    const days = [];
    const minDateTime = minDate ? new Date(minDate).getTime() : null;
    
    let maxDateTime = null;
    if (minDate) {
      const maxDate = new Date(minDate);
      maxDate.setMonth(maxDate.getMonth() + 1);
      maxDateTime = maxDate.getTime();
    }
    
    for (let i = 0; i < startDay; i++) {
      days.push({ day: '', disabled: true });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      const dayDateTime = dayDate.getTime();
      
      const isDisabled = minDateTime 
        ? (dayDateTime < minDateTime || (maxDateTime && dayDateTime > maxDateTime))
        : false;
        
      days.push({ day: i, disabled: isDisabled, date: dayDate });
    }
    
    const locale = language === 'tr' ? 'tr-TR' : 'en-US';
    
    return { 
      days, 
      month: displayMonth.toLocaleString(locale, { month: 'long' }), 
      year 
    };
  };

  const handlePrevMonth = (calendarType) => {
    if (calendarType === 'pickup') {
      const newMonth = new Date(pickupCalendarMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      setPickupCalendarMonth(newMonth);
    } else {
      const newMonth = new Date(dropoffCalendarMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      setDropoffCalendarMonth(newMonth);
    }
  };

  const handleNextMonth = (calendarType) => {
    if (calendarType === 'pickup') {
      const newMonth = new Date(pickupCalendarMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      setPickupCalendarMonth(newMonth);
    } else {
      const newMonth = new Date(dropoffCalendarMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      setDropoffCalendarMonth(newMonth);
    }
  };

  const handleSearch = () => {
    setShowCarList(true);
    setTimeout(() => {
      const carListElement = document.querySelector('.car-list-wrapper');
      if (carListElement) {
        carListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const locations = language === 'tr' 
    ? [
        'İstanbul Havalimanı',
        'Frankfurt Havalimanı',
        'Londra Heathrow Havalimanı',
        'Charles de Gaulle Havalimanı',
        'Amsterdam Schiphol Havalimanı',
        'Roma Fiumicino Havalimanı',
        'Madrid Barajas Havalimanı',
        'Zürih Havalimanı',
        'Viyana Havalimanı',
        'Brüksel Havalimanı',
        'Atina Eleftherios Venizelos Havalimanı',
        'Lizbon Havalimanı',
        'Stockholm Arlanda Havalimanı',
        'Helsinki Vantaa Havalimanı',
        'Varşova Chopin Havalimanı'
      ]
    : [
        'Istanbul Airport',
        'Frankfurt Airport',
        'London Heathrow Airport',
        'Charles de Gaulle Airport',
        'Amsterdam Schiphol Airport',
        'Rome Fiumicino Airport',
        'Madrid Barajas Airport',
        'Zurich Airport',
        'Vienna Airport',
        'Brussels Airport',
        'Athens Eleftherios Venizelos Airport',
        'Lisbon Airport',
        'Stockholm Arlanda Airport',
        'Helsinki Vantaa Airport',
        'Warsaw Chopin Airport'
      ];

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = ['00', '15', '30', '45'];

  const weekDays = language === 'tr' 
    ? ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct']
    : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

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
              <div className="search-field" ref={pickupRef}>
                <div className="field-icon">
                  <MapPin size={20} />
                </div>
                <div className="field-content">
                  <label className="field-label">{t.pickupLocation}</label>
                  <div className="custom-select" onClick={() => {
                    closeAllDropdowns();
                    setOpenDropdown(openDropdown === 'pickup' ? null : 'pickup');
                  }}>
                    <span className={searchFilters.pickupLocation ? 'selected' : 'placeholder'}>
                      {searchFilters.pickupLocation || t.selectLocation}
                    </span>
                    <ChevronDown size={18} className={`chevron ${openDropdown === 'pickup' ? 'open' : ''}`} />
                  </div>
                  {openDropdown === 'pickup' && (
                    <div className="dropdown-menu">
                      {locations.map(loc => (
                        <div 
                          key={loc} 
                          className={`dropdown-item ${searchFilters.pickupLocation === loc ? 'active' : ''}`}
                          onClick={() => handleSelectLocation('pickupLocation', loc)}
                        >
                          {loc}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="search-field" ref={dropoffRef}>
                <div className="field-icon">
                  <MapPin size={20} />
                </div>
                <div className="field-content">
                  <label className="field-label">{t.dropoffLocation}</label>
                  <div className="custom-select" onClick={() => {
                    closeAllDropdowns();
                    setOpenDropdown(openDropdown === 'dropoff' ? null : 'dropoff');
                  }}>
                    <span className={searchFilters.dropoffLocation ? 'selected' : 'placeholder'}>
                      {searchFilters.dropoffLocation || t.selectLocation}
                    </span>
                    <ChevronDown size={18} className={`chevron ${openDropdown === 'dropoff' ? 'open' : ''}`} />
                  </div>
                  {openDropdown === 'dropoff' && (
                    <div className="dropdown-menu">
                      {locations.map(loc => (
                        <div 
                          key={loc} 
                          className={`dropdown-item ${searchFilters.dropoffLocation === loc ? 'active' : ''}`}
                          onClick={() => handleSelectLocation('dropoffLocation', loc)}
                        >
                          {loc}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tarih ve Saat Seçimi */}
            <div className="search-row">
              <div className="search-field" ref={pickupDateRef}>
                <div className="field-icon">
                  <Calendar size={20} />
                </div>
                <div className="field-content">
                  <label className="field-label">{t.pickupDate}</label>
                  <div 
                    className={`custom-select ${!searchFilters.pickupLocation ? 'disabled' : ''}`}
                    onClick={() => {
                      if (!searchFilters.pickupLocation) return;
                      closeAllDropdowns();
                      setShowPickupCalendar(!showPickupCalendar);
                    }}
                  >
                    <span className={searchFilters.pickupDate ? 'selected' : 'placeholder'}>
                      {searchFilters.pickupDate ? formatDate(searchFilters.pickupDate) : 'gg.aa.yyyy'}
                    </span>
                    <ChevronDown size={18} className={`chevron ${showPickupCalendar ? 'open' : ''}`} />
                  </div>
                  {showPickupCalendar && searchFilters.pickupLocation && (
                    <div className="dropdown-menu calendar-menu">
                      <div className="calendar-header">
                        <button className="calendar-nav-btn" onClick={() => handlePrevMonth('pickup')}>
                          ‹
                        </button>
                        <span className="calendar-month">
                          {generateCalendar(pickupCalendarMonth, new Date().toISOString().split('T')[0]).month} {generateCalendar(pickupCalendarMonth, new Date().toISOString().split('T')[0]).year}
                        </span>
                        <button className="calendar-nav-btn" onClick={() => handleNextMonth('pickup')}>
                          ›
                        </button>
                      </div>
                      <div className="calendar-weekdays">
                        {weekDays.map(day => (
                          <div key={day} className="calendar-weekday">{day}</div>
                        ))}
                      </div>
                      <div className="calendar-days">
                        {generateCalendar(pickupCalendarMonth, new Date().toISOString().split('T')[0]).days.map((dayObj, idx) => (
                          <div
                            key={idx}
                            className={`calendar-day ${dayObj.disabled ? 'disabled' : ''} ${
                              searchFilters.pickupDate && dayObj.date && 
                              new Date(searchFilters.pickupDate).getDate() === dayObj.day &&
                              new Date(searchFilters.pickupDate).getMonth() === dayObj.date.getMonth()
                                ? 'active' : ''
                            }`}
                            onClick={() => {
                              if (!dayObj.disabled && dayObj.date) {
                                handleSelectDate('pickupDate', dayObj.date.toISOString().split('T')[0]);
                              }
                            }}
                          >
                            {dayObj.day}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="search-field search-field-small" ref={pickupTimeRef}>
                <div className="field-icon">
                  <Clock size={20} />
                </div>
                <div className="field-content">
                  <label className="field-label">{t.pickupTime}</label>
                  <div className="custom-select" onClick={() => {
                    closeAllDropdowns();
                    setOpenDropdown(openDropdown === 'pickupTime' ? null : 'pickupTime');
                  }}>
                    <span className={searchFilters.pickupTime ? 'selected' : 'placeholder'}>
                      {searchFilters.pickupTime || '10:00'}
                    </span>
                    <ChevronDown size={18} className={`chevron ${openDropdown === 'pickupTime' ? 'open' : ''}`} />
                  </div>
                  {openDropdown === 'pickupTime' && (
                    <div className="dropdown-menu time-menu">
                      <div className="time-columns">
                        <div className="time-column">
                          {hours.map(hour => (
                            <div 
                              key={hour}
                              className={`dropdown-item ${searchFilters.pickupTime?.startsWith(hour) ? 'active' : ''}`}
                              onClick={() => handleSelectTime('pickupTime', `${hour}:00`)}
                            >
                              {hour}
                            </div>
                          ))}
                        </div>
                        <div className="time-column">
                          {minutes.map(minute => (
                            <div 
                              key={minute}
                              className={`dropdown-item ${searchFilters.pickupTime?.endsWith(minute) ? 'active' : ''}`}
                              onClick={() => {
                                const currentHour = searchFilters.pickupTime?.split(':')[0] || '10';
                                handleSelectTime('pickupTime', `${currentHour}:${minute}`);
                              }}
                            >
                              {minute}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="search-field" ref={dropoffDateRef}>
                <div className="field-icon">
                  <Calendar size={20}  />
                </div>
                <div className="field-content">
                  <label className="field-label">{t.dropoffDate}</label>
                  <div 
                    className={`custom-select ${!searchFilters.dropoffLocation || !searchFilters.pickupDate ? 'disabled' : ''}`}
                    onClick={() => {
                      if (!searchFilters.dropoffLocation || !searchFilters.pickupDate) return;
                      closeAllDropdowns();
                      setShowDropoffCalendar(!showDropoffCalendar);
                    }}
                  >
                    <span className={searchFilters.dropoffDate ? 'selected' : 'placeholder'}>
                      {searchFilters.dropoffDate ? formatDate(searchFilters.dropoffDate) : 'gg.aa.yyyy'}
                    </span>
                    <ChevronDown size={18} className={`chevron ${showDropoffCalendar ? 'open' : ''}`} />
                  </div>
                  {showDropoffCalendar && searchFilters.dropoffLocation && searchFilters.pickupDate && (
                    <div className="dropdown-menu calendar-menu">
                      <div className="calendar-header">
                        <button className="calendar-nav-btn" onClick={() => handlePrevMonth('dropoff')}>
                          ‹
                        </button>
                        <span className="calendar-month">
                          {generateCalendar(dropoffCalendarMonth, searchFilters.pickupDate).month} {generateCalendar(dropoffCalendarMonth, searchFilters.pickupDate).year}
                        </span>
                        <button className="calendar-nav-btn" onClick={() => handleNextMonth('dropoff')}>
                          ›
                        </button>
                      </div>
                      <div className="calendar-weekdays">
                        {weekDays.map(day => (
                          <div key={day} className="calendar-weekday">{day}</div>
                        ))}
                      </div>
                      <div className="calendar-days">
                        {generateCalendar(dropoffCalendarMonth, searchFilters.pickupDate).days.map((dayObj, idx) => (
                          <div
                            key={idx}
                            className={`calendar-day ${dayObj.disabled ? 'disabled' : ''} ${
                              searchFilters.dropoffDate && dayObj.date && 
                              new Date(searchFilters.dropoffDate).getDate() === dayObj.day &&
                              new Date(searchFilters.dropoffDate).getMonth() === dayObj.date.getMonth()
                                ? 'active' : ''
                            }`}
                            onClick={() => {
                              if (!dayObj.disabled && dayObj.date) {
                                handleSelectDate('dropoffDate', dayObj.date.toISOString().split('T')[0]);
                              }
                            }}
                          >
                            {dayObj.day}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="search-field search-field-small" ref={dropoffTimeRef}>
                <div className="field-icon">
                  <Clock size={20} />
                </div>
                <div className="field-content">
                  <label className="field-label">{t.dropoffTime}</label>
                  <div className="custom-select" onClick={() => {
                    closeAllDropdowns();
                    setOpenDropdown(openDropdown === 'dropoffTime' ? null : 'dropoffTime');
                  }}>
                    <span className={searchFilters.dropoffTime ? 'selected' : 'placeholder'}>
                      {searchFilters.dropoffTime || '10:00'}
                    </span>
                    <ChevronDown size={18} className={`chevron ${openDropdown === 'dropoffTime' ? 'open' : ''}`} />
                  </div>
                  {openDropdown === 'dropoffTime' && (
                    <div className="dropdown-menu time-menu">
                      <div className="time-columns">
                        <div className="time-column">
                          {hours.map(hour => (
                            <div 
                              key={hour}
                              className={`dropdown-item ${searchFilters.dropoffTime?.startsWith(hour) ? 'active' : ''}`}
                              onClick={() => handleSelectTime('dropoffTime', `${hour}:00`)}
                            >
                              {hour}
                            </div>
                          ))}
                        </div>
                        <div className="time-column">
                          {minutes.map(minute => (
                            <div 
                              key={minute}
                              className={`dropdown-item ${searchFilters.dropoffTime?.endsWith(minute) ? 'active' : ''}`}
                              onClick={() => {
                                const currentHour = searchFilters.dropoffTime?.split(':')[0] || '10';
                                handleSelectTime('dropoffTime', `${currentHour}:${minute}`);
                              }}
                            >
                              {minute}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

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