import React, { useState } from "react";
import { restaurants } from "../data/restaurants";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const applyFilters = (data) => {
    let filtered = data;

    // Search filter
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisines.join(", ").toLowerCase().includes(search.toLowerCase())
    );

    // Other filters
    if (filter === "offers") {
      filtered = filtered.filter((r) => r.hasOffer);
    }
    if (filter === "rating") {
      filtered = filtered.filter((r) => r.rating >= 4.0);
    }
    if (filter === "veg") {
      filtered = filtered.filter((r) => r.isVeg);
    }
    if (filter === "lowPrice") {
      filtered = filtered.filter((r) => r.priceRange < 300);
    }
    if (filter === "midPrice") {
      filtered = filtered.filter(
        (r) => r.priceRange >= 300 && r.priceRange <= 600
      );
    }

    return filtered;
  };

  const filteredRestaurants = applyFilters(restaurants);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-7xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Top restaurant chains in Janakpurdham
        </h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or cuisine..."
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setFilter("offers")}
            className={`px-4 py-2 cursor-pointer rounded-full border border-gray-300 shadow-sm ${
              filter === "offers" ? "bg-orange-500 text-white" : "bg-white"
            }`}
          >
            Offers
          </button>
          <button
            onClick={() => setFilter("rating")}
            className={`px-4 py-2 cursor-pointer rounded-full border border-gray-300 shadow-sm ${
              filter === "rating" ? "bg-orange-500 text-white" : "bg-white"
            }`}
          >
            Ratings 4.0+
          </button>
          <button
            onClick={() => setFilter("veg")}
            className={`px-4 py-2 cursor-pointer rounded-full border border-gray-300 shadow-sm ${
              filter === "veg" ? "bg-orange-500 text-white" : "bg-white"
            }`}
          >
            Pure Veg
          </button>
          <button
            onClick={() => setFilter("lowPrice")}
            className={`px-4 py-2 cursor-pointer rounded-full border border-gray-300 shadow-sm ${
              filter === "lowPrice" ? "bg-orange-500 text-white" : "bg-white"
            }`}
          >
            Less than ₹300
          </button>
          <button
            onClick={() => setFilter("midPrice")}
            className={`px-4 py-2 cursor-pointer rounded-full border border-gray-300 shadow-sm ${
              filter === "midPrice" ? "bg-orange-500 text-white" : "bg-white"
            }`}
          >
            ₹300 – ₹600
          </button>
          <button
            onClick={() => setFilter("")}
            className="px-4 py-2 cursor-pointer rounded-full border border-gray-300 shadow-sm bg-white"
          >
            Clear
          </button>
        </div>

        {/* Restaurants */}
        <div className="flex justify-between flex-wrap gap-8">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))
          ) : (
            <p className="text-gray-600">No restaurants found</p>
          )}
        </div>
      </div>
    </div>
  );
}
