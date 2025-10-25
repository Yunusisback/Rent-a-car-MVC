import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useCarController } from '../controllers/useCarController';
import { useApp } from '../context/AppContext';


// Mock 

vi.mock('../context/AppContext', () => ({
  useApp: vi.fn(),
}));

// Mock CarModel

const mockCarModel = {
  filterCars: vi.fn().mockReturnValue([
    { id: 1, brand: 'Toyota', model: 'Corolla', pricePerDay: 500, available: true },
  ]),

  getAllCars: vi.fn().mockReturnValue([
    { id: 1, brand: 'Toyota', model: 'Corolla', pricePerDay: 500, available: true },
    { id: 2, brand: 'Honda', model: 'Civic', pricePerDay: 600, available: true },
  ]),

  getAllBrands: vi.fn().mockReturnValue(['Toyota', 'Honda']),

  getCarById: vi.fn().mockReturnValue({

    id: 1,
    brand: 'Toyota',
    model: 'Corolla',
    pricePerDay: 500,

  }),
  rentCar: vi.fn().mockReturnValue({ success: true, message: 'Araç kiralandı' }),

  calculatePrice: vi.fn().mockReturnValue(1500),
};

vi.mock('../models/CarModel', () => ({
  CarModel: vi.fn().mockImplementation(() => mockCarModel),
}));

describe('useCarController', () => {
  beforeEach(() => {
    vi.mocked(useApp).mockReturnValue({
      searchFilters: {
        searchQuery: '',
        carType: 'all',
        brand: 'all',
        transmission: 'all',
        priceRange: null,
      },
    });
    vi.clearAllMocks(); // Herr testten önce mockları sıfırla
  });


  it('başlangıçta filtrelenmiş arabaları döndürür', () => {
    const { result } = renderHook(() => useCarController());
    expect(result.current.cars).toEqual([
      { id: 1, brand: 'Toyota', model: 'Corolla', pricePerDay: 500, available: true },
    ]);
  });


  it('tüm arabaları döndürür', () => {
    const { result } = renderHook(() => useCarController());
    expect(result.current.allCars).toEqual([
      { id: 1, brand: 'Toyota', model: 'Corolla', pricePerDay: 500, available: true },
      { id: 2, brand: 'Honda', model: 'Civic', pricePerDay: 600, available: true },
    ]);
  });


  it('markaları döndürür', () => {
    const { result } = renderHook(() => useCarController());
    expect(result.current.brands).toEqual(['Toyota', 'Honda']);
  });


  it('arabayı seçer ve selectedCar state’ini günceller', () => {
    const { result } = renderHook(() => useCarController());
    act(() => {
      result.current.selectCar(1);
    });
    expect(result.current.selectedCar).toEqual({
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      pricePerDay: 500,
    });
  });


  it('seçimi iptal eder ve rentalDays’i sıfırlar', () => {
    const { result } = renderHook(() => useCarController());
    act(() => {
      result.current.selectCar(1);
      result.current.updateRentalDays(5);
      result.current.cancelSelection();
    });
    expect(result.current.selectedCar).toBeNull();
    expect(result.current.rentalDays).toBe(1);
  });


  it('rentalDays’i günceller', () => {
    const { result } = renderHook(() => useCarController());
    act(() => {
      result.current.updateRentalDays(3);
    });
    expect(result.current.rentalDays).toBe(3);
  });



  it('negatif rentalDays kabul etmez', () => {
    const { result } = renderHook(() => useCarController());
    act(() => {
      result.current.updateRentalDays(-1);
    });
    expect(result.current.rentalDays).toBe(1);
  });


  it('toplam fiyatı hesaplar', () => {
    const { result } = renderHook(() => useCarController());
    act(() => {
      result.current.selectCar(1);
      result.current.updateRentalDays(3);
    });
    const totalPrice = result.current.calculateTotalPrice();
    expect(totalPrice).toBe(1500);
  });


  it('arabayı kiralar ve selectedCar’ı sıfırlar', () => {
    const { result } = renderHook(() => useCarController());
    act(() => {
      result.current.selectCar(1);
      result.current.rentCar(1);
    });
    expect(result.current.selectedCar).toBeNull();
    expect(mockCarModel.rentCar).toHaveBeenCalledWith(1); // mockCarModel kullanıyoruz
  });

  it('refreshCars filtrelenmiş arabaları döndürür', () => {
    const { result } = renderHook(() => useCarController());
    const refreshedCars = result.current.refreshCars();
    expect(refreshedCars).toEqual([
      { id: 1, brand: 'Toyota', model: 'Corolla', pricePerDay: 500, available: true },
    ]);
  });
});