// src/views/DateSelect.jsx

import React from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { formatDate } from '../utils/CalendarUtils'; // Yardımcıyı içe aktarın
import { Calendar } from '../components/Calendar'; // Yeni Takvim Bileşenini içe aktarın

export function DateSelect({ 
    t, 
    label, 
    name, 
    value, 
    isEnabled,
    showCalendar, 
    setShowCalendar, 
    calendarData, 
    handleSelectDate, 
    handlePrevMonth,
    handleNextMonth,
    refProp,
    calendarType,
    language
}) {
    const isDisabled = !isEnabled;

    return (
        <div className="search-field" ref={refProp}>
            <div className="field-icon">
                <CalendarIcon size={20} />
            </div>
            <div className="field-content">
                <label className="field-label">{label}</label>
                <div 
                    className={`custom-select ${isDisabled ? 'disabled' : ''}`}
                    onClick={() => {
                        if (!isDisabled) {
                            setShowCalendar(!showCalendar);
                        }
                    }}
                >
                    <span className={value ? 'selected' : 'placeholder'}>
                        {value ? formatDate(value) : 'gg.aa.yyyy'}
                    </span>
                    <ChevronDown size={18} className={`chevron ${showCalendar ? 'open' : ''}`} />
                </div>
                {showCalendar && !isDisabled && (
                    <Calendar
                        calendarData={calendarData}
                        searchDate={value}
                        handlePrevMonth={handlePrevMonth}
                        handleNextMonth={handleNextMonth}
                        handleSelectDate={handleSelectDate}
                        calendarType={calendarType}
                        language={language}
                    />
                )}
            </div>
        </div>
    );
}