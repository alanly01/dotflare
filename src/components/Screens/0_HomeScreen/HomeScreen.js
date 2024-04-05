import React from 'react';
import './HomeScreen.css';
import NavBar from '../../Common/NavigationBar/NavigationBar';
import SearchBar from '../../Common/SearchBar/SearchBar'; 
import Logo from '../../Common/logo.svg';

function HomeScreen() {
  return (
    <div className="homeScreen">
      <NavBar />
      <div className="content">
        <img src={Logo} alt="Logo" className="logo" />
        <SearchBar
          labelText="Enter Project Code"
          placeholder="Enter code here"
          defaultValue="000000"
        />
        <SearchBar
          labelText="don't know the label"
          placeholder="Enter code here"
          defaultValue="add later"
        />
        <SearchBar />
      </div>
    </div>
  );
}

export default HomeScreen;
