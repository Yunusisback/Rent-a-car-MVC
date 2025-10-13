import { describe, test, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCarController } from '../controllers/useCarController';



//  Başlangıç Durumu

describe('Controller Başlangıç', () => {
  
  test('21 araç olmalı', () => {
    const { result } = renderHook(() => useCarController());
    expect(result.current.cars.length).toBe(21);
  });

  test('Seçili araç null olmalı', () => {
    const { result } = renderHook(() => useCarController());
    expect(result.current.selectedCar).toBe(null);
  });

  test('Kiralama günü 1 olmalı', () => {
    const { result } = renderHook(() => useCarController());
    expect(result.current.rentalDays).toBe(1);
  });
});

//  Araç Seçme

describe('Araç Seçme', () => {
  
  test('Araç seçilebilmeli', () => {
    const { result } = renderHook(() => useCarController());
    
    act(() => {
      result.current.selectCar(5); 
    });
    
    expect(result.current.selectedCar).not.toBe(null);
    expect(result.current.selectedCar.brand).toBe('Volkswagen');
  });

  test('Seçim iptal edilebilmeli', () => {
    const { result } = renderHook(() => useCarController());
    
    act(() => {
      result.current.selectCar(5);
      result.current.cancelSelection();
    });
    
    expect(result.current.selectedCar).toBe(null);
    expect(result.current.rentalDays).toBe(1);
  });
});

//  Gün Güncelleme

describe('Kiralama Günü', () => {
  
  test('Gün artırılabilmeli', () => {
    const { result } = renderHook(() => useCarController());
    
    act(() => {
      result.current.updateRentalDays(5);
    });
    
    expect(result.current.rentalDays).toBe(5);
  });

  test('Negatif gün girilememeli', () => {
    const { result } = renderHook(() => useCarController());
    
    act(() => {
      result.current.updateRentalDays(-3);
    });
    
    expect(result.current.rentalDays).toBe(1);
  });

  test('Sıfır gün girilememeli', () => {
    const { result } = renderHook(() => useCarController());
    
    act(() => {
      result.current.updateRentalDays(0);
    });
    
    expect(result.current.rentalDays).toBe(1);
  });
});

//  Fiyat Hesaplama

describe('Fiyat Hesaplama', () => {
  
  test('Seçili araç yokken 0 olmalı', () => {
    const { result } = renderHook(() => useCarController());
    const price = result.current.calculateTotalPrice();
    expect(price).toBe(0);
  });

  test('Seçili araç için fiyat hesaplamalı', () => {
    const { result } = renderHook(() => useCarController());
    
    act(() => {
      result.current.selectCar(5); 
      result.current.updateRentalDays(3);
    });
    
    const price = result.current.calculateTotalPrice();
    expect(price).toBe(1800); 
  });
});

//  Araç Kiralama
describe('Araç Kiralama', () => {
  
  test('Müsait araç kiralanabilmeli', () => {
    const { result } = renderHook(() => useCarController());
    
    let rentResult;
    act(() => {
      rentResult = result.current.rentCar(5); 
    });
    
    expect(rentResult.success).toBe(true);
    
    const rentedCar = result.current.cars.find(c => c.id === 5);
    expect(rentedCar.available).toBe(false);
  });

  test('Dolu araç kiralanamaz', () => {
    const { result } = renderHook(() => useCarController());
    
    let rentResult;
    act(() => {
      rentResult = result.current.rentCar(1); 
    });
    
    expect(rentResult.success).toBe(false);
    expect(rentResult.message).toBe('Araç zaten kiralanmış');
  });

  test('Kiralama sonrası seçim temizlenmeli', () => {
    const { result } = renderHook(() => useCarController());
    
    act(() => {
      result.current.selectCar(6); 
      result.current.rentCar(6);
    });
    
    expect(result.current.selectedCar).toBe(null);
  });
});