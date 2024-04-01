import React from 'react';
import './HomeScreen.css';
import NavBar from '../../Common/NavigationBar/NavBar';

function HomeScreen() {
  return (
    <div>
      <NavBar />
      <div className="temporary-class">
        <h1>HomeScreen</h1>
      </div>
    </div>
  );
}

export default HomeScreen;
