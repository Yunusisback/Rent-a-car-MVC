import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  
  // Dark Mode her zaman aktif

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Dil (tr-en)

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'tr';
  });

  // 🆕 CarList göster/gizle

  const [showCarList, setShowCarList] = useState(false);

  // Arama-Filtreleme stateleri

  const [searchFilters, setSearchFilters] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    pickupTime: '10:00',
    dropoffTime: '10:00',
    carType: 'all',
    priceRange: [0, 10000],
    transmission: 'all',
    brand: 'all',
    searchQuery: ''
  });

  // Dil değiştiğinde
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = (lang) => setLanguage(lang);

  // Filtreleri güncelle

  const updateFilters = (newFilters) => {
    setSearchFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Filtreleri sıfırla

  const resetFilters = () => {
    setSearchFilters({
      pickupLocation: '',
      dropoffLocation: '',
      pickupDate: '',
      dropoffDate: '',
      pickupTime: '10:00',
      dropoffTime: '10:00',
      carType: 'all',
      priceRange: [0, 10000],
      transmission: 'all',
      brand: 'all',
      searchQuery: ''
    });
  };

  return (
    <AppContext.Provider value={{
      language,
      changeLanguage,
      searchFilters,
      updateFilters,
      resetFilters,
      showCarList,
      setShowCarList
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}