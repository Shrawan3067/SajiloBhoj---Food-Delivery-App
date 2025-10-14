import React from "react";
import { Link } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/menu/${restaurant.id}`}>
      <div className="rounded-xl bg-white shadow-lg hover:shadow-xl p-2 w-64 relative">
        <div className="relative">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-50 w-full object-cover rounded-2xl"
          />
          {/* Bottom shadow overlay */}
          <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black/100 to-transparent rounded-b-2xl"></div>

          {restaurant.offer && (
            <div className="absolute text-white text-[18px] font-[800] px-2 py-1 rounded-md mt-[-40px] ml-1">
              {restaurant.offer}
            </div>
          )}
        </div>

        <h3 className="mt-3 text-[16px] font-semibold">{restaurant.name}</h3>
        <p className="text-gray-500 text-sm">
          {restaurant.cuisines.join(", ")}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-green-600 font-bold">
            ⭐ {restaurant.rating}
          </span>
          <span className="text-gray-600 text-sm">{restaurant.time}</span>
        </div>
      </div>
    </Link>
  );
}
