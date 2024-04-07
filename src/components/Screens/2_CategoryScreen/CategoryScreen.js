import React from 'react'
import './CategoryScreen.css';
import NavigationButton from '../../Common/NavigationButton/NavigationButton';

function CategoryScreen( {navigateToScreen, exitSession} ) {

  const onBackClick = () => {
    exitSession();
  }

  const onNextClick = async () => {
    navigateToScreen(3, 2)
  }

  return (
    <div className="temporary-class">
      <h1>CategoryScreen</h1>
      <NavigationButton backVisibility={true} nextVisibility={true} backText={"Home"} nextText={"Confirm"} backFunction={onBackClick} nextFunction={onNextClick}/>
    </div>
  );
}

export default CategoryScreen;