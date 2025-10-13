import { CarCard } from './CarCard';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';
import '../styles/CarList.css';


export function CarList({ cars, onRentClick }) {
  const { language } = useApp();
  const t = useTranslation(language);

  return (
    <div className="car-list-wrapper">
      {/* İstatistikler */}

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">{cars.length}</div>
          <div className="stat-label">{t.totalCars}</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {cars.filter(c => c.available).length}
          </div>
          <div className="stat-label">{t.availableCars}</div>
        </div>
      </div>

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
        /* Boş Liste Mesajı */
        
        <div className="empty-message">
          <h3>{t.noResults}</h3>
          <p>{t.noResultsDesc}</p>
        </div>
      )}
    </div>
  );
}