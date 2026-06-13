import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaStar, FaClock, FaTruck, FaLeaf, FaTag } from 'react-icons/fa6';
import { FiHeart, FiShoppingBag, FiTrendingUp, FiZap } from 'react-icons/fi';

import Bread from '/bread.png';
import Bakery from '/bakery.png';
import Atta from '/atta.png';

// Types
interface GroceryItem {
  id: string;
  name: string;
  image: string;
  category?: string;
  price?: string;
  unit?: string;
  discount?: number;
  isOrganic?: boolean;
  isTrending?: boolean;
  deliveryTime?: string;
  stock?: number;
  rating?: number;
}

// Enhanced grocery items with metadata
const GROCERY_ITEMS: GroceryItem[] = [
  { id: '1', name: 'Fresh Bread', image: Bread, category: 'Bakery', price: '₹35', unit: '400g', discount: 10, isOrganic: false, deliveryTime: '15-20 min', stock: 45, rating: 4.5 },
  { id: '2', name: 'Artisan Bakery', image: Bakery, category: 'Bakery', price: '₹89', unit: '500g', discount: 5, isOrganic: true, isTrending: true, deliveryTime: '20-25 min', stock: 28, rating: 4.7 },
  { id: '3', name: 'Whole Wheat Atta', image: Atta, category: 'Flour & Grains', price: '₹120', unit: '5kg', discount: 15, isOrganic: true, deliveryTime: '15-20 min', stock: 120, rating: 4.8 },
  { id: '4', name: 'Frozen Parotta', image: Bread, category: 'Frozen Foods', price: '₹85', unit: '6 pcs', discount: 8, isOrganic: false, deliveryTime: '10-15 min', stock: 34, rating: 4.3 },
  { id: '5', name: 'Idli Batter', image: Bakery, category: 'Dairy & Eggs', price: '₹45', unit: '1kg', discount: 0, isOrganic: false, deliveryTime: '15-20 min', stock: 52, rating: 4.4 },
  { id: '6', name: 'Whole Wheat Paratha', image: Atta, category: 'Frozen Foods', price: '₹95', unit: '5 pcs', discount: 12, isOrganic: true, isTrending: true, deliveryTime: '10-15 min', stock: 41, rating: 4.6 },
  { id: '7', name: 'Pure Veg Snacks', image: Bread, category: 'Snacks', price: '₹65', unit: '200g', discount: 5, isOrganic: false, deliveryTime: '5-10 min', stock: 67, rating: 4.2 },
  { id: '8', name: 'Premium Tea', image: Bread, category: 'Beverages', price: '₹180', unit: '250g', discount: 20, isOrganic: true, deliveryTime: '10-15 min', stock: 89, rating: 4.9 },
  { id: '9', name: 'Fresh Juice', image: Bread, category: 'Beverages', price: '₹60', unit: '1L', discount: 0, isOrganic: false, deliveryTime: '5-10 min', stock: 23, rating: 4.1 },
  { id: '10', name: 'Medu Vada Mix', image: Bread, category: 'Snacks', price: '₹55', unit: '200g', discount: 10, isOrganic: false, deliveryTime: '5-10 min', stock: 56, rating: 4.3 },
  { id: '11', name: 'Filter Coffee', image: Bread, category: 'Beverages', price: '₹220', unit: '250g', discount: 15, isOrganic: true, isTrending: true, deliveryTime: '10-15 min', stock: 73, rating: 4.8 },
  { id: '12', name: 'Poha Flakes', image: Bread, category: 'Breakfast', price: '₹42', unit: '500g', discount: 8, isOrganic: false, deliveryTime: '5-10 min', stock: 94, rating: 4.4 },
  { id: '13', name: 'Poori Flour', image: Bread, category: 'Flour & Grains', price: '₹48', unit: '1kg', discount: 5, isOrganic: false, deliveryTime: '10-15 min', stock: 62, rating: 4.2 },
  { id: '14', name: 'Organic Omelette', image: Bread, category: 'Dairy & Eggs', price: '₹75', unit: '6 pcs', discount: 0, isOrganic: true, deliveryTime: '5-10 min', stock: 38, rating: 4.5 },
];

// Loading Skeleton Component
const GroceryItemSkeleton: React.FC = () => (
  <div className="flex-shrink-0 w-44 md:w-48 animate-pulse">
    <div className="bg-gray-200 rounded-2xl h-48 md:h-52 w-full"></div>
    <div className="mt-3 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);

// Category Filter Component
const CategoryFilter: React.FC<{
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onCategoryChange("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
          activeCategory === "all"
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All Items
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
            activeCategory === category
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// Individual Grocery Item Card
const GroceryItemCard: React.FC<{ item: GroceryItem; onClick?: () => void }> = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const handleQuantityChange = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
    setQuantity(prev => Math.max(0, prev + delta));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex-shrink-0 w-44 md:w-48 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-48 md:h-52 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Discount Badge */}
          {item.discount && item.discount > 0 && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg"
            >
              <FaTag className="text-xs" />
              {item.discount}% OFF
            </motion.div>
          )}
          
          {/* Organic Badge */}
          {item.isOrganic && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg">
              <FaLeaf className="text-xs" />
              Organic
            </div>
          )}
          
          {/* Trending Badge */}
          {item.isTrending && (
            <div className="absolute bottom-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-lg">
              <FiTrendingUp className="text-xs" />
              Trending
            </div>
          )}
          
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <FiHeart
              className={`text-lg transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </motion.button>
        </div>
        
        {/* Content */}
        <div className="p-3">
          <h3 className="font-bold text-gray-800 text-sm md:text-base mb-1 truncate">
            {item.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5">
              <FaStar className="text-yellow-500 text-xs" />
              <span className="text-xs font-semibold text-gray-700">{item.rating}</span>
            </div>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{item.unit}</span>
            {item.deliveryTime && (
              <>
                <span className="text-xs text-gray-400">•</span>
                <div className="flex items-center gap-0.5">
                  <FaClock className="text-gray-400 text-xs" />
                  <span className="text-xs text-gray-500">{item.deliveryTime}</span>
                </div>
              </>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-green-600 text-lg">{item.price}</span>
              {item.discount && item.discount > 0 && (
                <span className="text-xs text-gray-400 line-through ml-2">
                  {Math.round(parseInt(item.price.replace('₹', '')) * (1 + item.discount / 100))}
                </span>
              )}
            </div>
            
            {quantity === 0 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:shadow-lg transition-all flex items-center gap-1"
              >
                <FiShoppingBag className="text-xs" />
                Add
              </motion.button>
            ) : (
              <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                <button
                  onClick={(e) => handleQuantityChange(e, -1)}
                  className="w-6 h-6 rounded-full bg-white text-green-600 font-bold hover:bg-green-50 transition-colors"
                >
                  -
                </button>
                <span className="text-sm font-semibold w-6 text-center">{quantity}</span>
                <button
                  onClick={(e) => handleQuantityChange(e, 1)}
                  className="w-6 h-6 rounded-full bg-white text-green-600 font-bold hover:bg-green-50 transition-colors"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Stock Status */}
        {item.stock && item.stock < 20 && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-50 text-red-600 text-xs text-center py-1">
            Only {item.stock} left in stock
          </div>
        )}
        
        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-green-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

// Navigation Arrows Component
const NavigationArrows: React.FC<{
  onLeftClick: () => void;
  onRightClick: () => void;
  showLeft: boolean;
  showRight: boolean;
}> = ({ onLeftClick, onRightClick, showLeft, showRight }) => {
  return (
    <>
      <AnimatePresence>
        {showLeft && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={onLeftClick}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl text-gray-700 hover:text-green-500 transition-all duration-300 z-10"
          >
            <FaArrowLeft className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showRight && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={onRightClick}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl text-gray-700 hover:text-green-500 transition-all duration-300 z-10"
          >
            <FaArrowRight className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

// Main Component
export default function GroceriesOptions(): JSX.Element {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GroceryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(GROCERY_ITEMS.map(item => item.category))];
    return uniqueCategories.filter(Boolean);
  }, []);

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return GROCERY_ITEMS;
    return GROCERY_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      
      // Simulate loading
      const timer = setTimeout(() => setIsLoading(false), 500);
      
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        clearTimeout(timer);
      };
    }
  }, [checkScrollPosition]);

  // Reset scroll position when category changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      setTimeout(checkScrollPosition, 300);
    }
  }, [activeCategory, checkScrollPosition]);

  const scrollLeft = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  const handleItemClick = (item: GroceryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Groceries at your doorstep
                </h2>
                <p className="text-gray-500 mt-2 text-sm md:text-base">
                  Fresh groceries delivered in minutes, straight from local stores
                </p>
              </div>
              
              {/* Delivery Info Badge */}
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                <FiZap className="text-green-500" />
                <span className="text-sm font-semibold text-green-700">Fast Delivery in 30 mins</span>
              </div>
            </div>

            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>

          {/* Scrollable Container */}
          <div className="relative">
            <NavigationArrows
              onLeftClick={scrollLeft}
              onRightClick={scrollRight}
              showLeft={showLeftArrow}
              showRight={showRightArrow}
            />
            
            <motion.div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="flex gap-4 md:gap-6 pb-4">
                {isLoading ? (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <GroceryItemSkeleton key={i} />
                    ))}
                  </>
                ) : (
                  filteredItems.map((item) => (
                    <GroceryItemCard
                      key={item.id}
                      item={item}
                      onClick={() => handleItemClick(item)}
                    />
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2].map((dot) => (
              <button
                key={dot}
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (container) {
                    const scrollAmount = container.clientWidth * dot;
                    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
                  }
                }}
                className="group relative"
              >
                <div className="w-2 h-2 bg-gray-300 rounded-full hover:bg-green-500 transition-all duration-300 group-hover:scale-125" />
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Grocery Item Details */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedItem.name}</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="text-sm font-semibold text-green-700">
                      {selectedItem.rating} ★
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{selectedItem.category}</span>
                  {selectedItem.isOrganic && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Organic
                    </span>
                  )}
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaClock className="text-green-500" />
                    <span>Delivery Time: {selectedItem.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaTruck className="text-green-500" />
                    <span>Free delivery on orders above ₹299</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiShoppingBag className="text-green-500" />
                    <span>Stock: {selectedItem.stock} units available</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-green-600">{selectedItem.price}</span>
                    {selectedItem.discount && selectedItem.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        {Math.round(parseInt(selectedItem.price.replace('₹', '')) * (1 + selectedItem.discount / 100))}
                      </span>
                    )}
                    {selectedItem.discount && selectedItem.discount > 0 && (
                      <span className="text-sm text-green-600 ml-2">
                        Save {selectedItem.discount}%
                      </span>
                    )}
                  </div>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                    <FiShoppingBag />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
      </>
  );
}