import { useState } from 'react';
import { useCarController } from './controllers/useCarController';
import { CarList } from './views/CarList';
import { RentalModal } from './views/RentalModal';
import { SettingsButton } from './views/SettingsButton';
import { Hero } from './components/Hero';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';
import { useApp } from './context/AppContext';
import { useTranslation } from './utils/translations';
import './App.css';



function App() {

  // Contextten dil ve tema bilgisi al

  const { language } = useApp();
  const t = useTranslation(language);
  const { toasts, removeToast, success, error } = useToast();

  // Controllerdan state ve fonksiyonları al

  const { cars, rentCar } = useCarController();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarForRental, setSelectedCarForRental] = useState(null);

  // Kirala butonuna tıklandığında modal aç

  const handleRentClick = (carId) => {
    const car = cars.find(c => c.id === carId);
    if (car && car.available) {
      setSelectedCarForRental(car);
      setIsModalOpen(true);
    } else {
      error(t.notAvailableMsg);
    }
  };

  // Modaldan kiralama onayı

  const handleConfirmRental = (carId, days) => {
    const result = rentCar(carId);
    
    if (result.success) {
      const message = `${result.car.brand} ${result.car.model}\n${days} ${t.days} ${t.rentedFor}\n\n${t.total} ${result.car.pricePerDay * days} ₺`;
      success(message, 5000);
      setIsModalOpen(false);
      setSelectedCarForRental(null);
    } else {
      error(result.message);
    }
  };

  // Modalı kapat

  const handleCancelRental = () => {
    setIsModalOpen(false);
    setSelectedCarForRental(null);
  };

  return (
    <div className="app">

      {/* Toast Bildirimleri */}

      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Ayarlar Butonu */}
      <SettingsButton />
      <div className="app-container">

        {/* Hero Section */}
        <Hero />

        {/* Araç Listesi */}
        <CarList 
          cars={cars} 
          onRentClick={handleRentClick}
        />
      </div>

      {/* Kiralama Modal */}
      
      {isModalOpen && selectedCarForRental && (
        <RentalModal
          car={selectedCarForRental}
          onConfirm={handleConfirmRental}
          onCancel={handleCancelRental}
        />
      )}
    </div>
  );
}

export default App;