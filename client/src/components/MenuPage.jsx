// src/pages/MenuPage.jsx
import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import paneerbutter from "../assets/paneer_butter.png";
import { CartContext } from "../context/CartContext";

// Dummy menu data (replace with API later)
const menuData = {
  1: [
    {
      id: 1,
      name: "Paneer Butter Masala",
      price: 180,
      veg: true,
      bestseller: true,
      offer: true,
    },
    {
      id: 2,
      name: "Chicken Curry",
      price: 220,
      veg: false,
      bestseller: false,
      offer: false,
    },
    {
      id: 3,
      name: "Veg Fried Rice",
      price: 150,
      veg: true,
      bestseller: false,
      offer: false,
    },
    {
      id: 4,
      name: "Mutton Biryani",
      price: 280,
      veg: false,
      bestseller: true,
      offer: true,
    },
  ],
  2: [
    {
      id: 1,
      name: "Masala Dosa",
      price: 120,
      veg: true,
      bestseller: true,
      offer: false,
    },
    {
      id: 2,
      name: "Idli Sambhar",
      price: 100,
      veg: true,
      bestseller: false,
      offer: true,
    },
    {
      id: 3,
      name: "Veg Thali",
      price: 200,
      veg: true,
      bestseller: true,
      offer: false,
    },
  ],
  3: [
    {
      id: 1,
      name: "Cheese Pizza",
      price: 250,
      veg: true,
      bestseller: true,
      offer: true,
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      price: 350,
      veg: false,
      bestseller: false,
      offer: false,
    },
    {
      id: 3,
      name: "Garlic Bread",
      price: 120,
      veg: true,
      bestseller: false,
      offer: true,
    },
  ],
};

export default function MenuPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [filters, setFilters] = useState({
    veg: false,
    offers: false,
    price: null,
  });
  const [sort, setSort] = useState("relevance");

  let menuItems = menuData[id] || [];

  // Filters
  menuItems = menuItems.filter((item) => {
    if (filters.veg && !item.veg) return false;
    if (filters.offers && !item.offer) return false;
    if (filters.price === "low" && item.price > 200) return false;
    if (filters.price === "high" && item.price < 200) return false;
    return true;
  });

  // Sorting
  if (sort === "lowToHigh") menuItems.sort((a, b) => a.price - b.price);
  else if (sort === "highToLow") menuItems.sort((a, b) => b.price - a.price);
  else if (sort === "bestseller")
    menuItems.sort((a, b) => b.bestseller - a.bestseller);

  return (
    <div className="max-w-4xl container mx-auto p-6">
      {/* Restaurant Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Restaurant #{id}</h2>
        <p className="text-gray-600">Delicious meals just for you 🍴</p>
      </div>

      {/* Filters + Sorting */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Filters */}
        <button
          onClick={() => setFilters({ ...filters, veg: !filters.veg })}
          className={`px-4 py-2 cursor-pointer rounded-full border border-gray-300 shadow-sm ${
            filters.veg ? "bg-green-500 text-white" : "bg-white"
          }`}
        >
          Pure Veg
        </button>
        <button
          onClick={() => setFilters({ ...filters, offers: !filters.offers })}
          className={`px-4 py-2 cursor-pointer rounded-full border border-gray-300 shadow-sm ${
            filters.offers ? "bg-orange-500 text-white" : "bg-white"
          }`}
        >
          Offers
        </button>
        <button
          onClick={() =>
            setFilters({
              ...filters,
              price: filters.price === "low" ? null : "low",
            })
          }
          className={`px-4 py-2 cursor-pointer rounded-full border border-gray-300 shadow-sm ${
            filters.price === "low" ? "bg-orange-500 text-white" : "bg-white"
          }`}
        >
          Price &lt; 200
        </button>
        <button
          onClick={() =>
            setFilters({
              ...filters,
              price: filters.price === "high" ? null : "high",
            })
          }
          className={`px-4 py-2 cursor-pointer rounded-full border border-gray-300 shadow-sm ${
            filters.price === "high" ? "bg-orange-500 text-white" : "bg-white"
          }`}
        >
          Price ≥ 200
        </button>

        {/* Sorting */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 cursor-pointer rounded-lg border border-gray-300 bg-white shadow-sm"
        >
          <option value="relevance">Relevance</option>
          <option value="lowToHigh">Price: Low → High</option>
          <option value="highToLow">Price: High → Low</option>
          <option value="bestseller">Bestsellers</option>
        </select>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              {/* Details */}
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
                {item.veg ? (
                  <span className="text-green-600 text-sm">🌱 Veg</span>
                ) : (
                  <span className="text-red-600 text-sm">🍖 Non-Veg</span>
                )}
                {item.bestseller && (
                  <p className="text-blue-600 text-sm mt-1">🔥 Bestseller</p>
                )}
                {item.offer && (
                  <p className="text-orange-500 text-sm mt-1">
                    💸 Special Offer
                  </p>
                )}
                <p className="text-gray-500">
                  Tasty food description goes here.
                </p>
              </div>

              {/* Image + Add */}
              <div className="relative w-40 md:w-42 flex-shrink-0">
                <img
                  src={paneerbutter}
                  alt=""
                  className="h-30 md:h-38 w-full object-cover rounded-xl"
                />
                <button
                  onClick={() => addToCart({ ...item, restaurantId: id })}
                  className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 px-8 py-2 bg-white border border-gray-500 text-green-600 font-bold rounded-lg hover:bg-gray-200 text-md"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating View Cart button */}
      <button
        onClick={() => navigate("/cart")}
        className="fixed bottom-6 right-6 bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600"
      >
        View Cart 🛒
      </button>
    </div>
  );
}
