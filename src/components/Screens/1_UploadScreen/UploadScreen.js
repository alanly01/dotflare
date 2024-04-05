import React, { useState } from 'react';
import './UploadScreen.css';
import plusIcon from '../../../images/plus-solid.svg';

function UploadScreen() {
  // State to store uploaded pictures
  const [pictures, setPictures] = useState([]);

  // Function to handle picture upload
  const handlePictureUpload = (e) => {
    const newPictures = Array.from(e.target.files);
    setPictures([...pictures, ...newPictures]);
  };

  // Function to handle button click and trigger file input
  const handleButtonClick = () => {
    const fileInput = document.getElementById("upload-input");
    fileInput.click();
  };

  return (
    <div className="upload-screen">
      <div className="picture-grid">
        {pictures.map((picture, index) => (
          <div className="picture-item" key={index}>
            <img src={URL.createObjectURL(picture)} alt={`Uploaded ${index}`} />
          </div>
        ))}
      </div>
      <button className="upload-button" onClick={handleButtonClick}>
        <img src={plusIcon} alt="Upload" />
      </button>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handlePictureUpload}
        style={{ display: 'none' }}
        id="upload-input"
      />
      <div className="bottom-bar"></div>
    </div>
  );
}

export default UploadScreen;
