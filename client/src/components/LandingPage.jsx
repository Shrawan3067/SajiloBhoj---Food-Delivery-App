// LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { FiSearch } from "react-icons/fi";

// Card images
import foodDeliveryImg from '../assets/babyCare.png';
import instamartImg from '../assets/petCare.png';
import dineoutImg from '../assets/pharmacy.png';

// Side decorative images
import leftImage from '../assets/Veggies_new.png';   // replace with your veg-bag image
import rightImage from '../assets/Sushi_replace.png'; // replace with your sushi image

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
            <div className="w-full landing-container">
      {/* Top hero section */}
      <div className="landing-top">
        {/* Left decorative image */}
        <img 
          src={leftImage} 
          alt="Left Decoration" 
          className="side-image left-image"
        />


            <div className="landing-content">
                <h1 className="hungry font-[700] text-[50px]">Hungry?</h1>
              <h1 className='order font-[700] text-[40px]'>
                Order food & groceries from your <br /> favorite local spots with SajiloBhoj!
              </h1>
              <div className="landing-search">
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="location-input"
                />
               <div className='search-res'>
                 <input
                  type="text"
                  placeholder="Search for restaurant, item or more"
                  className="search-input"
                />
                <FiSearch className="search-icon text-black-500 mr-2" />
               </div>
                
              </div>
            </div>
        <img 
          src={rightImage} 
          alt="Right Decoration" 
          className="side-image right-image"
        />
      </div>

      {/* Cards section */}
      <div className="cards-container">
        <div className="landing-card" onClick={() => navigate('/restaurant-list')}>
          <h2>FOOD DELIVERY</h2>
          <p>FROM RESTAURANTS</p>
          <span className="offer">UPTO 60% OFF</span>
          <img src={foodDeliveryImg} alt="Food Delivery" />
        </div>

        <div className="landing-card" onClick={() => navigate('/instamart')}>
          <h2>INSTAMART</h2>
          <p>INSTANT GROCERY</p>
          <span className="offer">UPTO 60% OFF</span>
          <img src={instamartImg} alt="Instamart" />
        </div>

        <div className="landing-card" onClick={() => navigate('/dineout')}>
          <h2>DINEOUT</h2>
          <p>EAT OUT & SAVE MORE</p>
          <span className="offer">UPTO 50% OFF</span>
          <img src={dineoutImg} alt="Dineout" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
