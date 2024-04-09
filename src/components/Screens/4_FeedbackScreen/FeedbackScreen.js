import React, {useState} from 'react'
import './FeedbackScreen.css';
import NavigationButton from '../../Common/NavigationButton/NavigationButton';

function FeedbackScreen(navigateToScreen, categories) {
  const [sent, setSent] = useState(0);
  const [PosColor, setPosColor] = useState('gray');
  const [NegColor, setNegColor] = useState('lightcoral');
  
  {/* Replace with categories parameter
      DATA: selectedCategories
 */}
  const defaultCategories = [
    'Quality of Light', 'Contrast', 'Focus and Sharpness', 
    'Noise', 'Personal Style', 'Storytelling', 'Framing and Balance'
  ];
  categories = defaultCategories;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleCheckboxChange = (category) => {
    setSelectedCategories(prevSelected => {
      const newSelected = prevSelected.includes(category)
        ? prevSelected.filter(item => item !== category)
        : [...prevSelected, category];
      return newSelected;
    });
  };

  return (
    <div className="feedbackScreen">
      <div class="fb-region">
        <div class="fb-label">
          Critiquer Name
        </div>
        <div class="fb-box">
          <input class="fb-inp" name="fb-name" />
        </div>
      </div>

      <div class="fb-region">
        <div class="fb-label">
          Formal Element
        </div>
        <div class="fb-box">
          <input class="fb-inp" name="fb-element" />
        </div>
      </div>

      <div class="fb-region">
        <div class="fb-label">
          Description
        </div>
        <div class="fb-box">
          <input class="fb-inp" name="fb-desc" />
        </div>
      </div>

      <div class="fb-region">
        <div class="fb-label">
          Effect
        </div>
        <div class="fb-box">
          <input class="fb-inp" name="fb-effect" />
        </div>
      </div>

      {/* Sentiment Select */}
      <div class="fb-region">
        <div class="fb-label">
          Select Sentiment
        </div>
        <div class="fb-box">
          <button type="button" class="sentBut" style ={{backgroundColor: PosColor}} onClick={() => {
            setSent(1);
            setPosColor('lightgreen');
            setNegColor('gray');
          }}>
            Positive
          </button>
        </div>
        <div class="fb-box">
          <button type="button" class="sentBut" style ={{backgroundColor: NegColor}} onClick={() => {
            setSent(0);
            setPosColor('gray');
            setNegColor('lightcoral');
          }}>
            Negative
          </button>
        </div>
      </div>

      {/* Category Select */}
      <div class="fb-region">
        <div class="fb-label">
          Select Categories
        </div>
        <div class="fb-box">
          {categories.map((category, index) => (
              <div key={index} className="category-item">
                <input 
                  type="checkbox" 
                  id={`category-${index}`} 
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                />
                <label htmlFor={`category-${index}`}>{category}</label>
              </div>
          ))}
        </div>
      </div>

      <div class="fb-region">
        <div class="fb-box">
          <button type="button" class="submitBut" onClick={() => {
            {/*BACKEND? Save data on form, navigate to next screen*/}
          }}>
            Submit
          </button>
        </div>
      </div>

      {/* Add back navigation */}
      <NavigationButton backVisibility={true} nextVisibility={false} backText={"View"}/>
    </div>
  );
}

export default FeedbackScreen;