import { useApp } from "../context/AppContext";
import { useTranslation } from "../utils/translations";
import {
  Users,
  BaggageClaim,
  Settings,
  CheckCircle,
  XCircle,
} from "lucide-react";
import "../styles/CarCard.css";

export function CarCard({ car, onRentClick }) {
  const { language } = useApp();
  const t = useTranslation(language);

  const getTypeIcon = (type) => {
    const icons = {
      sedan: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 17h14v2H5v-2zm0-8l2.5-5h9l2.5 5H5zm0 4v-2h14v2H5z" />
        </svg>
      ),
      suv: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
        </svg>
      ),
      sports: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M5 17h-2v-4m-1 -2l18 0m-6 6h-6m-3 -6v-5l3 -3l5 2l2 4h4l2 2v2" />
        </svg>
      ),
      luxury: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      compact: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
          <path d="M5 17H3v-6l2-5h9l4 5h1a2 2 0 012 2v4h-2" />
        </svg>
      ),
      van: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
        </svg>
      ),
    };
    return icons[type] || icons.sedan;
  };

  return (
    <div className="car-card">
      {/* Araç Resmi */}

      <div className="car-image">
        <img src={car.image} alt={`${car.brand} ${car.model}`} />

        {/* Durum  */}

        <div
          className={`status-badge ${
            car.available ? "available" : "unavailable"
          }`}
        >
          {car.available ? (
            <>
              <CheckCircle size={16} />
              {t.available}
            </>
          ) : (
            <>
              <XCircle size={16} />
              {t.unavailable}
            </>
          )}
        </div>

        {/* Araç Tipi  */}

        <div className="type-badge">
          {getTypeIcon(car.type)}
          {t[car.type] || car.type}
        </div>
      </div>

      {/* Araç Bilgileri */}

      <div className="car-info">
        <h3 className="car-title">{car.brand}</h3>
        <p className="car-model">{car.model}</p>

        {/* Özellikler */}
        <div className="car-features">
          <span className="feature">
            <Settings size={16} />
            {car.transmission === "automatic" ? t.automatic : t.manual}
          </span>
          <span className="feature">
            <Users size={16} />
            {car.seats} {t.seats} 
          </span>
          <span className="feature">
            <BaggageClaim size={16} />
            {car.luggage} L
          </span>
        </div>

        {/* Fiyat */}

        <div className="car-price">
          <div className="price-main">
            <span className="price-amount">
              {car.pricePerDay.toLocaleString("tr-TR")} ₺
            </span>
            <span className="price-period">{t.perDay}</span>
          </div>
        </div>

        {/* Kirala Butonu */}

        <button
          className={`rent-button ${!car.available ? "disabled" : ""}`}
          onClick={() => onRentClick(car.id)}
          disabled={!car.available}
        >
          {car.available ? t.rent : t.notAvailable}
        </button>
      </div>
    </div>
  );
}
