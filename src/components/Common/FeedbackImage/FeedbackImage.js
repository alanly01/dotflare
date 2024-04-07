import React, { useRef, useState } from 'react';
import './FeedbackImage.css';

const FeedbackImage = ({ image, feedback }) => {
  const imageRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ xPercent: 0, yPercent: 0, xAbs: 0, yAbs: 0});

  const handleClick = (event) => {
    if (imageRef.current) {
      const imageWidth = imageRef.current.width;
      const imageHeight = imageRef.current.height;
      setImageSize({ imageWidth, imageHeight });

      const rect = imageRef.current.getBoundingClientRect();
      const rectLeft = rect.left;
      const rectTop = rect.top;
      setImagePosition({ rectLeft, rectTop });
      console.log("rectLeft ? : " + rectLeft  + " ; rectTop? : " + rectTop + ".");
      
      // Calculate the position of the click relative to the image
      const xRelativeToImage = event.clientX - rect.left;
      const yRelativeToImage = event.clientY - rect.top;
      
      // Calculate percentages
      const xPercent = (xRelativeToImage / imageWidth);
      const yPercent = (yRelativeToImage / imageHeight);
      
      console.log("Left? : " + xPercent + " ; Top? : " + yPercent + ".");


      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      const xAbs = xPercent * imageWidth + rectLeft + scrollX;
      const yAbs = yPercent * imageHeight + rectTop + scrollY;

      setDotPosition({ xPercent, yPercent, xAbs, yAbs });
    }
  };

  const calculateDotStyle = () => {
    return {
      position: 'absolute',
      top: `${dotPosition.yAbs}px`,
      left: `${dotPosition.xAbs}px`,
      transform: 'translate(-50%, -50%)',
      width: '10px',
      height: '10px',
      backgroundColor: 'red',
      borderRadius: '50%',
      zIndex: 1
    };
  };
  return (
    <div>
      <img ref={imageRef} onClick={handleClick} className='image' src={image} ></img>
      <div style={calculateDotStyle()}></div>
    </div>
  );
};

export default FeedbackImage;
