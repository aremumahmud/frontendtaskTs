import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import '../css/header.css';
import DropDown from './dropdown';

// Define the props interface for the Header component
interface HeaderProps {
  updateScale: (newScale: number) => void;
  scale: number;
}

// Define the Header component as a functional component
const Header: React.FC<HeaderProps> = ({ updateScale, scale }) => {
  function move(i: number) {
    const wrapperElement = document.getElementById('constraint');
    const draggableElement = document.getElementById('wrapper');
    const currentLeft = draggableElement?parseFloat(getComputedStyle(draggableElement)?.left || '0'):0;
    const newLeft = currentLeft - (i === 0 ? 10 : -10); // Move left by 10 pixels or right by 10 pixels

    // Ensure the new left position doesn't go beyond the boundaries
    const minX = 0;
    const maxX = (wrapperElement?.clientWidth || 0) - (draggableElement?.clientWidth || 0) * scale;
    const boundedLeft = Math.min(maxX, Math.max(minX, newLeft));

    if (draggableElement) {
      draggableElement.style.left = boundedLeft + 'px';
    }
  }

  return (
    <div className="header">
      <div className="logo">Services</div>
      <div className="actions">
        <div className="move-action" onClick={() => move(0)}>
          <FaAngleDoubleLeft />
        </div>
        <div className="zoom-action">
          <div
            className="add"
            onClick={() => {
              console.log('add', scale, scale + 0.1);
              scale === 1
                ? updateScale(1)
                : updateScale(parseFloat((scale + 0.1).toFixed(1))); // Fix the floating-point precision issue
            }}
          >
            +
          </div>
          <DropDown scale={scale} updateScale={updateScale} />
          <div
            className="subtract"
            onClick={() => {
              console.log('sub', scale, scale - 0.1);
              scale === 0.1
                ? updateScale(0.1)
                : updateScale(parseFloat((scale - 0.1).toFixed(1))); // Fix the floating-point precision issue
            }}
          >
            -
          </div>
        </div>
        <div className="move-action" onClick={() => move(1)}>
          <FaAngleDoubleRight />
        </div>
      </div>
    </div>
  );
};

export default Header;
