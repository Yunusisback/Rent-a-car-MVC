import { useState, useEffect } from 'react';


// course notes

/**
 * Debounce hook - Değer değişimini geciktirir 
 * @param {any} value - Debounce edilecek değer
 * @param {number} delay - Gecikme süresi (ms)
 * @returns {any} Debounced değer
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {

    // Zamanlayıcı kur
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Yeni değer gelirse eski zamanlayıcıyı iptal et 
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}