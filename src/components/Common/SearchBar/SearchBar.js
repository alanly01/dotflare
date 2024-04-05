import React from 'react';
import './SearchBar.css';
import SendButton from '../../Common/send_button.svg'; 

const SearchBar = ({ labelText, placeholder, defaultValue }) => {
    return (
      <div className="search-bar-container">
        {labelText && <label htmlFor="search-input" className="search-bar-label">{labelText}</label>}
        <div className="search-bar">
          <input
            id="search-input"
            type="text"
            placeholder={placeholder}
            defaultValue={defaultValue}
            className="search-input"
          />
          <button className="search-button">
            <img src={SendButton} alt="Send" />
          </button>
        </div>
      </div>
    );
  };

export default SearchBar;
