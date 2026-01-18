import React, { useRef, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

import Bread from '/bread.png';
import Bakery from '/bakery.png';
import Atta from '/atta.png';

type GrocItem = { name: string; image: string };

export default function GroceriesOptions(): JSX.Element {
  const foodItems: GrocItem[] = [
    { name: 'Bread', image: Bread },
    { name: 'Bakery', image: Bakery },
    { name: 'Atta', image: Atta },
    { name: 'Parotta', image: Bread },
    { name: 'Idli', image: Bakery },
    { name: 'Paratha', image: Atta },
    { name: 'Pure Veg', image: Bread },
    { name: 'Tea', image: Bread },
    { name: 'Juice', image: Bread },
    { name: 'Vada', image: Bread },
    { name: 'Coffee', image: Bread },
    { name: 'Poha', image: Bread },
    { name: 'Poori', image: Bread },
    { name: 'Omelette', image: Bread },
  ];

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const cont = scrollContainerRef.current;
    if (cont) {
      cont.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => cont.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const scrollLeft = () => { const c = scrollContainerRef.current; if (c) c.scrollBy({ left: -300, behavior: 'smooth' }); };
  const scrollRight = () => { const c = scrollContainerRef.current; if (c) c.scrollBy({ left: 300, behavior: 'smooth' }); };

  return (
    <section className="py-8 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[19px] md:text-2xl font-bold text-gray-900">Groceries at your doorstep</h2>
          <div className="flex space-x-2">
            <button onClick={scrollLeft} disabled={!showLeftArrow} className={`rounded-full p-2 transition-all duration-200 ${showLeftArrow ? 'bg-gray-300 hover:bg-orange-600' : 'bg-gray-100'} flex items-center justify-center md:w-8 w-6 md:h-8 h-6`}><FaArrowLeft className="text-xl" /></button>
            <button onClick={scrollRight} disabled={!showRightArrow} className={`rounded-full p-2 transition-all duration-200 ${showRightArrow ? 'bg-gray-300 hover:bg-orange-600' : 'bg-gray-100'} flex items-center justify-center md:w-8 w-6 md:h-8 h-6`}><FaArrowRight className="text-xl" /></button>
          </div>
        </div>

        <div className="relative">
          <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide space-x-6 px-1">
            {foodItems.map((item, idx) => (
              <div key={idx} className="flex-shrink-0 w-40 bg-white cursor-pointer group">
                <div className="h-52 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-8">{[1,2,3].map(d => <div key={d} className="w-2 h-2 bg-gray-300 rounded-full hover:bg-orange-500 cursor-pointer" />)}</div>
      </div>
      <style>{`.scrollbar-hide::-webkit-scrollbar{ display: none; }`}</style>
    </section>
  );
}
