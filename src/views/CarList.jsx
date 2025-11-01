import { useState, useMemo, useCallback } from 'react';
import { CarCard } from './CarCard';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';
import { Filter, X, RotateCcw, Search } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import '../styles/CarList.css';

export function CarList({ cars, allCars, brands, onRentClick }) {
  const { language, searchFilters, updateFilters, resetFilters } = useApp();
  const t = useTranslation(language);
  const [showFilters, setShowFilters] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchFilters.searchQuery);

  // Debounce: Arama 300ms sonra çalışır

  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // Debounced değer değişince contexti güncelle

  useMemo(() => {
    if (debouncedSearchQuery !== searchFilters.searchQuery) {
      updateFilters({ searchQuery: debouncedSearchQuery });
    }
  }, [debouncedSearchQuery]);

  const handleFilterChange = useCallback((filterName, value) => {
    updateFilters({ [filterName]: value });
  }, [updateFilters]);

  const handleSearchChange = useCallback((e) => {
    setLocalSearchQuery(e.target.value);
  }, []);

  const handlePriceChange = useCallback((e) => {
    const value = parseInt(e.target.value);
    updateFilters({ priceRange: [0, value] });
  }, [updateFilters]);

  const handleReset = useCallback(() => {
    setLocalSearchQuery('');
    resetFilters();
  }, [resetFilters]);

  return (
    <div className="car-list-wrapper">

      {/* Sadece Filtre Butonu */}

      <div className="list-header">
        <button 
          className="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          {t.filters}
        </button>
      </div>

      {/* Filtreleme Paneli */}

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>
              <Filter size={20} />
              {t.filters}
            </h3>
            <button className="close-filters" onClick={() => setShowFilters(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="filters-grid">

            {/* Arama  */}

            <div className="filter-group full-width">
              <label>
                <Search size={16} />
                Arama
              </label>
              <input
                type="text"
                placeholder="Marka veya model ara..."
                value={localSearchQuery}
                onChange={handleSearchChange}
                className="filter-input"
              />
            </div>

            {/* Araç Tipi */}

            <div className="filter-group">
              <label>{t.carType}</label>
              <select
                value={searchFilters.carType}
                onChange={(e) => handleFilterChange('carType', e.target.value)}
                className="filter-select"
              >
                <option value="all">{t.allTypes}</option>
                <option value="sedan">{t.sedan}</option>
                <option value="suv">{t.suv}</option>
                <option value="sports">{t.sports}</option>
                <option value="luxury">{t.luxury}</option>
                <option value="compact">{t.compact}</option>
                <option value="van">{t.van}</option>
              </select>
            </div>

            {/* Marka */}

            <div className="filter-group">
              <label>{t.brand}</label>
              <select
                value={searchFilters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="filter-select"
              >
                <option value="all">{t.allBrands}</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Vites */}

            <div className="filter-group">
              <label>{t.transmission}</label>
              <select
                value={searchFilters.transmission}
                onChange={(e) => handleFilterChange('transmission', e.target.value)}
                className="filter-select"
              >
                <option value="all">{t.allTransmission}</option>
                <option value="automatic">{t.automatic}</option>
                <option value="manual">{t.manual}</option>
              </select>
            </div>

            {/* Fiyat Aralığı */}

            <div className="filter-group full-width">
              <label>
                {t.priceRange}: 0 ₺ - {searchFilters.priceRange[1].toLocaleString('tr-TR')} ₺
              </label>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={searchFilters.priceRange[1]}
                onChange={handlePriceChange}
                className="filter-range"
              />
              <div className="range-labels">
                <span>0 ₺</span>
                <span>10,000 ₺</span>
              </div>
            </div>
          </div>

          {/* Filtre Butonları */}

          <div className="filter-actions">
            <button className="reset-btn" onClick={handleReset}>
              <RotateCcw size={16} />
              {t.resetFilters}
            </button>
          </div>
        </div>
      )}

      {/* Araç Grid */}
      
      {cars.length > 0 ? (
        <div className="cars-grid">
          {cars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              onRentClick={onRentClick}
            />
          ))}
        </div>
      ) : (
        <div className="empty-message">
          <div className="empty-icon">
            <Search size={64} />
          </div>
          <h3>{t.noResults}</h3>
          <p>{t.noResultsDesc}</p>
          <button className="reset-filters-btn" onClick={handleReset}>
            <RotateCcw size={18} />
            {t.resetFilters}
          </button>
        </div>
      )}
    </div>
  );
}