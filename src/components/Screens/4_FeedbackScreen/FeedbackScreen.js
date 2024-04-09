import React, {useState, useEffect} from 'react'
import './FeedbackScreen.css';
import SearchBar from '../../Common/SearchBar/SearchBar';
import NavigationButton from '../../Common/NavigationButton/NavigationButton';

function FeedbackScreen({
  navigateToScreen,
  critiquerName,
  setCritiquerName ,
  formalElement,
  setFormalElement,
  description,
  setDescription, 
  effect,
  setEffect,
  sentiment,
  setSentiment,
  categoryIndex,
  setCategoryIndex,
  categories}) {
  
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
        <div className="fb-region">
          <SearchBar
            labelText="Critiquer Name"
            placeholder="Enter Your Name"
            showButton={false}
            setTextState={setCritiquerName}
          />
        </div>

        <div className="fb-region">
          <SearchBar
            labelText="Formal Element"
            placeholder="Enter Formal Element"
            showButton={false}
            setTextState={setFormalElement}
          />
        </div>

        <div className="fb-region">
          <SearchBar
            labelText="Description"
            placeholder="Enter Description"
            showButton={false}
            setTextState={setDescription}
          />
        </div>

        <div className="fb-region">
          <SearchBar
            labelText="Effect"
            placeholder="Enter Effect"
            showButton={false}
            setTextState={setEffect}
          />
        </div>

        {/* Sentiment Select */}
        <div className="fb-region">
          <div className="fb-label">
            Select Sentiment
          </div>
          
          <div className="fb-sent">
            <button type="button" className="sentBut sentButPos" style ={{backgroundColor: (sentiment != null && sentiment) ? 'rgba(0,255,0,0.33)' : '#222222'}} onClick={() => {
              setSentiment(true);
            }}>
              Positive
            </button>
            <button type="button" className="sentBut sentButNeg" style ={{backgroundColor: (sentiment != null && sentiment) ? '#222222' : 'rgba(255,0,0,0.33)'}} onClick={() => {
              setSentiment(false);
            }}>
              Negative
            </button>
          </div>
        </div>

        {/* Category Select */}
        <div className="fb-region">
          <div className="fb-label">
            Select A Category
          </div>
          <div className="categories-list">
            {categories.map((category, index) => (
                <div key={index} className="category-item">
                  <input 
                    type="checkbox" 
                    className="category-checkbox"
                    id={`category-${index}`} 
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCheckboxChange(category)}
                  />
                  <label htmlFor={`category-${index}`}>{category}</label>
                </div>
            ))}
          </div>
        </div>

        <div className="fb-region">
          <button type="button" className="submitBut" onClick={() => {
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