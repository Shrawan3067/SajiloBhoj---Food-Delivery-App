import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from './models/Restaurant.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const restaurants = [
  {
    name: 'Pizza Hut',
    cuisines: ['Pizzas'],
    rating: 4.3,
    deliveryTime: '25-30 mins',
    image: 'pizza_hut.png',
    offer: 'ITEMS AT ₹99',
    hasOffer: true,
    isVeg: false,
    priceRange: 300,
    isBestseller: true,
    popularity: 95,
    menu: [
      { id: 101, name: 'Margherita Pizza', price: 199, veg: true, bestseller: true, offer: true, rating: 4.5, description: 'Classic margherita with fresh tomatoes and basil', preparationTime: '25 min', calories: '280 cal' },
      { id: 102, name: 'Farmhouse Pizza', price: 299, veg: true, bestseller: false, offer: false, rating: 4.3, description: 'Loaded with fresh vegetables', preparationTime: '30 min', calories: '320 cal' },
      { id: 103, name: 'Pepperoni Pizza', price: 349, veg: false, bestseller: true, offer: true, rating: 4.6, description: 'Spicy pepperoni with extra cheese', preparationTime: '25 min', calories: '380 cal' },
    ],
  },
  {
    name: "Domino's Pizza",
    cuisines: ['Pizzas', 'Italian', 'Pastas', 'Desserts'],
    rating: 4.3,
    deliveryTime: '25-30 mins',
    image: 'dominos.png',
    offer: 'ITEMS AT ₹69',
    hasOffer: true,
    isVeg: true,
    priceRange: 200,
    isBestseller: true,
    popularity: 92,
    menu: [
      { id: 201, name: 'Cheese Burst Pizza', price: 249, veg: true, bestseller: true, offer: true, rating: 4.7, description: 'Cheese overflow in every bite', preparationTime: '25 min', calories: '350 cal' },
      { id: 202, name: 'Garlic Bread', price: 149, veg: true, bestseller: false, offer: false, rating: 4.2, description: 'Crispy garlic bread with herbs', preparationTime: '15 min', calories: '180 cal' },
      { id: 203, name: 'Pasta Alfredo', price: 199, veg: true, bestseller: false, offer: true, rating: 4.4, description: 'Creamy white sauce pasta', preparationTime: '20 min', calories: '290 cal' },
    ],
  },
  {
    name: 'Faasos – Wraps, Rolls & More',
    cuisines: ['Kebabs', 'Fast Food', 'Snacks'],
    rating: 4.4,
    deliveryTime: '20-25 mins',
    image: 'rolls.png',
    offer: 'ITEMS AT ₹89',
    hasOffer: true,
    isVeg: false,
    priceRange: 500,
    isBestseller: true,
    popularity: 88,
    menu: [
      { id: 301, name: 'Chicken Roll', price: 129, veg: false, bestseller: true, offer: true, rating: 4.5, description: 'Spicy chicken wrapped in paratha', preparationTime: '20 min', calories: '320 cal' },
      { id: 302, name: 'Paneer Wrap', price: 99, veg: true, bestseller: false, offer: false, rating: 4.3, description: 'Crispy paneer with veggies', preparationTime: '18 min', calories: '250 cal' },
      { id: 303, name: 'Mutton Seekh Roll', price: 179, veg: false, bestseller: true, offer: true, rating: 4.6, description: 'Juicy mutton kebabs', preparationTime: '25 min', calories: '380 cal' },
    ],
  },
  {
    name: 'Pandit Ji De Paranthe',
    cuisines: ['North Indian', 'Breakfast'],
    rating: 4.3,
    deliveryTime: '25-30 mins',
    image: 'paratha.png',
    offer: 'ITEMS AT ₹99',
    hasOffer: true,
    isVeg: true,
    priceRange: 300,
    isBestseller: false,
    popularity: 85,
    menu: [
      { id: 401, name: 'Aloo Paratha', price: 89, veg: true, bestseller: true, offer: true, rating: 4.6, description: 'Stuffed with spiced potatoes', preparationTime: '20 min', calories: '280 cal' },
      { id: 402, name: 'Paneer Paratha', price: 109, veg: true, bestseller: false, offer: false, rating: 4.4, description: 'Crispy paneer stuffed paratha', preparationTime: '22 min', calories: '320 cal' },
      { id: 403, name: 'Gobi Paratha', price: 79, veg: true, bestseller: false, offer: true, rating: 4.2, description: 'Cauliflower stuffed paratha', preparationTime: '18 min', calories: '240 cal' },
    ],
  },
  {
    name: 'Spice Garden',
    cuisines: ['North Indian', 'Mughlai'],
    rating: 4.5,
    deliveryTime: '25-30 mins',
    image: 'food.png',
    offer: '20% OFF',
    hasOffer: true,
    isVeg: false,
    priceRange: 400,
    isBestseller: true,
    popularity: 90,
    menu: [
      { id: 501, name: 'Paneer Butter Masala', price: 180, veg: true, bestseller: true, offer: true, rating: 4.5, description: 'Creamy paneer in rich tomato butter sauce', preparationTime: '25 min', calories: '320 cal' },
      { id: 502, name: 'Chicken Curry', price: 220, veg: false, bestseller: false, offer: false, rating: 4.2, description: 'Spicy chicken cooked in traditional spices', preparationTime: '30 min', calories: '280 cal' },
      { id: 503, name: 'Veg Fried Rice', price: 150, veg: true, bestseller: false, offer: false, rating: 4.0, description: 'Fresh vegetables stir-fried with basmati rice', preparationTime: '20 min', calories: '250 cal' },
      { id: 504, name: 'Mutton Biryani', price: 280, veg: false, bestseller: true, offer: true, rating: 4.8, description: 'Aromatic basmati rice with tender mutton pieces', preparationTime: '40 min', calories: '380 cal' },
    ],
  },
  {
    name: 'South Delights',
    cuisines: ['South Indian', 'Vegetarian'],
    rating: 4.3,
    deliveryTime: '20-25 mins',
    image: 'food1.png',
    offer: '15% OFF',
    hasOffer: true,
    isVeg: true,
    priceRange: 250,
    isBestseller: false,
    popularity: 82,
    menu: [
      { id: 601, name: 'Masala Dosa', price: 120, veg: true, bestseller: true, offer: false, rating: 4.6, description: 'Crispy rice crepe filled with spiced potatoes', preparationTime: '15 min', calories: '180 cal' },
      { id: 602, name: 'Idli Sambhar', price: 100, veg: true, bestseller: false, offer: true, rating: 4.3, description: 'Soft rice cakes served with lentil soup', preparationTime: '10 min', calories: '150 cal' },
      { id: 603, name: 'Uttapam', price: 110, veg: true, bestseller: false, offer: false, rating: 4.4, description: 'Thick pancake topped with vegetables', preparationTime: '18 min', calories: '200 cal' },
    ],
  },
  {
    name: 'Pizza Palace',
    cuisines: ['Italian', 'Fast Food'],
    rating: 4.6,
    deliveryTime: '30-35 mins',
    image: 'pizza_hut.png',
    offer: 'BUY 1 GET 1',
    hasOffer: true,
    isVeg: false,
    priceRange: 350,
    isBestseller: true,
    popularity: 94,
    menu: [
      { id: 701, name: 'Cheese Pizza', price: 250, veg: true, bestseller: true, offer: true, rating: 4.7, description: 'Classic pizza with mozzarella cheese and tomato sauce', preparationTime: '25 min', calories: '300 cal' },
      { id: 702, name: 'Pepperoni Pizza', price: 350, veg: false, bestseller: false, offer: false, rating: 4.4, description: 'Spicy pepperoni on cheesy pizza base', preparationTime: '25 min', calories: '350 cal' },
      { id: 703, name: 'Veggie Supreme', price: 280, veg: true, bestseller: false, offer: true, rating: 4.5, description: 'Loaded with fresh vegetables', preparationTime: '28 min', calories: '280 cal' },
    ],
  },
  {
    name: 'Biryani House',
    cuisines: ['Biryani', 'North Indian', 'Mughlai'],
    rating: 4.4,
    deliveryTime: '30-40 mins',
    image: 'food.png',
    offer: 'FREE DELIVERY',
    hasOffer: true,
    isVeg: false,
    priceRange: 450,
    isBestseller: true,
    popularity: 89,
    menu: [
      { id: 801, name: 'Chicken Biryani', price: 320, veg: false, bestseller: true, offer: true, rating: 4.7, description: 'Aromatic basmati rice with spiced chicken', preparationTime: '35 min', calories: '420 cal' },
      { id: 802, name: 'Mutton Biryani', price: 380, veg: false, bestseller: true, offer: false, rating: 4.8, description: 'Tender mutton pieces with fragrant rice', preparationTime: '40 min', calories: '450 cal' },
      { id: 803, name: 'Veg Biryani', price: 220, veg: true, bestseller: false, offer: true, rating: 4.3, description: 'Mixed vegetables in spiced rice', preparationTime: '30 min', calories: '320 cal' },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bitemitra');
    console.log('MongoDB Connected');

    // Clear existing restaurants
    await Restaurant.deleteMany();
    console.log('Cleared existing restaurants');

    // Insert restaurants
    await Restaurant.insertMany(restaurants);
    console.log('Seeded restaurants successfully');

    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@bitexpress.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new User({
        name: 'Admin User',
        email: 'admin@bitexpress.com',
        password: hashedPassword,
        role: 'admin',
      });
      await admin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
