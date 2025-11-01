import { useTranslation } from '../utils/translations';


export function Calendar({ 
    calendarData, 
    searchDate, 
    handlePrevMonth, 
    handleNextMonth, 
    handleSelectDate, 
    calendarType, 
    language 
}) {
  const t = useTranslation(language);
  
  const weekDays = language === 'tr' 
    ? ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct']
    : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    
  // Seçili tarihi Date objesine çevir
  
  const selectedDateObj = searchDate ? new Date(searchDate) : null;

  return (
    <div className="dropdown-menu calendar-menu">
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={() => handlePrevMonth(calendarType)}>
          ‹
        </button>
        <span className="calendar-month">
          {calendarData.month} {calendarData.year}
        </span>
        <button className="calendar-nav-btn" onClick={() => handleNextMonth(calendarType)}>
          ›
        </button>
      </div>
      <div className="calendar-weekdays">
        {weekDays.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
      </div>
      <div className="calendar-days">
        {calendarData.days.map((dayObj, idx) => {
          const isSelected = selectedDateObj && dayObj.date && 
            selectedDateObj.toDateString() === dayObj.date.toDateString();
            
          return (
            <div
              key={idx}
              className={`calendar-day ${dayObj.disabled ? 'disabled' : ''} ${isSelected ? 'active' : ''}`}
              onClick={() => {
                if (!dayObj.disabled && dayObj.date) {
                  // ISO formatında sadece tarih kısmını döndürür
                  handleSelectDate(calendarType + 'Date', dayObj.date.toISOString().split('T')[0]);
                }
              }}
            >
              {dayObj.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}