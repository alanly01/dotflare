import React, { useEffect, useState } from 'react';
import { getImages, getFeedback } from '../../../backend/FirebaseAPICalls/FirebaseAPI';
import FeedbackImage from '../../Common/FeedbackImage/FeedbackImage';
import './ViewScreen.css';
import eye from '../../../images/eye-solid.svg';
import eyeSlash from '../../../images/eye-slash-solid.svg';
import help from '../../../images/circle-question-regular.svg';
import picture from '../../../images/picture.jpg';
import NavigationButton from '../../Common/NavigationButton/NavigationButton';
import FeedbackEntry from '../../Common/FeedbackEntry/FeedbackEntry';

function ViewScreen({ navigateToScreen, exitSession, isSender, images, fetchImages, dotFeedback, fetchDotFeedback, categories, fetchCategories }) {

  const onBackClick = () => {
    exitSession();
  }

  const onNextClick = async () => {
    if (isSender) {
      navigateToScreen(5, 3)
    } else {
      // THIS IS TEMPORARY FOR TESTING
      navigateToScreen(4, 1)
    }
  }

  useEffect(() => {
    fetchImages();
    fetchDotFeedback();
    fetchCategories();
  }, []);

  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [buttons, setButtons] = useState([
    { id: 1, color: '#BF8DFF' }, // First button default color is #BF8DFF
    { id: 2, color: '#555555' },
    { id: 3, color: '#555555' },
    { id: 4, color: '#555555' },
    { id: 5, color: '#555555' },
  ]);

  const toggleColor = (id) => {
    const updatedButtons = buttons.map(button =>
      button.id === id ? { ...button, color: '#BF8DFF' } : { ...button, color: '#555555' }
    );
    setButtons(updatedButtons);
  };

  const [activeDotIndex, setActiveDotIndex] = useState(null);

  const displayDotFeedback = (dotIndex) => {
    setActiveDotIndex(dotIndex);
  }

  

return (
  <div className="view-screen">
    {images != null && dotFeedback != null ? 
    <FeedbackImage 
      image={images[0]} 
      feedback={dotFeedback['img0']}
      displayDotFeedback={displayDotFeedback} />
    : 
    null
    }

    <div className='hint'>
      Click on the dots to view feedback.
    </div>
    <div className="button-row">
      <div className="icons">
        <img src={help} alt="Help" />
      </div>
      <div>
        {buttons.map(button => (
          <button
            key={button.id}
            style={{ color: button.color,backgroundColor: 'transparent' }}
            onClick={() => toggleColor(button.id)}
          >
            {button.id}
          </button>
        ))}
      </div>
      <div className="icons" onClick={toggleVisibility}>
          <img src={isVisible ? eye : eyeSlash} alt="Toggle Eye" />
      </div>
    </div>
    {activeDotIndex != null && categories != null
    ?
    <div>
      <FeedbackEntry label="Sentiment" text={dotFeedback['img0'][`dot${activeDotIndex}`]['sentiment'] ? 'Positive' : 'Negative'} />
      <FeedbackEntry label="Category" text={categories[dotFeedback['img0'][`dot${activeDotIndex}`]['category']]} />
      <FeedbackEntry label="Critiquer Name" text={dotFeedback['img0'][`dot${activeDotIndex}`]['name']} />
      <FeedbackEntry label="Formal Element" text={dotFeedback['img0'][`dot${activeDotIndex}`]['element']} />
      <FeedbackEntry label="Description" text={dotFeedback['img0'][`dot${activeDotIndex}`]['description']} />
      <FeedbackEntry label="Effect" text={dotFeedback['img0'][`dot${activeDotIndex}`]['effect']} />
    </div>
    :
    null}
    
    <NavigationButton backVisibility={true} nextVisibility={true} backText={"Home"} nextText={"Next"} backFunction={onBackClick} nextFunction={onNextClick}/>
  </div>
);

}

export default ViewScreen;
