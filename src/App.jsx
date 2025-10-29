import { useState } from 'react';
import { useCarController } from './controllers/useCarController';
import { CarList } from './views/CarList';
import { RentalModal } from './views/RentalModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';  // ← Import'ları grupla
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';
import { useApp } from './context/AppContext';
import { useTranslation } from './utils/translations';
import './App.css';

function App() {
  const { language, showCarList } = useApp();
  const t = useTranslation(language);
  const { toasts, removeToast, success, error, warning } = useToast(); 

  const { cars, allCars, brands, rentCar } = useCarController();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarForRental, setSelectedCarForRental] = useState(null);

  const handleRentClick = (carId) => {
    const car = cars.find(c => c.id === carId);
    if (car && car.available) {
      setSelectedCarForRental(car);
      setIsModalOpen(true);
    } else {
      error(t.notAvailableMsg);
    }
  };

  const handleConfirmRental = (carId, days) => {
    const result = rentCar(carId);
    
    if (result.success) {
      const message = `${result.car.brand} ${result.car.model}\n${days} ${t.days} ${t.rentedFor}\n\n${t.total} ${(result.car.pricePerDay * days).toLocaleString('tr-TR')} ₺`;
      success(message, 5000);
      setIsModalOpen(false);
      setSelectedCarForRental(null);
    } else {
      error(result.message);
    }
  };

  const handleCancelRental = () => {
    setIsModalOpen(false);
    setSelectedCarForRental(null);
  };

  return (
    <div className="app">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <Navbar />
      
      <div className="app-container">
        <Hero />
        
        {/* Benefits Section - Hero ve CarList arasında */}
        <Benefits />
        
        {showCarList && (
          <CarList 
            cars={cars}
            allCars={allCars}
            brands={brands}
            onRentClick={handleRentClick}
          />
        )}
      </div>

      <Footer />

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