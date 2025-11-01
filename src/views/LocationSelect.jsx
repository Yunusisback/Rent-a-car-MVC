// src/views/LocationSelect.jsx

import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

export function LocationSelect({ t, label, name, value, openDropdown, setOpenDropdown, locations, handleSelect, refProp }) {
  const isOpen = openDropdown === name;

  return (
    <div className="search-field" ref={refProp}>
      <div className="field-icon">
        <MapPin size={20} />
      </div>
      <div className="field-content">
        <label className="field-label">{label}</label>
        <div 
          className="custom-select" 
          onClick={() => setOpenDropdown(isOpen ? null : name)}
        >
          <span className={value ? 'selected' : 'placeholder'}>
            {value || t.selectLocation}
          </span>
          <ChevronDown size={18} className={`chevron ${isOpen ? 'open' : ''}`} />
        </div>
        {isOpen && (
          <div className="dropdown-menu">
            {locations.map(loc => (
              <div 
                key={loc} 
                className={`dropdown-item ${value === loc ? 'active' : ''}`}
                onClick={() => handleSelect(name, loc)}
              >
                {loc}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}