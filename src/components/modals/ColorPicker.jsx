import React from 'react';
import { HiCheck } from 'react-icons/hi';

const ColorPicker = ({ colors, selectedColor, onSelect }) => {
  return (
    <div className="grid grid-cols-6 gap-3">
      {colors.map((color) => (
        <button
          key={color.class}
          type="button"
          onClick={() => onSelect(color.class)}
          className="group relative"
          title={color.name}
        >
          <div className={`w-12 h-12 rounded-lg ${color.class} transition-all ${
            selectedColor === color.class 
              ? 'ring-2 ring-offset-2 ring-gray-900 scale-110' 
              : 'hover:scale-105'
          }`}>
            {selectedColor === color.class && (
              <div className="absolute inset-0 flex items-center justify-center">
                <HiCheck className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
            )}
          </div>
          <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {color.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ColorPicker;