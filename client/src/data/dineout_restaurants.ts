export interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  totalRatings: number;
  area: string;
  distance: string;
  priceRange: number;
  diningTime: string;
  cuisines: string[];
  isTrending: boolean;
  isPureVeg?: boolean;
  isFamilyFriendly?: boolean;
  isRomantic?: boolean;
  hasOffer: boolean;
  offer?: string;
  facilities: string[];
  description?: string;
  featuredDishes?: string[];
  popularFor?: string[];
  contact?: string;
  openingHours?: string;
  popularity: number;
}

export const dineout_restaurants: Restaurant[] = [
  {
    id: 1,
    name: "The Great Kabab Factory",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
    rating: 4.5,
    totalRatings: 1250,
    area: "Connaught Place",
    distance: "1.2 km",
    priceRange: 1800,
    diningTime: "45-60 min",
    cuisines: ["North Indian", "Mughlai", "Kebabs", "Tandoor"],
    isTrending: true,
    hasOffer: true,
    offer: "30% OFF",
    facilities: ["parking", "wifi", "liveMusic", "ac", "privateDining"],
    description: "Renowned for its unlimited kebabs and authentic North Indian cuisine in a royal setting.",
    featuredDishes: ["Galouti Kebab", "Raan-E-Bahadur", "Dal Makhani"],
    popularFor: ["Business Lunch", "Family Dinner", "Date Night"],
    contact: "+91 9876543210",
    openingHours: "12:00 PM - 11:30 PM",
    popularity: 95
  },
  {
    id: 2,
    name: "Olive Bar & Kitchen",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
    rating: 4.7,
    totalRatings: 890,
    area: "Mehrauli",
    distance: "4.5 km",
    priceRange: 2500,
    diningTime: "60-75 min",
    cuisines: ["Mediterranean", "European", "Italian"],
    isTrending: false,
    hasOffer: false,
    facilities: ["rooftop", "wifi", "parking", "liveMusic", "bar"],
    description: "Iconic Mediterranean restaurant with beautiful rooftop seating and European flavors.",
    featuredDishes: ["Truffle Risotto", "Burrata Salad", "Seafood Platter"],
    popularFor: ["Romantic Dates", "Celebrations", "Sunday Brunch"],
    contact: "+91 9876543211",
    openingHours: "11:00 AM - 1:00 AM",
    popularity: 92
  },
  {
    id: 3,
    name: "Saravana Bhavan",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
    rating: 4.3,
    totalRatings: 3200,
    area: "Karol Bagh",
    distance: "2.8 km",
    priceRange: 500,
    diningTime: "30-45 min",
    cuisines: ["South Indian", "Vegetarian", "Chettinad"],
    isTrending: true,
    isPureVeg: true,
    hasOffer: true,
    offer: "20% OFF above ₹1000",
    facilities: ["parking", "ac", "takeaway", "homeDelivery"],
    description: "Famous South Indian vegetarian restaurant serving authentic dosas and traditional meals.",
    featuredDishes: ["Masala Dosa", "Pongal", "Filter Coffee", "Thali"],
    popularFor: ["Breakfast", "Quick Bites", "Family Dining"],
    contact: "+91 9876543212",
    openingHours: "7:00 AM - 11:00 PM",
    popularity: 88
  },
  {
    id: 4,
    name: "Yauatcha",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
    rating: 4.6,
    totalRatings: 1100,
    area: "DLF Cyber Hub",
    distance: "5.2 km",
    priceRange: 2200,
    diningTime: "50-65 min",
    cuisines: ["Chinese", "Cantonese", "Dim Sum", "Asian"],
    isTrending: true,
    hasOffer: true,
    offer: "Buy 1 Get 1 on Dim Sum",
    facilities: ["ac", "wifi", "bar", "privateDining", "valetParking"],
    description: "Michelin-starred dim sum teahouse offering contemporary Cantonese cuisine.",
    featuredDishes: ["Har Gau", "Char Siu Bun", "Chocolate Mousse"],
    popularFor: ["Business Meetings", "Special Occasions", "Fine Dining"],
    contact: "+91 9876543213",
    openingHours: "12:00 PM - 12:00 AM",
    popularity: 90
  },
  {
    id: 5,
    name: "Big Chill Cafe",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    rating: 4.2,
    totalRatings: 2100,
    area: "Khan Market",
    distance: "1.5 km",
    priceRange: 1200,
    diningTime: "40-55 min",
    cuisines: ["American", "Italian", "Continental", "Desserts"],
    isTrending: false,
    isFamilyFriendly: true,
    hasOffer: false,
    facilities: ["wifi", "ac", "familySection", "dessertBar"],
    description: "Retro-themed cafe famous for massive portions, cheesecakes, and comfort food.",
    featuredDishes: ["Cheesecake", "Spaghetti Carbonara", "Chicken Burger"],
    popularFor: ["Desserts", "Catch-ups", "Casual Dining"],
    contact: "+91 9876543214",
    openingHours: "11:00 AM - 11:30 PM",
    popularity: 85
  },
  {
    id: 6,
    name: "Indian Accent",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop",
    rating: 4.8,
    totalRatings: 750,
    area: "Lodhi Colony",
    distance: "3.1 km",
    priceRange: 4000,
    diningTime: "90-120 min",
    cuisines: ["Modern Indian", "Fusion", "Fine Dining"],
    isTrending: false,
    hasOffer: true,
    offer: "Complimentary Wine with Tasting Menu",
    facilities: ["valetParking", "privateDining", "wineCellar", "ac", "luxury"],
    description: "Award-winning restaurant redefining Indian cuisine with global influences.",
    featuredDishes: ["Blue Cheese Naan", "Meetha Achar Pork", "Daulat Ki Chaat"],
    popularFor: ["Anniversaries", "Business Dinners", "Special Celebrations"],
    contact: "+91 9876543215",
    openingHours: "6:30 PM - 11:00 PM",
    popularity: 96
  },
  {
    id: 7,
    name: "Dilli 32",
    image: "https://images.unsplash.com/photo-1559314809-2b99056a8c4a?w=800&auto=format&fit=crop",
    rating: 4.4,
    totalRatings: 980,
    area: "Aerocity",
    distance: "6.3 km",
    priceRange: 1600,
    diningTime: "50-65 min",
    cuisines: ["North Indian", "Street Food", "Mughlai"],
    isTrending: true,
    hasOffer: true,
    offer: "25% OFF on Lunch Buffet",
    facilities: ["buffet", "parking", "ac", "liveCooking"],
    description: "Modern take on Delhi's street food and traditional recipes.",
    featuredDishes: ["Butter Chicken", "Chaat Platter", "Rajasthani Laal Maas"],
    popularFor: ["Lunch Buffet", "Family Outings", "Food Experiments"],
    contact: "+91 9876543216",
    openingHours: "12:00 PM - 11:00 PM",
    popularity: 87
  },
  {
    id: 8,
    name: "Farzi Cafe",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop",
    rating: 4.5,
    totalRatings: 1400,
    area: "Cyber City",
    distance: "5.8 km",
    priceRange: 1800,
    diningTime: "55-70 min",
    cuisines: ["Molecular Gastronomy", "Indian Fusion", "Global"],
    isTrending: true,
    hasOffer: false,
    facilities: ["bar", "wifi", "ac", "mixology", "experimental"],
    description: "Molecular gastronomy meets Indian flavors in a vibrant, modern setting.",
    featuredDishes: ["Deconstructed Samosa", "Pani Puri Shots", "Dal Chawal Arancini"],
    popularFor: ["Innovative Food", "Instagrammable Dishes", "Night Outs"],
    contact: "+91 9876543217",
    openingHours: "12:00 PM - 1:00 AM",
    popularity: 91
  },
  {
    id: 9,
    name: "SodaBottleOpenerWala",
    image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop",
    rating: 4.3,
    totalRatings: 1900,
    area: "Khan Market",
    distance: "1.6 km",
    priceRange: 1200,
    diningTime: "40-55 min",
    cuisines: ["Parsi", "Iranian", "Street Food"],
    isTrending: false,
    isFamilyFriendly: true,
    hasOffer: true,
    offer: "Free Soda with Every Meal",
    facilities: ["vintageDecor", "ac", "outdoorSeating", "bar"],
    description: "Nostalgic Bombay Irani cafe experience with Parsi delicacies.",
    featuredDishes: ["Berry Pulao", "Mutton Dhansak", "Bun Maska", "Lagan Nu Custard"],
    popularFor: ["Breakfast", "Brunch", "Tea Time"],
    contact: "+91 9876543218",
    openingHours: "8:00 AM - 11:30 PM",
    popularity: 84
  },
  {
    id: 10,
    name: "Mamagoto",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop",
    rating: 4.2,
    totalRatings: 1600,
    area: "Hauz Khas Village",
    distance: "3.5 km",
    priceRange: 1400,
    diningTime: "45-60 min",
    cuisines: ["Pan-Asian", "Japanese", "Thai", "Chinese"],
    isTrending: true,
    hasOffer: true,
    offer: "30% OFF on Sushi",
    facilities: ["wifi", "ac", "animeDecor", "partySection"],
    description: "Funky Asian restaurant with playful decor and flavorful pan-Asian cuisine.",
    featuredDishes: ["Bao Buns", "Sushi Platter", "Thai Green Curry", "Khow Suey"],
    popularFor: ["Friends Hangout", "Casual Dates", "Asian Food Lovers"],
    contact: "+91 9876543219",
    openingHours: "12:00 PM - 11:00 PM",
    popularity: 86
  },
  {
    id: 11,
    name: "Karim's",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop",
    rating: 4.4,
    totalRatings: 2800,
    area: "Jama Masjid",
    distance: "3.2 km",
    priceRange: 800,
    diningTime: "35-50 min",
    cuisines: ["Mughlai", "Kebabs", "North Indian"],
    isTrending: false,
    hasOffer: false,
    facilities: ["heritage", "ac", "familyHall"],
    description: "Century-old legendary restaurant serving authentic Mughlai cuisine since 1913.",
    featuredDishes: ["Mutton Korma", "Badam Pasanda", "Seekh Kebab", "Roomali Roti"],
    popularFor: ["Historical Experience", "Non-Veg Feast", "Traditional Food"],
    contact: "+91 9876543220",
    openingHours: "9:00 AM - 12:30 AM",
    popularity: 89
  },
  {
    id: 12,
    name: "The Coffee Bean & Tea Leaf",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop",
    rating: 4.1,
    totalRatings: 1200,
    area: "Select Citywalk",
    distance: "2.1 km",
    priceRange: 600,
    diningTime: "20-40 min",
    cuisines: ["Cafe", "Bakery", "Desserts", "Beverages"],
    isTrending: false,
    isPureVeg: true,
    hasOffer: true,
    offer: "Buy 2 Get 1 Free on Coffee",
    facilities: ["wifi", "chargingPoints", "workFriendly", "ac"],
    description: "International coffee chain with premium brews, teas, and light bites.",
    featuredDishes: ["Ice Blended", "Chai Tea Latte", "Croissants", "Cheesecake"],
    popularFor: ["Work Meetings", "Coffee Dates", "Quick Bites"],
    contact: "+91 9876543221",
    openingHours: "7:00 AM - 11:00 PM",
    popularity: 82
  },
  {
    id: 13,
    name: "Bo Tai",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
    rating: 4.6,
    totalRatings: 680,
    area: "Mehrauli",
    distance: "4.3 km",
    priceRange: 2800,
    diningTime: "70-90 min",
    cuisines: ["Thai", "Asian", "Fine Dining"],
    isTrending: true,
    isRomantic: true,
    hasOffer: true,
    offer: "Free Cocktail with Main Course",
    facilities: ["rooftop", "bar", "ac", "romanticSetting", "valetParking"],
    description: "Luxurious rooftop Thai restaurant with panoramic views and exquisite cocktails.",
    featuredDishes: ["Tom Yum Goong", "Massaman Curry", "Mango Sticky Rice"],
    popularFor: ["Romantic Dinners", "Sunset Views", "Celebrations"],
    contact: "+91 9876543222",
    openingHours: "6:00 PM - 1:00 AM",
    popularity: 93
  },
  {
    id: 14,
    name: "Wenger's Deli",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&auto=format&fit=crop",
    rating: 4.0,
    totalRatings: 950,
    area: "Connaught Place",
    distance: "1.3 km",
    priceRange: 700,
    diningTime: "25-40 min",
    cuisines: ["Bakery", "Continental", "Snacks", "Desserts"],
    isTrending: false,
    isFamilyFriendly: true,
    hasOffer: false,
    facilities: ["takeaway", "ac", "bakeryCounter", "coffee"],
    description: "Iconic 90-year-old bakery famous for pastries, cakes, and continental snacks.",
    featuredDishes: ["Chocolate Donuts", "Chicken Patties", "Black Forest Cake", "Coffee"],
    popularFor: ["Bakery Items", "Quick Snacks", "Old-School Experience"],
    contact: "+91 9876543223",
    openingHours: "8:00 AM - 9:00 PM",
    popularity: 80
  },
  {
    id: 15,
    name: "Dum Pukht",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    rating: 4.7,
    totalRatings: 820,
    area: "ITC Maurya",
    distance: "2.5 km",
    priceRange: 3500,
    diningTime: "80-100 min",
    cuisines: ["Awadhi", "North Indian", "Fine Dining"],
    isTrending: false,
    hasOffer: true,
    offer: "Complimentary Dessert",
    facilities: ["luxury", "privateDining", "ac", "valetParking", "royalAmbience"],
    description: "Luxurious fine-dining restaurant specializing in slow-cooked Awadhi cuisine.",
    featuredDishes: ["Dum Pukht Biryani", "Kakori Kebab", "Shahi Tukda"],
    popularFor: ["Special Occasions", "Business Dinners", "Luxury Experience"],
    contact: "+91 9876543224",
    openingHours: "7:00 PM - 11:30 PM",
    popularity: 94
  },
  {
    id: 16,
    name: "Social",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
    rating: 4.3,
    totalRatings: 2400,
    area: "Hauz Khas",
    distance: "3.4 km",
    priceRange: 1300,
    diningTime: "50-65 min",
    cuisines: ["Continental", "Asian", "Finger Food", "Bar"],
    isTrending: true,
    hasOffer: true,
    offer: "Happy Hours 4-7 PM",
    facilities: ["wifi", "workSpaces", "gamingZones", "bar", "liveSports"],
    description: "Multi-concept space combining café, workspace, bar, and gaming zones.",
    featuredDishes: ["Butter Chicken Pizza", "Nachos", "Cocktails", "Truffle Fries"],
    popularFor: ["Work & Socialize", "Gaming", "Nightlife", "Friends Meetups"],
    contact: "+91 9876543225",
    openingHours: "9:00 AM - 1:00 AM",
    popularity: 88
  },
  {
    id: 17,
    name: "Nizam's Kathi Kabab",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
    rating: 4.2,
    totalRatings: 1800,
    area: "Connaught Place",
    distance: "1.4 km",
    priceRange: 400,
    diningTime: "20-35 min",
    cuisines: ["Street Food", "Mughlai", "Kebabs"],
    isTrending: false,
    hasOffer: false,
    facilities: ["quickService", "takeaway", "budgetFriendly"],
    description: "Legendary kathi roll joint that invented the Kolkata-style kathi roll.",
    featuredDishes: ["Chicken Kathi Roll", "Mutton Roll", "Paneer Roll", "Egg Roll"],
    popularFor: ["Quick Lunch", "Street Food", "Budget Eating"],
    contact: "+91 9876543226",
    openingHours: "11:00 AM - 11:00 PM",
    popularity: 83
  },
  {
    id: 18,
    name: "Tian - Asian Cuisine Studio",
    image: "https://images.unsplash.com/photo-1559314809-2b99056a8c4a?w=800&auto=format&fit=crop",
    rating: 4.7,
    totalRatings: 590,
    area: "ITC Maurya",
    distance: "2.5 km",
    priceRange: 3200,
    diningTime: "75-95 min",
    cuisines: ["Chinese", "Thai", "Japanese", "Asian"],
    isTrending: false,
    hasOffer: true,
    offer: "15% OFF on Chef's Tasting Menu",
    facilities: ["fineDining", "ac", "privateChef", "winePairing"],
    description: "Upscale Asian restaurant offering contemporary interpretations of regional dishes.",
    featuredDishes: ["Peking Duck", "Sushi & Sashimi", "Dim Sum Basket"],
    popularFor: ["Fine Dining", "Business Lunches", "Gourmet Experience"],
    contact: "+91 9876543227",
    openingHours: "12:30 PM - 2:45 PM, 7:00 PM - 11:30 PM",
    popularity: 91
  },
  {
    id: 19,
    name: "Punjabi By Nature",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop",
    rating: 4.4,
    totalRatings: 2200,
    area: "Rajouri Garden",
    distance: "4.2 km",
    priceRange: 1600,
    diningTime: "45-60 min",
    cuisines: ["North Indian", "Punjabi", "Mughlai"],
    isTrending: true,
    hasOffer: true,
    offer: "20% OFF above ₹1500",
    facilities: ["familyHall", "parking", "ac", "liveMusic"],
    description: "Vibrant restaurant serving robust Punjabi flavors in a contemporary setting.",
    featuredDishes: ["Dal Makhani", "Butter Chicken", "Paneer Tikka", "Lassi"],
    popularFor: ["Family Dinners", "Punjabi Food", "Weekend Lunches"],
    contact: "+91 9876543228",
    openingHours: "12:00 PM - 12:00 AM",
    popularity: 87
  },
  {
    id: 20,
    name: "Le Cirque",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop",
    rating: 4.8,
    totalRatings: 510,
    area: "The Leela Palace",
    distance: "3.8 km",
    priceRange: 5000,
    diningTime: "90-120 min",
    cuisines: ["French", "Italian", "European", "Fine Dining"],
    isTrending: false,
    isRomantic: true,
    hasOffer: false,
    facilities: ["luxury", "ac", "valetParking", "sommelier", "privateDining"],
    description: "Michelin-starred fine dining restaurant offering exquisite French-Italian cuisine.",
    featuredDishes: ["Foie Gras", "Black Truffle Risotto", "Grand Marnier Soufflé"],
    popularFor: ["Special Occasions", "Romantic Dinners", "Luxury Experience"],
    contact: "+91 9876543229",
    openingHours: "7:00 PM - 11:30 PM",
    popularity: 97
  }
];

// Helper functions for filtering
export const filterRestaurants = (restaurants: Restaurant[], filters: {
  cuisine?: string;
  minRating?: number;
  maxPrice?: number;
  minPrice?: number;
  hasOffers?: boolean;
  facilities?: string[];
  isPureVeg?: boolean;
  isFamilyFriendly?: boolean;
  isRomantic?: boolean;
}) => {
  return restaurants.filter(restaurant => {
    if (filters.cuisine && filters.cuisine !== 'all') {
      const hasCuisine = restaurant.cuisines.some(cuisine => 
        cuisine.toLowerCase().includes(filters.cuisine!.toLowerCase().replace('-', ' '))
      );
      if (!hasCuisine) return false;
    }

    if (filters.minRating && restaurant.rating < filters.minRating) return false;
    if (filters.maxPrice && restaurant.priceRange > filters.maxPrice) return false;
    if (filters.minPrice && restaurant.priceRange < filters.minPrice) return false;
    if (filters.hasOffers && !restaurant.hasOffer) return false;
    if (filters.isPureVeg && !restaurant.isPureVeg) return false;
    if (filters.isFamilyFriendly && !restaurant.isFamilyFriendly) return false;
    if (filters.isRomantic && !restaurant.isRomantic) return false;

    if (filters.facilities && filters.facilities.length > 0) {
      const hasAllFacilities = filters.facilities.every(facility => 
        restaurant.facilities.includes(facility)
      );
      if (!hasAllFacilities) return false;
    }

    return true;
  });
};

export const sortRestaurants = (restaurants: Restaurant[], sortBy: string) => {
  const sorted = [...restaurants];
  
  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'priceLow':
      return sorted.sort((a, b) => a.priceRange - b.priceRange);
    case 'priceHigh':
      return sorted.sort((a, b) => b.priceRange - a.priceRange);
    case 'popularity':
      return sorted.sort((a, b) => b.popularity - a.popularity);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted.sort((a, b) => b.popularity - a.popularity);
  }
};

// Get unique cuisines from all restaurants
export const getAllCuisines = (): string[] => {
  const cuisineSet = new Set<string>();
  dineout_restaurants.forEach(restaurant => {
    restaurant.cuisines.forEach(cuisine => cuisineSet.add(cuisine));
  });
  return Array.from(cuisineSet);
};

// Get restaurants by area
export const getRestaurantsByArea = (area: string): Restaurant[] => {
  return dineout_restaurants.filter(restaurant => 
    restaurant.area.toLowerCase().includes(area.toLowerCase())
  );
};

// Get trending restaurants
export const getTrendingRestaurants = (): Restaurant[] => {
  return dineout_restaurants.filter(restaurant => restaurant.isTrending);
};

// Get restaurants with offers
export const getRestaurantsWithOffers = (): Restaurant[] => {
  return dineout_restaurants.filter(restaurant => restaurant.hasOffer);
};

// Get budget restaurants (under ₹800 for two)
export const getBudgetRestaurants = (): Restaurant[] => {
  return dineout_restaurants.filter(restaurant => restaurant.priceRange < 800);
};

// Get luxury restaurants (above ₹2500 for two)
export const getLuxuryRestaurants = (): Restaurant[] => {
  return dineout_restaurants.filter(restaurant => restaurant.priceRange > 2500);
};

// Get family-friendly restaurants
export const getFamilyFriendlyRestaurants = (): Restaurant[] => {
  return dineout_restaurants.filter(restaurant => restaurant.isFamilyFriendly);
};

// Get romantic restaurants
export const getRomanticRestaurants = (): Restaurant[] => {
  return dineout_restaurants.filter(restaurant => restaurant.isRomantic);
};

// Get pure veg restaurants
export const getPureVegRestaurants = (): Restaurant[] => {
  return dineout_restaurants.filter(restaurant => restaurant.isPureVeg);
};

// Get restaurants with specific facility
export const getRestaurantsByFacility = (facility: string): Restaurant[] => {
  return dineout_restaurants.filter(restaurant => restaurant.facilities.includes(facility));
};

// Get top rated restaurants (4.5+)
export const getTopRatedRestaurants = (): Restaurant[] => {
  return dineout_restaurants.filter(restaurant => restaurant.rating >= 4.5);
};

// Search restaurants by name, cuisine, or area
export const searchRestaurants = (query: string): Restaurant[] => {
  const lowerQuery = query.toLowerCase();
  return dineout_restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(lowerQuery) ||
    restaurant.cuisines.some(cuisine => cuisine.toLowerCase().includes(lowerQuery)) ||
    restaurant.area.toLowerCase().includes(lowerQuery) ||
    restaurant.description?.toLowerCase().includes(lowerQuery) ||
    restaurant.popularFor?.some(item => item.toLowerCase().includes(lowerQuery))
  );
};

// Get statistics
export const getRestaurantStats = () => {
  return {
    total: dineout_restaurants.length,
    averageRating: (dineout_restaurants.reduce((sum, r) => sum + r.rating, 0) / dineout_restaurants.length).toFixed(1),
    averagePrice: Math.round(dineout_restaurants.reduce((sum, r) => sum + r.priceRange, 0) / dineout_restaurants.length),
    trendingCount: dineout_restaurants.filter(r => r.isTrending).length,
    offersCount: dineout_restaurants.filter(r => r.hasOffer).length,
    pureVegCount: dineout_restaurants.filter(r => r.isPureVeg).length,
    luxuryCount: dineout_restaurants.filter(r => r.priceRange > 2500).length,
    budgetCount: dineout_restaurants.filter(r => r.priceRange < 800).length
  };
};