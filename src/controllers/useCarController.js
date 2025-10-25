import { useState, useMemo } from 'react';
import { CarModel } from '../models/CarModel';
import { useApp } from '../context/AppContext';

export function useCarController() {
  const { searchFilters } = useApp();
  const [carModel] = useState(() => new CarModel());
  const [selectedCar, setSelectedCar] = useState(null);
  const [rentalDays, setRentalDays] = useState(1);

  //  filtrelenmiş araçlar useMemo ile optimize

  const filteredCars = useMemo(() => {
    return carModel.filterCars(searchFilters);
  }, [carModel, searchFilters]);

  // Tüm araçlar (filtresiz)

  const allCars = carModel.getAllCars();

  //  Tüm markaları getir

  const brands = carModel.getAllBrands();

  const refreshCars = () => {

    // Bu fonksiyon artık filtreleme yapıyor

    return filteredCars;
  };

  const rentCar = (carId) => {
    const result = carModel.rentCar(carId);
    
    if (result.success) {
      setSelectedCar(null);
    }
    
    return result;
  };

  const selectCar = (carId) => {
    const car = carModel.getCarById(carId);
    setSelectedCar(car);
  };

  const cancelSelection = () => {
    setSelectedCar(null);
    setRentalDays(1);
  };

  const calculateTotalPrice = () => {
    if (!selectedCar) return 0;
    return carModel.calculatePrice(selectedCar.id, rentalDays);
  };

  const updateRentalDays = (days) => {
    if (days > 0) {
      setRentalDays(days);
    }
  };

  return {
    cars: filteredCars,      // Filtrelenmiş araçlar
    allCars,                 // tüm araçlar
    brands,                  // Marka listesi
    selectedCar,
    rentalDays,
    
    rentCar,
    selectCar,
    cancelSelection,
    calculateTotalPrice,
    updateRentalDays,
    refreshCars
  };
}