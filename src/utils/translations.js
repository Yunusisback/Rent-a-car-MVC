export const translations = {
  tr: {
    // Başlık
    title: 'LuxDrive EU',
    subtitle: '𝑬𝒏 𝒊𝒚𝒊 𝒂𝒓𝒂ç𝒍𝒂𝒓ı 𝒌𝒆ş𝒇𝒆𝒅𝒊𝒏 𝒗𝒆 𝒉𝒆𝒎𝒆𝒏 𝒌𝒊𝒓𝒂𝒍𝒂𝒚ı𝒏',

    // header özellikleri
    fastReservation: 'Hızlı Rezervasyon',
    fastReservationIcon: '⚡',
    insuranceIncluded: 'Sigorta Dahil',
    insuranceIcon: '🛡️',
    luxuryCars: 'Lüks Araçlar',
    luxuryIcon: '💎',
    europeWide: 'Avrupa Geneli',
    europeIcon: '🌍',

    // İstatistikler
    totalCars: 'Gösterilen Araç',
    availableCars: 'Müsait Araç',

    // Araç Kartı
    perDay: '/ gün',
    rent: 'Kirala',
    notAvailable: 'Müsait Değil',
    available: '✓ Müsait',
    unavailable: '✗ Dolu',

    // modal
    rentalTitle: 'Araç Kiralama',
    howManyDays: 'Kaç gün kiralamak istiyorsunuz?',
    maxDays: '(Maksimum 30 gün)',
    dailyPrice: 'Günlük Fiyat:',
    dayCount: 'Gün Sayısı:',
    days: 'gün',
    total: 'Toplam:',
    cancel: 'İptal',
    confirm: 'Kiralama Onayı',

    // Mesajlar
    successRental: '✅ Başarılı!',
    rentedFor: 'gün için kiralandı!',
    notAvailableMsg: '❌ Bu araç müsait değil!',

    // Boş Durum
    noResults: '🔍 Sonuç Bulunamadı',
    noResultsDesc: 'Arama kriterlerinize uygun araç bulunamadı',

    // Ayarlar
    darkMode: 'Karanlık Mod',
    language: 'Dil'
  },

  en: {
    // Başlık
    title: 'LuxDrive EU',
    subtitle: '𝘋𝘪𝘴𝘤𝘰𝘷𝘦𝘳 𝘵𝘩𝘦 𝘣𝘦𝘴𝘵 𝘤𝘢𝘳𝘴 𝘢𝘯𝘥 𝘳𝘦𝘯𝘵 𝘯𝘰𝘸',

    // header Özellikleri
    fastReservation: 'Fast Reservation',
    insuranceIncluded: 'Insurance Included',
    luxuryCars: 'Luxury Cars',
    europeWide: 'Europe Wide',

    // İstatistikler
    totalCars: 'Showing Cars',
    availableCars: 'Available Cars',

    // Araç Kartı
    perDay: '/ day',
    rent: 'Rent',
    notAvailable: 'Not Available',
    available: '✓ Available',
    unavailable: '✗ Rented',

    // Modal
    rentalTitle: 'Car Rental',
    howManyDays: 'How many days would you like to rent?',
    maxDays: '(Maximum 30 days)',
    dailyPrice: 'Daily Price:',
    dayCount: 'Day Count:',
    days: 'days',
    total: 'Total:',
    cancel: 'Cancel',
    confirm: 'Confirm Rental',

    // Mesajlar
    successRental: '✅ Success!',
    rentedFor: 'rented for days!',
    notAvailableMsg: '❌ This car is not available!',

    // Boş Durum
    noResults: '🔍 No Results Found',
    noResultsDesc: 'No cars match your search criteria',

    // Ayarlar
    darkMode: 'Dark Mode',
    language: 'Language'
  }
};

// Çeviri fonksiyonu belirtilen dili döndürür veya varsayılan olarak Türkçe'yi kullanır
export function useTranslation(language) {
  return translations[language] || translations.tr;
}