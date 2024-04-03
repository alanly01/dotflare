import React from 'react';
import './NavigationBar.css'; // Import CSS file for styling

const ProgressNavigation = ({ steps, currentStep, setCurrentStep }) => {
  // Ensure steps is defined before mapping
  if (!steps || steps.length === 0) return null;

  return (
    <div className="progress-navigation">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className={`line ${index <= currentStep ? 'active-line' : ''}`}></div>}
          <div className={`step ${index <= currentStep ? 'active' : ''}`}>
            {currentStep > index ? (
              <i className="fas fa-check">0</i> // Check mark if step is completed
            ) : null}
            <div className="step-content">
              <div className="step-text">{step}</div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressNavigation;
