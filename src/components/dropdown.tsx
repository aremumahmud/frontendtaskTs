import React from 'react';
import '../css/dropdown.css';

// Define the props interface for the DropDown component
interface DropDownProps {
  scale: number;
  updateScale: (newScale: number) => void;
}

// Define the DropDown component as a functional component
const DropDown: React.FC<DropDownProps> = ({ scale, updateScale }) => {
  return (
    <div className="dropdown">
      <div className="dropdown-button">{(scale * 100).toFixed(0)}%</div>
      <div className="dropdown-content">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => (
          <div
            onClick={() => {
              updateScale(x / 10);
            }}
            className="dropdown-item"
            key={x} // Add a unique key for each dropdown item
          >
            {(x * 10).toFixed(0)}%
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
