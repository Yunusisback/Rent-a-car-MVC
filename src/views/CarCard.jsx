import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';
import '../styles/CarCard.css';



export function CarCard({ car, onRentClick }) {
  const { language } = useApp();
  const t = useTranslation(language);

  return (
    <div className="car-card">
      {/* Araç Resmi */}

      <div className="car-image">
        <img src={car.image} alt={`${car.brand} ${car.model}`} />
        
        {/* Durum Badge */}

        <div className={`status-badge ${car.available ? 'available' : 'unavailable'}`}>
          {car.available ? t.available : t.unavailable}
        </div>
      </div>

      {/* Araç Bilgileri */}

      <div className="car-info">
        <h3 className="car-title">
          {car.brand} {car.model}
        </h3>

        {/* Fiyat */}

        <div className="car-price">
          <span className="price-amount">{car.pricePerDay} ₺</span>
          <span className="price-period">{t.perDay}</span>
        </div>

        {/* Kirala Butonu */}
        
        <button
          className={`rent-button ${!car.available ? 'disabled' : ''}`}
          onClick={() => onRentClick(car.id)}
          disabled={!car.available}
        >
          {car.available ? t.rent : t.notAvailable}
        </button>
      </div>
    </div>
  );
}