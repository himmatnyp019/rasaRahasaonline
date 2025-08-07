import React from 'react';
import './PotDiv.css';

const PotDiv = () => {
  const generateVapour = () => {
    return Array.from({ length: 40 }).map((_, i) => {
      const offsetX = Math.floor(Math.random() * 100 - 50); // 👈 Vapour drift range (left/right)
      const delay = Math.random() * 3; // 👈 Vapour start delay (sec)
      const duration = Math.random() * 3 + 3; // 👈 Animation speed (3s to 6s)
      const size = Math.random() * 10 + 10; // 👈 Vapour size (8px to 18px)

      return (
        <span
          key={i}
          className="vapour"
          style={{
            left: `calc(50% + ${Math.random() * 200 - 100}px)`, // 👈 Horizontal start position
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            width: `${size}px`,
            height: `${size}px`,
            '--driftX': `${offsetX}px`, // 👈 Custom CSS variable for drift
          }}
        />
      );
    });
  };

  return (
    <div className="pot-container">
      <div className="vapour-container">{generateVapour()}</div>
      <div className="pot-content">
        <h3>🔥 Tomato Steam Pot</h3>
        <p>This pot is steaming hot. Watch the tomato vapor rise!</p>
      </div>
    </div>
  );
};

export default PotDiv;
