import React from 'react';
import Categories from './Categories';
import '../css/environment.css';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleDoubleUp,
  FaAngleDoubleDown,
} from 'react-icons/fa';


// Define the props interface for the Environment component
interface EnvironmentProps {
  scale: number;
}

// Define the Environment component as a functional component
const Environment: React.FC<EnvironmentProps> = ({ scale }) => {
  return (
    <div className="environment" id="constraint">
      <div className="top controls">
        <FaAngleDoubleDown />
      </div>
      <div className="bottom controls">
        <FaAngleDoubleUp />
      </div>
      <div className="right controls">
        <FaAngleDoubleLeft />
      </div>
      <div className="left controls">
        <FaAngleDoubleRight />
      </div>
      <Categories scale={scale} />
    </div>
  );
};

export default Environment;
