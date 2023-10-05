import React, { useState } from 'react';
import Header from './components/Header';
import Environment from './components/environment';


function App() {
  // Initialize the scale state with a default value of 0.6
  const [currentScale, setCurrentScale] = useState<number>(0.6);

  // Function to update the scale and apply the transformation
  function updateScale(scale: number) {
    const draggableElement = document.getElementById('wrapper');
    setCurrentScale(scale);

    // Check if draggableElement exists before applying the transformation
    if (draggableElement) {
      draggableElement.style.transform = `scale(${scale})`;
    }
  }

  return (
    <div className="App">
      <Header updateScale={updateScale} scale={currentScale} />
      <Environment scale={currentScale} />
    </div>
  );
}

export default App;
