
import { useState, useRef, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';


// Yeni hooklar ve yardımcı fonksiyonlar

import { useDropdown } from '../hooks/useDropdown'; 
import { generateCalendarData } from '../utils/CalendarUtils'; 

// Yeni Alt Bileşenler

import { LocationSelect } from '../views/LocationSelect'; 
import { DateSelect } from '../views/DateSelect'; 
import { TimeSelect } from '../views/TimeSelect'; 

import '../styles/Hero.css';

export function Hero() {
  const { language, searchFilters, updateFilters, setShowCarList } = useApp();
  const t = useTranslation(language);
  
  // Takvim ayı stateleri

  const [pickupCalendarMonth, setPickupCalendarMonth] = useState(new Date());
  const [dropoffCalendarMonth, setDropoffCalendarMonth] = useState(new Date());
  
  // Tüm Refler tek bir yerde 

  const refs = { 
      pickupRef: useRef(null), 
      dropoffRef: useRef(null), 
      pickupTimeRef: useRef(null), 
      dropoffTimeRef: useRef(null), 
      pickupDateRef: useRef(null), 
      dropoffDateRef: useRef(null) 
  };
  const refArray = Object.values(refs);

  // Özel Dropdown Hook Kullanımı

  const { 
    openDropdown, setOpenDropdown, 
    showPickupCalendar, setShowPickupCalendar, 
    showDropoffCalendar, setShowDropoffCalendar,
    closeAllDropdowns 
  } = useDropdown(refArray);

  // Ortak Seçim İşleyicisi

  const handleSelectFilter = useCallback((name, value) => {
    updateFilters({ [name]: value });
    
    // Dropdown veya Saat seçiliyorsa kapat

    if (['pickupLocation', 'dropoffLocation', 'pickupTime', 'dropoffTime'].includes(name)) {
        setOpenDropdown(null);

    } else { 

        setShowPickupCalendar(false);
        setShowDropoffCalendar(false);
    }
  }, [updateFilters, setOpenDropdown, setShowPickupCalendar, setShowDropoffCalendar]);

  // Takvim Ay Navigasyonu İşleyicileri

  const handleMonthChange = useCallback((calendarType, direction) => {
    const setter = calendarType === 'pickup' ? setPickupCalendarMonth : setDropoffCalendarMonth;
    setter(prev => {
        const newMonth = new Date(prev);
        newMonth.setMonth(newMonth.getMonth() + direction);
        return newMonth;
    });
  }, []);

  const handlePrevMonth = useCallback((calendarType) => handleMonthChange(calendarType, -1), [handleMonthChange]);
  const handleNextMonth = useCallback((calendarType) => handleMonthChange(calendarType, 1), [handleMonthChange]);

  // Takvim Datasını Oluşturma (Memoized)

  const baseGenerateCalendar = useCallback((...args) => generateCalendarData(...args, language), [language]);

  const pickupCalendarData = useMemo(() => 
    baseGenerateCalendar(pickupCalendarMonth, new Date().toISOString().split('T')[0]),
    [pickupCalendarMonth, baseGenerateCalendar]
  );
  
  const dropoffCalendarData = useMemo(() => 
    baseGenerateCalendar(dropoffCalendarMonth, searchFilters.pickupDate),
    [dropoffCalendarMonth, searchFilters.pickupDate, baseGenerateCalendar]
  );

  // Statik Veriler (Memoized)

  const locations = useMemo(() => language === 'tr' 
    ? [
        'İstanbul Havalimanı', 'Frankfurt Havalimanı', 'Londra Heathrow Havalimanı',
        'Charles de Gaulle Havalimanı', 'Amsterdam Schiphol Havalimanı',
        'Roma Fiumicino Havalimanı', 'Madrid Barajas Havalimanı', 'Zürih Havalimanı',
        'Viyana Havalimanı', 'Brüksel Havalimanı', 'Atina Eleftherios Venizelos Havalimanı',
        'Lizbon Havalimanı', 'Stockholm Arlanda Havalimanı', 'Helsinki Vantaa Havalimanı',
        'Varşova Chopin Havalimanı'
      ]
    : [
        'Istanbul Airport', 'Frankfurt Airport', 'London Heathrow Airport',
        'Charles de Gaulle Airport', 'Amsterdam Schiphol Airport',
        'Rome Fiumicino Airport', 'Madrid Barajas Airport', 'Zurich Airport',
        'Vienna Airport', 'Brussels Airport', 'Athens Eleftherios Venizelos Airport',
        'Lisbon Airport', 'Stockholm Arlanda Airport', 'Helsinki Vantaa Airport',
        'Warsaw Chopin Airport'
      ], 
    [language]
  );

  const isFormValid = useMemo(() => 
    searchFilters.pickupLocation && 
    searchFilters.dropoffLocation && 
    searchFilters.pickupDate && 
    searchFilters.dropoffDate,
    [searchFilters]
  );

  const handleSearch = useCallback(() => {
    closeAllDropdowns();
    setShowCarList(true);


    setTimeout(() => {
        const carListElement = document.querySelector('.car-list-wrapper');
        if (carListElement) {
            carListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
  }, [setShowCarList, closeAllDropdowns]);


  return (
    <div className="hero-section-new">
      <div className="hero-overlay"></div>
      <div className="hero-wrapper">
        
        {/* Başlık Bölümü */}
        <div className="hero-header">
          <h1 className="hero-main-title">{t.title}</h1>
          <p className="hero-main-subtitle">{t.subtitle}</p>
        </div>

        {/* Arama Formu z */}
        <div className="search-box-main">
          <div className="search-box-inner">

            {/* Lokasyon Seçimi */}
            <div className="search-row">
              <LocationSelect
                t={t}
                label={t.pickupLocation}
                name="pickupLocation"
                value={searchFilters.pickupLocation}
                openDropdown={openDropdown}
                setOpenDropdown={(name) => {closeAllDropdowns(); setOpenDropdown(name)}}
                locations={locations}
                handleSelect={handleSelectFilter}
                refProp={refs.pickupRef}
              />
              <LocationSelect
                t={t}
                label={t.dropoffLocation}
                name="dropoffLocation"
                value={searchFilters.dropoffLocation}
                openDropdown={openDropdown}
                setOpenDropdown={(name) => {closeAllDropdowns(); setOpenDropdown(name)}}
                locations={locations}
                handleSelect={handleSelectFilter}
                refProp={refs.dropoffRef}
              />
            </div>
            
            {/* Tarih ve Saat Seçimi */}
            <div className="search-row">

              {/* Pickup Tarih */}
              <DateSelect
                t={t}
                label={t.pickupDate}
                name="pickupDate"
                value={searchFilters.pickupDate}
                isEnabled={!!searchFilters.pickupLocation}
                showCalendar={showPickupCalendar}
                setShowCalendar={(val) => {closeAllDropdowns(); setShowPickupCalendar(val)}}
                calendarData={pickupCalendarData}
                handleSelectDate={handleSelectFilter}
                handlePrevMonth={handlePrevMonth}
                handleNextMonth={handleNextMonth}
                refProp={refs.pickupDateRef}
                calendarType="pickup"
                language={language}
              />
              
              {/* Pickup Saat */}
              <TimeSelect
                t={t}
                label={t.pickupTime}
                name="pickupTime"
                value={searchFilters.pickupTime || '10:00'}
                openDropdown={openDropdown}
                setOpenDropdown={(name) => {closeAllDropdowns(); setOpenDropdown(name)}}
                handleSelect={handleSelectFilter}
                refProp={refs.pickupTimeRef}
              />

              {/* Dropoff Tarih */}
              <DateSelect
                t={t}
                label={t.dropoffDate}
                name="dropoffDate"
                value={searchFilters.dropoffDate}
                isEnabled={!!searchFilters.dropoffLocation && !!searchFilters.pickupDate}
                showCalendar={showDropoffCalendar}
                setShowCalendar={(val) => {closeAllDropdowns(); setShowDropoffCalendar(val)}}
                calendarData={dropoffCalendarData}
                handleSelectDate={handleSelectFilter}
                handlePrevMonth={handlePrevMonth}
                handleNextMonth={handleNextMonth}
                refProp={refs.dropoffDateRef}
                calendarType="dropoff"
                language={language}
              />

              {/* Dropoff Saat */}
              <TimeSelect
                t={t}
                label={t.dropoffTime}
                name="dropoffTime"
                value={searchFilters.dropoffTime || '10:00'}
                openDropdown={openDropdown}
                setOpenDropdown={(name) => {closeAllDropdowns(); setOpenDropdown(name)}}
                handleSelect={handleSelectFilter}
                refProp={refs.dropoffTimeRef}
              />
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