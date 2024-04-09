import React, {useState} from 'react'
import './FeedbackScreen.css';
import SearchBar from '../../Common/SearchBar/SearchBar';
import NavigationButton from '../../Common/NavigationButton/NavigationButton';

function FeedbackScreen({navigateToScreen, setCritiquerName, setFormalElement,
 setDescription, setEffect, setSentiment}) {

  {/* Sentiment Toggle */}
  // const [sent, setSent] = useState(0);
  const [PosColor, setPosColor] = useState('#222');
  const [NegColor, setNegColor] = useState('indianred');
  {/* Replace with categories parameter
      DATA: selectedCategories
 */}
  const categories = [
    'Quality of Light', 'Contrast', 'Focus and Sharpness', 
    'Noise', 'Personal Style', 'Storytelling', 'Framing and Balance'
  ];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleCheckboxChange = (category) => {
    setSelectedCategories(prevSelected => {
      const newSelected = prevSelected.includes(category)
        ? prevSelected.filter(item => item !== category)
        : [...prevSelected, category];
      return newSelected;
    });
  };

  const onNextClick = async () => {
    navigateToScreen(5,5);
  }

  return (
    <div className="feedbackScreen">
      <div className="feedbackContent">
        <div class="fb-region">
          <SearchBar
            labelText="Critiquer Name"
            placeholder=""
            showButton={false}
            setTextState={setCritiquerName}
          />
        </div>

        <div class="fb-region">
          <SearchBar
            labelText="Formal Element"
            placeholder=""
            showButton={false}
            setTextState={setFormalElement}
          />
        </div>

        <div class="fb-region">
          <SearchBar
            labelText="Description"
            placeholder=""
            showButton={false}
            setTextState={setDescription}
          />
        </div>

        <div class="fb-region">
          <SearchBar
            labelText="Effect"
            placeholder=""
            showButton={false}
            setTextState={setEffect}
          />
        </div>

        {/* Sentiment Select */}
        <div class="fb-region">
          <div class="fb-label">
            Select Sentiment
          </div>
          
          <div class="fb-sent">
            <button type="button" class="sentBut" style ={{backgroundColor: PosColor}} onClick={() => {
              setSentiment(1);
              setPosColor('green');
              setNegColor('#222');
            }}>
              Positive
            </button>
            <button type="button" class="sentBut" style ={{backgroundColor: NegColor}} onClick={() => {
              setSentiment(0);
              setPosColor('#222');
              setNegColor('indianred');
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
          <div class="categories-list">
            {categories.map((category, index) => (
                <div key={index} className="category-item">
                  <input 
                    type="checkbox" 
                    class="category-checkbox"
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
          <button type="button" class="submitBut" onClick={() => {
            {/*BACKEND? Save data on form, navigate to next screen*/}
            onNextClick();
          }}>
            Submit
          </button>
        </div>

        {/* Add back navigation */}
        <NavigationButton backVisibility={true} nextVisibility={false} backText={"View"} />
      </div>
    </div>
  );
}

export default FeedbackScreen;