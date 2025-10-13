import { useState } from 'react';
import { CarModel } from '../models/CarModel';

export function useCarController() {

  // Modeli oluştur (sadece bir kere)
  const [carModel] = useState(() => new CarModel());
  
  // Araçları state tut
  const [cars, setCars] = useState(carModel.getAllCars());
  
  // Seçili araç (kiralama için)
  const [selectedCar, setSelectedCar] = useState(null);
  
  // Kiralama gün sayısı
  const [rentalDays, setRentalDays] = useState(1);

  // Araçları yenile (modelden çek)
  const refreshCars = () => {
    setCars(carModel.getAllCars());
  };

  // Araç kirala

  const rentCar = (carId) => {
    const result = carModel.rentCar(carId);
    
    if (result.success) {
      refreshCars(); 
      setSelectedCar(null); 
    }
    
    return result;
  };

  // Araç seç (kiralama modalı için)

  const selectCar = (carId) => {
    const car = carModel.getCarById(carId);
    setSelectedCar(car);
  };

  // Seçimi iptal et

  const cancelSelection = () => {
    setSelectedCar(null);
    setRentalDays(1);
  };

  // Toplam fiyat hesapla

  const calculateTotalPrice = () => {
    if (!selectedCar) return 0;
    return carModel.calculatePrice(selectedCar.id, rentalDays);
  };

  // Gün sayısını değiştir
  
  const updateRentalDays = (days) => {
    if (days > 0) {
      setRentalDays(days);
    }
  };

  
  return {
    cars,
    selectedCar,
    rentalDays,
    
    // fonksiyonlar

    rentCar,
    selectCar,
    cancelSelection,
    calculateTotalPrice,
    updateRentalDays,
    refreshCars
  };
}

