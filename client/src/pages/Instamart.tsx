import React from "react";
import banner from "../assets/banner.png";
import all from "../assets/allcategory.jpg";
import petCare from "../assets/petCare.png";
import homeEssentials from "../assets/homeessentials.png";
import beverages from "../assets/beverages.jpeg";
import snacks from "../assets/snacks.png";
import fruitsVeg from "../assets/fruitsVeg.png";
import dairy from "../assets/dairy.png";
import personalCare from "../assets/personalCare.jpg";
import amul from "../assets/amul.png";
// Add more product image imports as needed
import lays from "../assets/lays.png";
import apples from "../assets/apple.jpg";
import colgate from "../assets/colgate.png";
import coke from "../assets/colgate.png";
import pedigree from "../assets/colgate.png";
import dettol from "../assets/colgate.png";
import bread from "../assets/colgate.png";
import butter from "../assets/colgate.png";
import broccoli from "../assets/colgate.png";
import pepsi from "../assets/colgate.png";
import dove from "../assets/colgate.png";

const categories = [
  { id: "all", title: "All", img: all },
  { id: "pet", title: "Pet Care", img: petCare },
  { id: "home", title: "Home Essentials", img: homeEssentials },
  { id: "bev", title: "Beverages", img: beverages },
  { id: "snacks", title: "Snacks", img: snacks },
  { id: "fruits", title: "Fruits & Veg", img: fruitsVeg },
  { id: "dairy", title: "Dairy & Eggs", img: dairy },
  { id: "personal", title: "Personal Care", img: personalCare },
];

// Products array for rendering products on UI
const products = [
  {
    id: 1,
    name: "Amul Gold Full Cream Milk",
    description: "1L Tetrapack | Fresh & Pure",
    price: 68,
    category: "dairy",
    image: amul, // Directly use the imported variable
    rating: 4.5,
  },
  {
    id: 2,
    name: "Lays Potato Chips",
    description: "Classic Salted | 50g Pack",
    price: 20,
    category: "snacks",
    image: lays,
    rating: 4.2,
  },
  {
    id: 3,
    name: "Apples - Washington",
    description: "Fresh | 500g Pack",
    price: 120,
    category: "fruits",
    image: apples,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Colgate Strong Teeth",
    description: "Toothpaste 200g | Cavity Protection",
    price: 105,
    category: "personal",
    image: colgate,
    rating: 4.4,
  },
  {
    id: 5,
    name: "Coca-Cola Soft Drink",
    description: "750ml Bottle | Chilled",
    price: 50,
    category: "bev",
    image: coke,
    rating: 4.3,
  },
  {
    id: 6,
    name: "Pedigree Dog Food",
    description: "Adult | Chicken & Vegetables 3kg",
    price: 650,
    category: "pet",
    image: pedigree,
    rating: 4.6,
  },
  {
    id: 7,
    name: "Dettol Antiseptic Liquid",
    description: "550ml | Protection from Germs",
    price: 180,
    category: "home",
    image: dettol,
    rating: 4.5,
  },
  {
    id: 8,
    name: "Britannia Bread",
    description: "Brown Bread | 400g Loaf",
    price: 45,
    category: "snacks",
    image: bread,
    rating: 4.1,
  },
  {
    id: 9,
    name: "Amul Butter",
    description: "Salted | 100g Pack",
    price: 55,
    category: "dairy",
    image: butter,
    rating: 4.4,
  },
  {
    id: 10,
    name: "Broccoli",
    description: "Fresh | 250g",
    price: 75,
    category: "fruits",
    image: broccoli,
    rating: 4.3,
  },
  {
    id: 11,
    name: "Pepsi Can",
    description: "330ml | Refreshing Cola",
    price: 40,
    category: "bev",
    image: pepsi,
    rating: 4.2,
  },
  {
    id: 12,
    name: "Dove Shampoo",
    description: "Hair Fall Rescue 340ml",
    price: 220,
    category: "personal",
    image: dove,
    rating: 4.6,
  },
];

const Instamart: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <img
            src={banner}
            alt="Instamart Banner"
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Shop by category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-lg p-3 shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-20 h-20 object-contain mb-2"
              />
              <span className="text-sm font-medium text-gray-700">
                {cat.title}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Top picks for you</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-100 rounded-md mb-3 flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} // Now this references the imported image variable
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mb-1">
                  <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {categories.find(cat => cat.id === product.category)?.title}
                  </span>
                </div>
                <div className="font-semibold text-gray-800 truncate">
                  {product.name}
                </div>
                <div className="text-gray-500 text-sm mb-2">
                  {product.description}
                </div>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.rating})
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-orange-500 font-bold text-lg">
                    Rs {product.price}
                  </div>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instamart;