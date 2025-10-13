import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/translations';
import '../styles/Modal.css';



export function RentalModal({ car, onConfirm, onCancel }) {
  const { language } = useApp();
  const t = useTranslation(language);
  const [days, setDays] = useState(1);

  const calculateTotal = () => {
    return car.pricePerDay * days;
  };

  const handleDaysChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 30) {
      setDays(value);
    }
  };

  const handleConfirm = () => {
    onConfirm(car.id, days);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t.rentalTitle}</h2>
          <button className="close-button" onClick={onCancel}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="car-info-modal">
            <img 
              src={car.image} 
              alt={`${car.brand} ${car.model}`}
              className="car-image-modal"
            />
            <div className="car-details-modal">
              <h3>{car.brand} {car.model}</h3>
              <p className="price-info">
                {car.pricePerDay} ₺ <span>{t.perDay}</span>
              </p>
            </div>
          </div>

          <div className="rental-form">
            <label className="form-label">
              {t.howManyDays}
            </label>
            
            <div className="days-selector">
              <button 
                className="day-button"
                onClick={() => setDays(Math.max(1, days - 1))}
              >
                −
              </button>
              
              <input
                type="number"
                min="1"
                max="30"
                value={days}
                onChange={handleDaysChange}
                className="days-input"
              />
              
              <button 
                className="day-button"
                onClick={() => setDays(Math.min(30, days + 1))}
              >
                +
              </button>
            </div>

            <p className="days-hint">
              {t.maxDays}
            </p>
          </div>

          <div className="price-summary">
            <div className="summary-row">
              <span>{t.dailyPrice}</span>
              <span className="summary-value">{car.pricePerDay} ₺</span>
            </div>
            <div className="summary-row">
              <span>{t.dayCount}</span>
              <span className="summary-value">{days} {t.days}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>{t.total}</span>
              <span className="summary-total">{calculateTotal()} ₺</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onCancel}>
            {t.cancel}
          </button>
          <button className="confirm-btn" onClick={handleConfirm}>
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}