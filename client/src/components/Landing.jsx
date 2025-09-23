import React from "react";
import banner from "../assets/banner.png";
import petCare from "../assets/petCare.png";
import pharmacy from "../assets/pharmacy.png";
import babyCare from "../assets/babyCare.png";

export default function Landing() {
  return (
    <div className="w-7xl space-y-8">
      {/* Hero Banner */}
      <div
        className="cursor-pointer rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})`, height: "240px" }}
      ></div>

      {/* Secondary Banners */}
      <div className="grid md:grid-cols-3 gap-6">
        <div
          className="cursor-pointer p-6 rounded-2xl flex flex-col justify-between bg-cover bg-center"
          style={{ backgroundImage: `url(${pharmacy})`, height: "240px" }}
        ></div>

        <div
          className="cursor-pointer p-6 rounded-2xl flex flex-col justify-between bg-cover bg-center"
          style={{ backgroundImage: `url(${petCare})`, height: "240px" }}
        ></div>

        <div
          className="cursor-pointer p-6 rounded-2xl flex flex-col justify-between bg-cover bg-center"
          style={{ backgroundImage: `url(${babyCare})`, height: "240px" }}
        ></div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-8 md:grid-cols-6 gap-6">
        {[
          "Paan Corner",
          "Dairy, Bread & Eggs",
          "Fruits & Vegetables",
          "Cold Drinks & Juices",
          "Snacks & Munchies",
          "Breakfast & Instant Food",
          "Sweet Tooth",
          "Bakery & Biscuits",
          "Tea, Coffee & Health Drink",
          "Atta, Rice & Dal",
        ].map((item, index) => {
          const images = [
            "/paan.png",
            "/bread.png",
            "/fruits.png",
            "/coldDrinks.png",
            "/snacks.png",
            "/breakfast.png",
            "/sweet.png",
            "/bakery.png",
            "/tea.png",
            "/atta.png",
          ];

          return (
            <div key={index} className="cursor-pointer text-center">
              <div
                className="sub-div w-full h-40 rounded-lg mx-auto mb-3 bg-cover bg-center"
                style={{ backgroundImage: `url(${images[index]})` }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
