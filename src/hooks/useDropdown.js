
import { useState, useEffect, useCallback } from 'react';


/**
 * Açılır menülerin (dropdown/calendar) stateini ve dışarı tıklama (click-outside) mantığını yönetir
 * @param {Array<React.RefObject>} refs - Kapanmaması gereken tüm elementlerin referansları
 */

export function useDropdown(refs) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showPickupCalendar, setShowPickupCalendar] = useState(false);
  const [showDropoffCalendar, setShowDropoffCalendar] = useState(false);

  // Tüm açılır menüleri ve takvimleri kapatan ortak fonksiyon

  const closeAllDropdowns = useCallback(() => {
    setOpenDropdown(null);
    setShowPickupCalendar(false);
    setShowDropoffCalendar(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {

      // Geçirilen tüm reflerden herhangi birine tıklanıp tıklanmadığını kontrol eder

      const clickedInside = refs.some(ref => 
        ref.current && ref.current.contains(event.target)
      );
      
      // Eğer tıklama listelenen reflerin dışındaysa, hepsini kapat

      if (!clickedInside) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [refs, closeAllDropdowns]);

  return {
    openDropdown, setOpenDropdown,
    showPickupCalendar, setShowPickupCalendar,
    showDropoffCalendar, setShowDropoffCalendar,
    closeAllDropdowns
  };
}