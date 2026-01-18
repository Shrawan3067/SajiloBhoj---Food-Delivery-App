import React, { useState, useEffect } from 'react';
import './Loader.css';
import Biryani from '../assets/Biryani.png';
import Pizza from '../assets/Pizza.png';
import Burger from '../assets/Burger.png';

type FoodItem = {
  id: number;
  src: string;
  alt: string;
  className: string;
};

const Loader = (): JSX.Element => {
  const [activeItem, setActiveItem] = useState<number>(0);
  const foodItems: FoodItem[] = [
    { id: 0, src: Burger, alt: 'Burger', className: 'burger' },
    { id: 1, src: Pizza, alt: 'Pizza', className: 'pizza' },
    { id: 2, src: Biryani, alt: 'Biryani', className: 'biryani' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => (prev + 1) % foodItems.length);
    }, 800); // Change item every 800ms

    return () => clearInterval(interval);
  }, [foodItems.length]);

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="food-loader">
          <div className="plate">
            {foodItems.map((item) => (
              <div
                key={item.id}
                className={`food-item ${item.className} ${
                  activeItem === item.id ? 'active' : ''
                }`}
              >
                <img src={item.src} alt={item.alt} />
              </div>
            ))}
          </div>
        </div>
        <h2 className="loader-title">BiteXpress</h2>
        <p className="loader-subtitle">Loading delicious experiences...</p>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
