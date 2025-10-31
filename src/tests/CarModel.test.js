import { describe, it, expect, beforeEach } from 'vitest';
import { CarModel } from '../models/CarModel';

describe('CarModel', () => {
    let carModel;

    beforeEach(() => {
        carModel = new CarModel();
    });

    it('tüm arabaları döndürür', () => {
        const cars = carModel.getAllCars();
        expect(cars).toHaveLength(24);
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
            luggage: 455,
            doors: 4
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
            luggage: 455,
            doors: 4
        });
    });

    it('geçersiz id için undefined döner', () => {
        const car = carModel.getCarById(999);
        expect(car).toBeUndefined();
    });

    it('arabaları filtreler (searchQuery)', () => {
        const filters = { searchQuery: 'Mercedes', carType: 'all', brand: 'all', transmission: 'all', priceRange: null };
        const filteredCars = carModel.filterCars(filters);
        expect(filteredCars).toHaveLength(5);
        expect(filteredCars.every((car) => 
            car.brand.includes('Mercedes-Benz') || car.model.toLowerCase().includes('mercedes')
        )).toBe(true);
    });

    it('arabaları filtreler (carType)', () => {
        const filters = { searchQuery: '', carType: 'suv', brand: 'all', transmission: 'all', priceRange: null };
        const filteredCars = carModel.filterCars(filters);
        expect(filteredCars).toHaveLength(10);
        expect(filteredCars.every((car) => car.type.toLowerCase() === 'suv')).toBe(true);
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
        const filters = { searchQuery: '', carType: 'all', brand: 'all', transmission: 'all', priceRange: null, minLuggage: 500 };
        const filteredCars = carModel.filterCars(filters);
        expect(filteredCars.every((car) => car.luggage >= 500)).toBe(true);
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
            'Volvo'
        ]);
    });

    it('tüm koltuk sayılarını sıralı olarak döndürür', () => {
        const seats = carModel.getAllSeatsOptions();
        expect(seats).toEqual([2, 4, 5, 7, 8, 9]);
    });

    it('tüm bagaj kapasitelerini sıralı olarak döndürür', () => {
        const luggage = carModel.getAllLuggageOptions();
        expect(luggage).toEqual([
            100, 300, 366, 370, 455, 480, 515, 550, 565, 586,
            607, 610, 725, 750, 770, 780, 810, 834, 890, 969,
            1045, 1200, 2060, 2065
        ]);
    });

    it('arabayı kiralar ve available\'ı false yapar', () => {
        const result = carModel.rentCar(5);
        expect(result).toEqual({
            success: true,
            message: 'Araç kiralandı',
            car: expect.objectContaining({ id: 5, available: false })
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
        expect(carModel.getCarCount()).toBe(24);
    });

    it('SUV tipindeki arabaları filtreler', () => {
        const filters = { searchQuery: '', carType: 'suv', brand: 'all', transmission: 'all', priceRange: null };
        const filteredCars = carModel.filterCars(filters);
        
        expect(filteredCars.length).toBeGreaterThan(0);
        expect(filteredCars.length).toBe(10);
        
        const car19 = filteredCars.find(car => car.id === 19);
        expect(car19).toBeUndefined();
        
        expect(filteredCars.every(car => car.type === 'suv')).toBe(true);
    });

    it('sport ve sports tipindeki arabaları bulur', () => {
        const allCars = carModel.getAllCars();
        const sportsCars = allCars.filter(car => 
            car.type.toLowerCase().includes('sport')
        );
        
        expect(sportsCars.length).toBeGreaterThan(0);
        expect(sportsCars.some(car => car.id === 7)).toBe(true);
        expect(sportsCars.some(car => car.id === 23)).toBe(true);
    });

    it('doors property tüm arabalarda var', () => {
        const cars = carModel.getAllCars();
        cars.forEach(car => {
            expect(car).toHaveProperty('doors');
            expect(typeof car.doors).toBe('number');
            expect(car.doors).toBeGreaterThan(0);
        });
    });

    it('lüks arabaları bulur', () => {
        const filters = { searchQuery: '', carType: 'luxury', brand: 'all', transmission: 'all', priceRange: null };
        const luxuryCars = carModel.filterCars(filters);
        
        expect(luxuryCars.length).toBeGreaterThan(0);
        expect(luxuryCars.every(car => car.type === 'luxury')).toBe(true);
    });

    it('otomatik vitesli arabaları filtreler', () => {
        const filters = { searchQuery: '', carType: 'all', brand: 'all', transmission: 'automatic', priceRange: null };
        const automaticCars = carModel.filterCars(filters);
        
        expect(automaticCars.length).toBeGreaterThan(0);
        expect(automaticCars.every(car => car.transmission === 'automatic')).toBe(true);
    });

    it('manuel vitesli arabaları filtreler', () => {
        const filters = { searchQuery: '', carType: 'all', brand: 'all', transmission: 'manual', priceRange: null };
        const manualCars = carModel.filterCars(filters);
        
        expect(manualCars.length).toBeGreaterThan(0);
        expect(manualCars.every(car => car.transmission === 'manual')).toBe(true);
    });

    it('yüksek fiyatlı arabaları filtreler', () => {
        const filters = { searchQuery: '', carType: 'all', brand: 'all', transmission: 'all', priceRange: [4000, 10000] };
        const expensiveCars = carModel.filterCars(filters);
        
        expect(expensiveCars.length).toBeGreaterThan(0);
        expect(expensiveCars.every(car => car.pricePerDay >= 4000)).toBe(true);
    });

    it('müsait arabaları sayar', () => {
        const allCars = carModel.getAllCars();
        const availableCars = allCars.filter(car => car.available);
        
        expect(availableCars.length).toBeGreaterThan(0);
    });

    it('birden fazla filtreyi birlikte uygular', () => {
        const filters = {
            searchQuery: '',
            carType: 'suv',
            brand: 'all',
            transmission: 'automatic',
            priceRange: [2000, 3500],
            minSeats: 7
        };
        
        const filteredCars = carModel.filterCars(filters);
        
        filteredCars.forEach(car => {
            expect(car.type.toLowerCase()).toBe('suv');
            expect(car.transmission).toBe('automatic');
            expect(car.pricePerDay).toBeGreaterThanOrEqual(2000);
            expect(car.pricePerDay).toBeLessThanOrEqual(3500);
            expect(car.seats).toBeGreaterThanOrEqual(7);
        });
    });
});