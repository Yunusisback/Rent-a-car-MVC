// src/utils/CalendarUtils.js

/**
 * ISO tarih dizisini DD.MM.YYYY formatına dönüştürür.
 * @param {string} dateString - 'YYYY-MM-DD' formatında tarih dizisi.
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  // Date objesi oluştururken saat dilimi sorunlarını önlemek için sadece tarih kısmını kullanıyoruz.
  const date = new Date(dateString); 
  
  // Date objesi oluşturulurken, tarayıcı yerel saat dilimini kullanır, bu nedenle saat sıfırlanmalıdır.
  // Ancak `new Date(dateString)` ile zaten günün başını hedefliyoruz.
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
};

/**
 * Belirtilen ay için takvim günlerini içeren bir dizi oluşturur.
 * @param {Date} displayMonth - Hangi ayın gösterileceği.
 * @param {string} minDate - Seçilebilecek en erken tarih ('YYYY-MM-DD').
 * @param {string} language - Dil ayarı ('tr' veya 'en').
 */
export const generateCalendarData = (displayMonth, minDate, language) => {
  const year = displayMonth.getFullYear();
  const month = displayMonth.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  // Takvimde haftanın başlangıcı Pazartesi (1) olmalı (0 Pazar).
  // getDay() Pazar'ı 0, Pazartesi'yi 1 verir. Biz Pazar'ı 6 (son gün), Pazartesi'yi 0 (ilk gün) yapmak istiyoruz.
  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  
  const days = [];
  
  // Sınır tarihlerini (minDate) saat/dakika/saniye olmadan oluşturun
  const minDateObj = minDate ? new Date(minDate) : null;
  const minDateTime = minDateObj ? new Date(minDateObj.setHours(0,0,0,0)).getTime() : null;
  
  // Önceki ayın boşlukları
  for (let i = 0; i < startDay; i++) {
    days.push({ day: '', disabled: true });
  }
  
  // Ayın günleri
  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(year, month, i);
    const dayDateTime = dayDate.getTime();
    
    // MinDate'ten önceki günleri devre dışı bırak. (Karşılaştırma saat sıfırlanmış olarak yapılır)
    const isDisabled = minDateTime ? dayDateTime < minDateTime : false;
      
    days.push({ day: i, disabled: isDisabled, date: dayDate });
  }
  
  const locale = language === 'tr' ? 'tr-TR' : 'en-US';
  
  return { 
    days, 
    month: displayMonth.toLocaleString(locale, { month: 'long' }), 
    year 
  };
};