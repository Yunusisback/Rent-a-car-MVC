import { describe, test, expect, beforeEach } from 'vitest';
import { CarModel } from '../models/CarModel';


let carModel;

beforeEach(() => {
  carModel = new CarModel();
});

// Araç Listeleme

describe('Araç Listeleme', () => {
  
  test('21 araç olmalı', () => {
    const cars = carModel.getAllCars();
    expect(cars.length).toBe(21);
  });

  test('Toplam sayı 21 olmalı', () => {
    const count = carModel.getCarCount();
    expect(count).toBe(21);
  });
});

//  Araç Bulma

describe('Araç Bulma', () => {
  
  test('ID 5 - Volkswagen Beetle bulmalı', () => {
    const car = carModel.getCarById(5);
    
    expect(car).toBeTruthy();
    expect(car.brand).toBe('Volkswagen');
    expect(car.model).toBe('Beetle');
  });

  test('Olmayan ID - undefined dönmeli', () => {
    const car = carModel.getCarById(999);
    expect(car).toBeUndefined();
  });
});

//  Araç Kiralama

describe('Araç Kiralama', () => {
  
  test('Müsait araç kiralanabilmeli (ID 5)', () => {
    const result = carModel.rentCar(5);
    
    expect(result.success).toBe(true);
    expect(result.message).toBe('Araç kiralandı');
    
    const car = carModel.getCarById(5);
    expect(car.available).toBe(false);
  });

  test('Dolu araç kiralanamaz (ID 1)', () => {
    const result = carModel.rentCar(1);
    
    expect(result.success).toBe(false);
    expect(result.message).toBe('Araç zaten kiralanmış');
  });

  test('Olmayan araç kiralanamaz', () => {
    const result = carModel.rentCar(999);
    
    expect(result.success).toBe(false);
    expect(result.message).toBe('Araç bulunamadı');
  });
});

//  Fiyat Hesaplama

describe('Fiyat Hesaplama', () => {
  
  test('1 günlük fiyat - ID 5 (600 TL)', () => {
    const price = carModel.calculatePrice(5, 1);
    expect(price).toBe(600);
  });

  test('3 günlük fiyat - ID 5 (1800 TL)', () => {
    const price = carModel.calculatePrice(5, 3);
    expect(price).toBe(1800);
  });

  test('Olmayan araç - null dönmeli', () => {
    const price = carModel.calculatePrice(999, 5);
    expect(price).toBe(null);
  });

  test('Negatif gün - null dönmeli', () => {
    const price = carModel.calculatePrice(5, -1);
    expect(price).toBe(null);
  });
});