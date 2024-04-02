import React, { useState } from 'react';
import './NavigationBar.css'; // Import CSS file for styling

const ProgressNavigation = ({ steps, currentStep }) => {
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


const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

  return (
    <div>
      <ProgressNavigation steps={steps} currentStep={currentStep} />
      <div className="button-container">
        <button onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 0}>Previous</button>
        <button onClick={() => setCurrentStep(currentStep + 1)} disabled={currentStep === steps.length - 1}>Next</button>
      </div>
    </div>
  );
};


export default App;
