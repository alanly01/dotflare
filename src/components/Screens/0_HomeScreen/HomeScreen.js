import React, { useState } from 'react';
import './HomeScreen.css';
import NavBar from '../../Common/NavigationBar/NavigationBar';
import SearchBar from '../../Common/SearchBar/SearchBar'; 
import Logo from '../../Common/logo.svg';

function HomeScreen({senderToken, receiverToken, getSessionTokens }) {

  return (
    <div className="homeScreen">
      <NavBar />
      <div className="content">
        <img src={Logo} alt="Logo" className="logo" />
        <SearchBar
          labelText="Enter Project Code"
          placeholder="Enter code here"
          defaultValue="000000"
          showButton={false}
        />
        <button className="get-code-button" onClick={() => {getSessionTokens()}}>
          <div className="get-code-text">
            Get Session Codes
          </div>
        </button>
        <div className='code-section'>
        <div className='code-container'>
          <div className='code'>
            {senderToken}
          </div>
          <div className='code-label'>
            Sender Code
          </div>
        </div>
        <div className='code-container'>
          <div className='code'>
            {receiverToken}
          </div>
          <div className='code-label'>
            Receiver Code
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
