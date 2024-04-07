import React, { useEffect, useState } from 'react';
import { getImages, getFeedback } from '../../../backend/FirebaseAPICalls/FirebaseAPI';
import FeedbackImage from '../../Common/FeedbackImage/FeedbackImage';
import './ViewScreen.css';
import eye from '../../../images/eye-solid.svg';
import eyeSlash from '../../../images/eye-slash-solid.svg';
import help from '../../../images/circle-question-regular.svg';
import picture from '../../../images/picture.jpg';

function ViewScreen() {
  const [imageList, setImageList] = useState(null);
  const [feedbackList, setFeedbackList] = useState(null);

  const fetchImages = async () => {
    setImageList(await getImages(111111, 222222));
  }
  const fetchFeedback = async () => {
    setFeedbackList(await getFeedback(111111, 222222));
  }
  useEffect(() => {
    fetchImages();
    fetchFeedback();
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

return (
  <div className="temporary-class">
    {imageList != null && feedbackList != null ? 
    <FeedbackImage 
      image={imageList[1]} 
      feedback={feedbackList['img1']} />
    : 
    null
    }

    <p style={{color:'white'}}>Click on the dots to view feedback.</p>
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
  </div>
);

}

export default ViewScreen;
