// src/views/TimeSelect.jsx

import React from 'react';
import { Clock, ChevronDown } from 'lucide-react';
import { useMemo } from 'react';

export function TimeSelect({ t, label, name, value, openDropdown, setOpenDropdown, handleSelect, refProp }) {
  const isOpen = openDropdown === name;
  
  // Zaman dizilerini buraya taşıdık (Hero'dan aldık)
  const hours = useMemo(() => 
    Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')),
    []
  );
  const minutes = useMemo(() => ['00', '15', '30', '45'], []);

  const currentHour = value?.split(':')[0] || '10';
  const currentMinute = value?.split(':')[1] || '00';

  return (
    <div className="search-field search-field-small" ref={refProp}>
      <div className="field-icon">
        <Clock size={20} />
      </div>
      <div className="field-content">
        <label className="field-label">{label}</label>
        <div 
          className="custom-select" 
          onClick={() => setOpenDropdown(isOpen ? null : name)}
        >
          <span className={value ? 'selected' : 'placeholder'}>
            {value || '10:00'}
          </span>
          <ChevronDown size={18} className={`chevron ${isOpen ? 'open' : ''}`} />
        </div>
        {isOpen && (
          <div className="dropdown-menu time-menu">
            <div className="time-columns">
              <div className="time-column">
                {hours.map(hour => (
                  <div 
                    key={hour}
                    className={`dropdown-item ${hour === currentHour ? 'active' : ''}`}
                    onClick={() => handleSelect(name, `${hour}:${currentMinute}`)}
                  >
                    {hour}
                  </div>
                ))}
              </div>
              <div className="time-column">
                {minutes.map(minute => (
                  <div 
                    key={minute}
                    className={`dropdown-item ${minute === currentMinute ? 'active' : ''}`}
                    onClick={() => handleSelect(name, `${currentHour}:${minute}`)}
                  >
                    {minute}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}