// components/Loader.jsx
import React from 'react';
import './Loader.css';
import Biryani from '../assets/Biryani.png'
import Pizza from '../assets/Pizza.png'
import Burger from '../assets/Burger.png'

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="food-loader">
          <div className="plate">
            <div className="food-item biryani"><img src={Burger} alt="" /></div>
            <div className="food-item pizza"><img src={Pizza} alt="" /></div>
            <div className="food-item burger"><img src={Biryani} alt="" /></div>
          </div>
        </div>
        <h2 className="loader-title">Sajilo Bhoj</h2>
        <p className="loader-subtitle">Loading delicious experiences...</p>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;