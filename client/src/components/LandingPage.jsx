// LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { FiSearch } from "react-icons/fi";
import { TfiLocationPin } from "react-icons/tfi";

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
                <h1 className="font-[700] md:text-[50px] text-[35px] md:mt-0 mt-5">Hungry?</h1>
              <h1 className='font-[700] md:text-[40px] text-[25px]'>
                Order food & groceries from your favorite local spots with SajiloBhoj!
              </h1>
              <div className="landing-search">
                
                <div className='search-res'>
                 <input
                  type="text"
                  placeholder="Enter your location"
                  className="location-input"
                />
                <TfiLocationPin className="text-[25px] text-orange-500 mr-2" />
               </div>
               <div className='search-res'>
                 <input
                  type="text"
                  placeholder="Search for restaurant, item or more"
                  className="search-input"
                />
                <FiSearch className="text-[20px] text-black-500 mr-2" />
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
      <div className="flex justify-center p-8 flex-wrap gap-5">
        <div className="bg-white text-[#333] w-[350px] p-5 rounded-[20px] text-center cursor-pointer relative transition-transform duration-200 hover:scale-103" onClick={() => navigate('/restaurant-list')}>
          <h2 className='text-[30px] font-[800] mb-2 text-center'>FOOD DELIVERY</h2>
          <p className='text-[24px] font-[700] mb-[10px] text-gray-500 text-center'>FROM RESTAURANTS</p>
          <span className="offer">UPTO 60% OFF</span>
          <img src={foodDeliveryImg} alt="Food Delivery" />
        </div>

        <div className="bg-white text-[#333] w-[350px] p-5 rounded-[20px] text-center cursor-pointer relative transition-transform duration-200 hover:scale-103" onClick={() => navigate('/instamart')}>
          <h2 className='text-[30px] font-[800] mb-2 text-center'>INSTAMART</h2>
          <p className='text-[24px] font-[700] mb-[10px] text-gray-500 text-center'>INSTANT GROCERY</p>
          <span className="offer">UPTO 60% OFF</span>
          <img src={instamartImg} alt="Instamart" />
        </div>

        <div className="bg-white text-[#333] w-[350px] p-5 rounded-[20px] text-center cursor-pointer relative transition-transform duration-200 hover:scale-103" onClick={() => navigate('/dineout')}>
          <h2 className='text-[30px] font-[800] mb-2 text-center'>DINEOUT</h2>
          <p className='text-[24px] font-[700] mb-[10px] text-gray-500 text-center'>EAT OUT & SAVE MORE</p>
          <span className="offer">UPTO 50% OFF</span>
          <img src={dineoutImg} alt="Dineout" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
