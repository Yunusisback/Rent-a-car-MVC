// src/tests/hero.test.jsx
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { Hero } from '../components/Hero';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';
import '@testing-library/jest-dom';

vi.mock('../context/AppContext', () => ({ useApp: vi.fn() }));
vi.mock('../utils/translations', () => ({ useTranslation: vi.fn() }));
vi.mock('lucide-react', () => ({
  MapPin: () => null,
  Calendar: () => null,
  Clock: () => null,
  ChevronDown: () => null,
}));

window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('Hero Component', () => {
  let mockUpdateFilters, mockSetShowCarList;

  const mockT = {
    title: 'Mükemmel Aracınızı Bulun',
    subtitle: 'Kiralık aracınızı kolayca ayırtın.',
    pickupLocation: 'Alış Lokasyonu',
    dropoffLocation: 'Bırakış Lokasyonu',
    selectLocation: 'Lokasyon seçin',
    pickupDate: 'Alış Tarihi',
    dropoffDate: 'Bırakış Tarihi',
    pickupTime: 'Alış Saati',
    dropoffTime: 'Bırakış Saati',
    searchCars: 'Araçları Ara',
    fastReservation: 'Hızlı Rezervasyon',
    insuranceIncluded: 'Sigorta Dahil',
    luxuryCars: 'Lüks Araçlar',
    europeWide: 'Avrupa Geneli',
  };

  beforeEach(() => {
    mockUpdateFilters = vi.fn();
    mockSetShowCarList = vi.fn();

    useApp.mockReturnValue({
      language: 'tr',
      searchFilters: {
        pickupLocation: null,
        dropoffLocation: null,
        pickupDate: null,
        dropoffDate: null,
        pickupTime: '10:00',
        dropoffTime: '10:00',
      },
      updateFilters: mockUpdateFilters,
      setShowCarList: mockSetShowCarList,
    });

    useTranslation.mockReturnValue(mockT);

    document.querySelector = vi.fn(() => ({ scrollIntoView: vi.fn() }));

    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-10-31T10:00:00.000Z'));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderHero = (overrides = {}) => {
    const defaultFilters = {
      pickupLocation: null,
      dropoffLocation: null,
      pickupDate: null,
      dropoffDate: null,
      pickupTime: '10:00',
      dropoffTime: '10:00',
    };

    useApp.mockReturnValue({
      language: 'tr',
      searchFilters: { ...defaultFilters, ...overrides.searchFilters },
      updateFilters: mockUpdateFilters,
      setShowCarList: mockSetShowCarList,
    });

    return render(<Hero />);
  };

  test('başlık ve devre dışı buton render edilir', () => {
    renderHero();
    expect(screen.getByText(mockT.title)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: mockT.searchCars })).toBeDisabled();
  });

  test('lokasyon seçimi çalışır', () => {
    renderHero();
    const locationSelects = screen.getAllByText(mockT.selectLocation);
    fireEvent.click(locationSelects[0]); // pickup
    fireEvent.click(screen.getByText('İstanbul Havalimanı'));
    expect(mockUpdateFilters).toHaveBeenCalledWith({ pickupLocation: 'İstanbul Havalimanı' });
  });


  test('saat seçimi (pickup) çalışır', () => {
    renderHero();
    const timeDisplays = screen.getAllByText('10:00');
    fireEvent.click(timeDisplays[0]); // pickup time
    fireEvent.click(screen.getByText('14'));
    expect(mockUpdateFilters).toHaveBeenCalledWith({ pickupTime: '14:00' });

    renderHero({ searchFilters: { pickupTime: '14:00' } });
    const updatedTimeDisplays = screen.getAllByText('14:00');
    fireEvent.click(updatedTimeDisplays[0]); // pickup time
    fireEvent.click(screen.getByText('30'));
    expect(mockUpdateFilters).toHaveBeenCalledWith({ pickupTime: '14:30' });
  });

  test('dışarı tıklama dropdown kapatır', () => {
    renderHero();
    const locationSelects = screen.getAllByText(mockT.selectLocation);
    fireEvent.click(locationSelects[0]);
    expect(screen.getByText('İstanbul Havalimanı')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('İstanbul Havalimanı')).not.toBeInTheDocument();
  });

  test('form doluysa buton aktif olur ve scroll yapar', async () => {
    renderHero({
      searchFilters: {
        pickupLocation: 'İstanbul Havalimanı',
        dropoffLocation: 'Frankfurt Havalimanı',
        pickupDate: '2025-10-31',
        dropoffDate: '2025-11-05',
      },
    });

    const btn = screen.getByRole('button', { name: mockT.searchCars });
    expect(btn).not.toBeDisabled();
    fireEvent.click(btn);
    expect(mockSetShowCarList).toHaveBeenCalledWith(true);

    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    expect(document.querySelector).toHaveBeenCalledWith('.car-list-wrapper');
  });
});