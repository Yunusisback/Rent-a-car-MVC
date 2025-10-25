import { describe, it, expect } from 'vitest';
import { CarModel } from '../models/CarModel';


describe('CarModel', () => {
  let carModel;

  beforeEach(() => {
    carModel = new CarModel();
  });

  it('tüm arabaları döndürür', () => {
    const cars = carModel.getAllCars();
    expect(cars).toHaveLength(21);
    expect(cars[0]).toEqual({
      id: 1,
      brand: 'Mercedes-Benz',
      model: 'C-200 4MATIC',
      pricePerDay: 1800,
      available: false,
      image: 'https://img.hasmer.com.tr/upload/k82261b.jpg?w=650',
      type: 'sedan',
      transmission: 'automatic',
      seats: 5,
      luggage: 4,
    });
  });

  it('id ile arabayı bulur', () => {
    const car = carModel.getCarById(1);
    expect(car).toEqual({
      id: 1,
      brand: 'Mercedes-Benz',
      model: 'C-200 4MATIC',
      pricePerDay: 1800,
      available: false,
      image: 'https://img.hasmer.com.tr/upload/k82261b.jpg?w=650',
      type: 'sedan',
      transmission: 'automatic',
      seats: 5,
      luggage: 4,
    });
  });

  it('geçersiz id için undefined döner', () => {
    const car = carModel.getCarById(999);
    expect(car).toBeUndefined();
  });


  it('arabaları filtreler (searchQuery)', () => {                            // vites
    const filters = { searchQuery: 'Mercedes', carType: 'all', brand: 'all', transmission: 'all', priceRange: null };
    const filteredCars = carModel.filterCars(filters);
    expect(filteredCars).toHaveLength(5); 
    expect(filteredCars.every((car) => car.brand.includes('Mercedes-Benz'))).toBe(true);

  });

  it('arabaları filtreler (carType)', () => {
    const filters = { searchQuery: '', carType: 'suv', brand: 'all', transmission: 'all', priceRange: null };
    const filteredCars = carModel.filterCars(filters);
    expect(filteredCars).toHaveLength(9); 
    expect(filteredCars.every((car) => car.type === 'suv')).toBe(true);
  });

  it('arabaları filtreler (priceRange)', () => {
    const filters = { searchQuery: '', carType: 'all', brand: 'all', transmission: 'all', priceRange: [1000, 3000] };
    const filteredCars = carModel.filterCars(filters);
    expect(filteredCars.every((car) => car.pricePerDay >= 1000 && car.pricePerDay <= 3000)).toBe(true);
  });

  it('arabaları filtreler (minSeats)', () => {
    const filters = { searchQuery: '', carType: 'all', brand: 'all', transmission: 'all', priceRange: null, minSeats: 7 };
    const filteredCars = carModel.filterCars(filters);
    expect(filteredCars.every((car) => car.seats >= 7)).toBe(true);
  });

  it('arabaları filtreler (minLuggage)', () => {
    const filters = { searchQuery: '', carType: 'all', brand: 'all', transmission: 'all',  priceRange: null, minLuggage: 5 };
    const filteredCars = carModel.filterCars(filters);
    expect(filteredCars.every((car) => car.luggage >= 5)).toBe(true);
  });

  it('tüm markaları sıralı olarak döndürür', () => {
    const brands = carModel.getAllBrands();
    expect(brands).toEqual([
      'Audi',
      'BMW',
      'Cadillac',
      'Chevrolet',
      'Citroen',
      'Ford',
      'Land Rover',
      'Lexus',
      'Mercedes-Benz',
      'Nissan',
      'Porsche',
      'Toyota',
      'Volkswagen',
      'Volvo',
    ]);
  });

  it('tüm koltuk sayılarını sıralı olarak döndürür', () => {
    const seats = carModel.getAllSeatsOptions();
    expect(seats).toEqual([2, 5, 7, 8, 9]);
  });

  it('tüm bagaj kapasitelerini sıralı olarak döndürür', () => {
    const luggage = carModel.getAllLuggageOptions();
    expect(luggage).toEqual([1, 2, 3, 4, 5, 6, 8]);
  });

  it('arabayı kiralar ve available’ı false yapar', () => {
    const result = carModel.rentCar(5);
    expect(result).toEqual({
      success: true,
      message: 'Araç kiralandı',
      car: expect.objectContaining({ id: 5, available: false }),
    });
    expect(carModel.getCarById(5).available).toBe(false);
  });

  it('müsait olmayan arabayı kiralayamaz', () => {
    const result = carModel.rentCar(1);
    expect(result).toEqual({ success: false, message: 'Araç zaten kiralanmış' });
  });

  it('geçersiz id için kiralama başarısız olur', () => {
    const result = carModel.rentCar(999);
    expect(result).toEqual({ success: false, message: 'Araç bulunamadı' });
  });

  it('fiyatı doğru hesaplar', () => {
    const price = carModel.calculatePrice(5, 3);
    expect(price).toBe(600 * 3);
  });

  it('geçersiz id veya gün için null döner', () => {
    expect(carModel.calculatePrice(999, 3)).toBeNull();
    expect(carModel.calculatePrice(5, -1)).toBeNull();
  });

  it('araba sayısını doğru döndürür', () => {
    expect(carModel.getCarCount()).toBe(21);
  });
});