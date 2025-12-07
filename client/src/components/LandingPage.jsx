// LandingPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiClock, FiStar, FiShoppingBag, FiNavigation } from "react-icons/fi";
import { TfiLocationPin } from "react-icons/tfi";
import {
  FaUtensils,
  FaShoppingBasket,
  FaStore,
  FaMotorcycle,
  FaShieldAlt,
} from "react-icons/fa";

// Side decorative images
import leftImage from "../assets/Veggies_new.png";
import rightImage from "../assets/Sushi_replace.png";
import FoodOptionsSection from "./FoodOptionsSection";
import GroceriesOptions from "./GroceriesOptions";
import FeaturedRestaurantsSection from "./FeaturedRestaurantsSection";
import Shristi_momo from "../assets/shristi_momo.png";
import Hansraj from "../assets/hansraj.png"
import Raghupati from "../assets/raghupati.png"
import food from "../assets/food1.png";
import grocery from "../assets/grocery.png";
import dineout from "../assets/dineout.png"

const LandingPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Featured restaurants data
  const featuredRestaurants = [
    {
      id: 1,
      name: "Shristi Momo Corner",
      cuisine: "Momo, Nepali",
      rating: 4.2,
      deliveryTime: "30 min",
      image: Shristi_momo,
    },
    {
      id: 2,
      name: "Hansraj Sweets",
      cuisine: "Sweets, Momo",
      rating: 4.5,
      deliveryTime: "25 min",
      image: Hansraj,
    },
    {
      id: 3,
      name: "Raghupati Sweets",
      cuisine: "Nepali, Sweets",
      rating: 4.1,
      deliveryTime: "35 min",
      image: Raghupati,
    },
    {
      id: 4,
      name: "McDonald's",
      cuisine: "Burgers, Fast Food",
      rating: 4.0,
      deliveryTime: "20 min",
      image: Shristi_momo,
    },
  ];

  // Detect user's location on component mount
  useEffect(() => {
    // Check if location is already saved in localStorage
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(savedLocation);
      return;
    }

    // Show location modal on first visit
    const hasSeenLocationModal = localStorage.getItem("hasSeenLocationModal");
    if (!hasSeenLocationModal) {
      setTimeout(() => {
        setShowLocationModal(true);
        localStorage.setItem("hasSeenLocationModal", "true");
      }, 1000);
    }

    // Try to get approximate location from IP
    getApproximateLocation();
  }, []);

  

  // Function to detect precise location using Geolocation API
// Replace the detectCurrentLocation function with this corrected version
const detectCurrentLocation = () => {
  setIsDetectingLocation(true);
  setLocationError("");

  if (!navigator.geolocation) {
    setLocationError("Geolocation is not supported by your browser");
    setIsDetectingLocation(false);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocoding to get address from coordinates
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
        );
        const data = await response.json();
        
        if (data.address) {
          const address = data.address;
          console.log("Full address data:", data); // For debugging
          
          // Build location string with better logic
          let locationString = "";
          
          // Priority order for location name
          if (address.road) {
            locationString = address.road;
          } else if (address.neighbourhood) {
            locationString = address.neighbourhood;
          } else if (address.suburb) {
            locationString = address.suburb;
          }
          
          // Add area/village/town/city
          if (address.village) {
            if (locationString) {
              locationString += `, ${address.village}`;
            } else {
              locationString = address.village;
            }
          } else if (address.town) {
            if (locationString) {
              locationString += `, ${address.town}`;
            } else {
              locationString = address.town;
            }
          } else if (address.city) {
            if (locationString) {
              locationString += `, ${address.city}`;
            } else {
              locationString = address.city;
            }
          }
          
          // If we still don't have a good location, try display_name
          if (!locationString && data.display_name) {
            // Extract the first part of display_name
            const displayParts = data.display_name.split(',');
            locationString = displayParts.slice(0, 2).join(',').trim();
          }
          
          // Add district/county and state
          if (address.county || address.state_district) {
            const district = address.county || address.state_district;
            if (!locationString.includes(district)) {
              locationString += `, ${district}`;
            }
          }
          
          if (address.state && !locationString.includes(address.state)) {
            locationString += `, ${address.state}`;
          }
          
          // Fallback if locationString is still empty
          if (!locationString && data.display_name) {
            locationString = data.display_name.split(',')[0].trim();
          }
          
          if (locationString) {
            // Clean up the location string
            locationString = locationString.replace(/,,+/g, ',');
            locationString = locationString.trim();
            
            setLocation(locationString);
            localStorage.setItem("userLocation", locationString);
            localStorage.setItem("userCoordinates", JSON.stringify({ latitude, longitude }));
          } else {
            // Try Google Maps Geocoding API as fallback
            await tryGoogleGeocoding(latitude, longitude);
          }
        } else {
          setLocationError("Location not found. Please enter manually.");
        }
      } catch (error) {
        console.error("Error reverse geocoding:", error);
        // Try alternative geocoding service
        await tryAlternativeGeocoding(position.coords.latitude, position.coords.longitude);
      } finally {
        setIsDetectingLocation(false);
        setShowLocationModal(false);
      }
    },
    (error) => {
      console.error("Geolocation error:", error);
      setIsDetectingLocation(false);
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setLocationError("Location access denied. Please enable location services or enter manually.");
          break;
        case error.POSITION_UNAVAILABLE:
          setLocationError("Location information unavailable. Please enter manually.");
          break;
        case error.TIMEOUT:
          setLocationError("Location request timed out. Please try again or enter manually.");
          break;
        default:
          setLocationError("Error detecting location. Please enter manually.");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    }
  );
};

// Add these helper functions after the detectCurrentLocation function

// Try Google Maps Geocoding API (requires API key - you'll need to get one)
const tryGoogleGeocoding = async (latitude, longitude) => {
  try {
    // Note: You need to get a Google Maps API key for this to work
    // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const address = data.results[0].formatted_address;
      setLocation(address);
      localStorage.setItem("userLocation", address);
    }
  } catch (error) {
    console.error("Google Geocoding error:", error);
    setLocationError("Could not determine precise location. Please enter manually.");
  }
};

// Try alternative geocoding service (BigDataCloud)
const tryAlternativeGeocoding = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await response.json();
    
    if (data.locality && data.city) {
      const locationString = `${data.locality}, ${data.city}`;
      setLocation(locationString);
      localStorage.setItem("userLocation", locationString);
    } else if (data.city) {
      setLocation(data.city);
      localStorage.setItem("userLocation", data.city);
    } else {
      setLocationError("Could not determine location. Please enter manually.");
    }
  } catch (error) {
    console.error("Alternative geocoding error:", error);
    setLocationError("Location services unavailable. Please enter manually.");
  }
};

// Also update the getApproximateLocation function for better IP-based detection
// Function to get approximate location based on IP
const getApproximateLocation = async () => {
  try {
    // Try multiple IP location services for better accuracy
    const services = [
      "https://ipapi.co/json/",
      "https://ipinfo.io/json?token=YOUR_IPINFO_TOKEN", // You can get a free token from ipinfo.io
      "https://geolocation-db.com/json/"
    ];
    
    for (const service of services) {
      try {
        const response = await fetch(service);
        const data = await response.json();
        
        let locationString = "";
        
        if (data.city && data.region) {
          locationString = `${data.city}, ${data.region}`;
        } else if (data.city) {
          locationString = data.city;
        } else if (data.region) {
          locationString = data.region;
        }
        
        if (locationString) {
          setLocation(locationString);
          localStorage.setItem("userLocation", locationString);
          return;
        }
      } catch (error) {
        console.log(`Service ${service} failed:`, error);
      }
    }
    
    // Fallback if all services fail
    setLocation("Jalandhar, Punjab");
  } catch (error) {
    console.log("Could not get approximate location:", error);
    setLocation("Enter your location");
  }
};

  

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      // Save location to localStorage
      localStorage.setItem("userLocation", location.trim());
      
      if (searchTerm.trim()) {
        navigate("/restaurant-list", {
          state: {
            searchLocation: location,
            searchQuery: searchTerm,
          },
        });
      } else {
        navigate("/restaurant-list", { state: { searchLocation: location } });
      }
    } else {
      // If no location is entered, ask for location
      setShowLocationModal(true);
    }
  };

  const handleManualLocation = () => {
    setShowLocationModal(false);
  };

  return (
    <div className="min-h-screen bg-[#ff5200]">
      {/* Navigation Bar Spacer */}
      <div className="h-10"></div>

      {/* Location Detection Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiNavigation className="text-3xl text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Find restaurants near you</h3>
              <p className="text-gray-600 mb-6">
                Please enable location access to find restaurants, food, and groceries near you.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={detectCurrentLocation}
                disabled={isDetectingLocation}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDetectingLocation ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Detecting Location...
                  </>
                ) : (
                  <>
                    <FiNavigation />
                    Detect My Location
                  </>
                )}
              </button>

              <button
                onClick={handleManualLocation}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Enter Location Manually
              </button>
            </div>

            {locationError && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {locationError}
              </div>
            )}

            <p className="text-xs text-gray-500 mt-4 text-center">
              Your location helps us show you relevant restaurants and delivery options.
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Decorative Images */}
          <img
            src={leftImage}
            alt="Fresh Vegetables"
            className="absolute left-0 md:top-10 top-35 w-30 md:w-64"
          />
          <img
            src={rightImage}
            alt="Sushi"
            className="absolute right-0 md:top-10 top-35 w-30 md:w-64"
          />

          {/* Main Content */}
          <div className="text-center relative z-10">
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-4">
              Hungry?
            </h1>
            <p className="text-[22px] md:text-2xl lg:text-3xl font-semibold text-white mb-8 max-w-4xl mx-auto leading-tight">
              Order food & groceries from your favorite local spots with BiteXpress!
            </p>

            {/* Search Section */}
            <div className="max-w-4xl mx-auto mb-12">
              <form
                onSubmit={handleSearch}
                className="bg-white rounded-2xl shadow-xl p-2 flex flex-col md:flex-row gap-2"
              >
                <div className="flex-1 flex items-center bg-gray-50 rounded-xl p-3 relative">
                  <TfiLocationPin className="text-2xl text-orange-500 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your delivery location"
                    className="flex-1 bg-transparent outline-none text-lg font-medium pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={detectCurrentLocation}
                    disabled={isDetectingLocation}
                    className="absolute right-3 text-orange-500 hover:text-orange-600 disabled:opacity-50"
                    title="Detect my location"
                  >
                    {isDetectingLocation ? (
                      <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <FiNavigation />
                    )}
                  </button>
                </div>

                <div className="flex-1 flex items-center bg-gray-50 rounded-xl p-3">
                  <FiSearch className="text-xl text-gray-500 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for restaurants or items..."
                    className="flex-1 bg-transparent outline-none text-lg font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-200"
                >
                  Search
                </button>
              </form>

              {locationError && !showLocationModal && (
                <div className="mt-3 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-left">
                  {locationError}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-white">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-white">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1M+</div>
                <div className="text-white">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-white">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your existing sections... */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-4xl font-[800] text-center mb-12">
            What would you like to do today?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Food Delivery Card */}
            <div
              className="bg-white relative overflow-hidden rounded-3xl md:h-76 h-66 p-8 cursor-pointer group hover:shadow-2xl transition-all duration-300 border-2 border-orange-200"
              onClick={() => {
                if (location.trim()) {
                  localStorage.setItem("userLocation", location.trim());
                  navigate("/restaurant-list");
                } else {
                  setShowLocationModal(true);
                }
              }}
            >
              <img
                src={food}
                alt="Restaurants"
                className="absolute md:right-[-10px] right-[0px] md:top-32 top-25 md:w-45 w-45 z-0"
              />

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-3">Food Delivery</h3>
                <p className="text-gray-500 font-[600] text-[18px] mb-4">
                  From restaurants
                </p>
                <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Upto 60% OFF
                </span>
              </div>
            </div>

            {/* Instamart Card */}
            <div
              className="bg-white md:h-76 h-66 relative overflow-hidden rounded-3xl p-8 cursor-pointer group hover:shadow-2xl transition-all duration-300 border-2 border-orange-200"
              onClick={() => {
                if (location.trim()) {
                  localStorage.setItem("userLocation", location.trim());
                  navigate("/instamart");
                } else {
                  setShowLocationModal(true);
                }
              }}
            >
              {/* Background Image */}
              <img
                src={grocery}
                alt="Groceries"
                className="absolute md:right-[-40px] right-[-25px] nd:top-24 top-22 md:w-60 w-55 z-0"
              />

              {/* Content - positioned in front */}
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-3">Sajilo Mart</h3>
                <p className="text-gray-500 font-[600] text-[18px] mb-4">
                  Groceries in minutes
                </p>
                <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Upto 60% OFF
                </span>
              </div>
            </div>

            {/* Dineout Card */}
            <div
              className="bg-white md:h-76 h-66 relative overflow-hidden rounded-3xl p-8 cursor-pointer group hover:shadow-2xl transition-all duration-300 border-2 border-orange-200"
              onClick={() => {
                if (location.trim()) {
                  localStorage.setItem("userLocation", location.trim());
                  navigate("/dineout");
                } else {
                  setShowLocationModal(true);
                }
              }}
            >
               <img
                src={dineout}
                alt="Dine Out"
                className="absolute md:right-[-35px] right-[-25px] md:top-24 top-20 md:w-60 w-55 z-0"
              />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-3">Dineout</h3>
                <p className="text-gray-500 font-[600] text-[18px] mb-4">
                  Eat out & save more
                </p>
                <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Upto 50% OFF
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Options Section */}
      <FoodOptionsSection />

      <GroceriesOptions />

      <FeaturedRestaurantsSection featuredRestaurants={featuredRestaurants} />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
            Why Choose BiteXpress?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaMotorcycle className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your food delivered in 30 minutes or less
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                Contactless delivery and secure payments
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiShoppingBag className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Offers</h3>
              <p className="text-gray-600">
                Enjoy exclusive discounts and cashback offers
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;