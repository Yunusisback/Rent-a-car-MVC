import { createContext, useContext, useState, useEffect } from 'react';



const AppContext = createContext();

export function AppProvider({ children }) {

  // Dark Mode

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  // Dil (tr/en)

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'tr';
  });

  // Dark mode değiştiğinde

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Dil değiştiğinde
  
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => setIsDark(!isDark);
  const changeLanguage = (lang) => setLanguage(lang);

  return (
    <AppContext.Provider value={{
      isDark,
      toggleTheme,
      language,
      changeLanguage
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}