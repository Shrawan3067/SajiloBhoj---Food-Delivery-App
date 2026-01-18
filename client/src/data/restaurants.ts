// TypeScript port of restaurants.js
import pizzaHutImg from "../assets/pizza_hut.png";
import dominos from "../assets/dominos.png";
import rolls from "../assets/rolls.png";
import paratha from "../assets/paratha.png";

export interface MenuItem {
  id: number;
  name: string;
  price: number;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisines: string[];
  rating: number;
  time: string;
  image: string;
  offer?: string;
  hasOffer?: boolean;
  isVeg?: boolean;
  priceRange?: number;
  menu: MenuItem[];
  isBestseller?: boolean;
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Pizza Hut",
    cuisines: ["Pizzas"],
    rating: 4.3,
    time: "25-30 mins",
    image: pizzaHutImg,
    offer: "ITEMS AT ₹99",
    hasOffer: true,
    isVeg: false,
    priceRange: 300,
    menu: [
      { id: 101, name: "Margherita Pizza", price: 199 },
      { id: 102, name: "Farmhouse Pizza", price: 299 },
    ],
  },
  {
    id: 2,
    name: "Domino's Pizza",
    cuisines: ["Pizzas", "Italian", "Pastas", "Desserts"],
    rating: 4.3,
    time: "25-30 mins",
    image: dominos,
    offer: "ITEMS AT ₹69",
    hasOffer: true,
    isVeg: true,
    priceRange: 200,
    menu: [
      { id: 201, name: "Cheese Burst Pizza", price: 249 },
      { id: 202, name: "Garlic Bread", price: 149 },
    ],
  },
  {
    id: 3,
    name: "Faasos – Wraps, Rolls & More",
    cuisines: ["Kebabs", "Fast Food", "Snacks"],
    rating: 4.4,
    time: "20-25 mins",
    image: rolls,
    offer: "ITEMS AT ₹89",
    hasOffer: true,
    isVeg: false,
    priceRange: 500,
    menu: [
      { id: 301, name: "Chicken Roll", price: 129 },
      { id: 302, name: "Paneer Wrap", price: 99 },
    ],
  },
  {
    id: 4,
    name: "Pandit Ji De Paranthe",
    cuisines: ["Pizzas"],
    rating: 4.3,
    time: "25-30 mins",
    image: paratha,
    offer: "ITEMS AT ₹99",
    hasOffer: true,
    isVeg: false,
    priceRange: 300,
    menu: [
      { id: 101, name: "Margherita Pizza", price: 199 },
      { id: 102, name: "Farmhouse Pizza", price: 299 },
    ],
  },
  {
    id: 5,
    name: "Domino's Pizza",
    cuisines: ["Pizzas", "Italian", "Pastas", "Desserts"],
    rating: 4.3,
    time: "25-30 mins",
    image: dominos,
    offer: "ITEMS AT ₹69",
    hasOffer: true,
    isVeg: true,
    priceRange: 200,
    menu: [
      { id: 201, name: "Cheese Burst Pizza", price: 249 },
      { id: 202, name: "Garlic Bread", price: 149 },
    ],
  },
  {
    id: 6,
    name: "Faasos – Wraps, Rolls & More",
    cuisines: ["Kebabs", "Fast Food", "Snacks"],
    rating: 4.4,
    time: "20-25 mins",
    image: rolls,
    offer: "ITEMS AT ₹89",
    hasOffer: true,
    isVeg: false,
    priceRange: 500,
    menu: [
      { id: 301, name: "Chicken Roll", price: 129 },
      { id: 302, name: "Paneer Wrap", price: 99 },
    ],
  },
  // ... repeat entries as in original for ids 7-16
  {
    id: 7,
    name: "Pizza Hut",
    cuisines: ["Pizzas"],
    rating: 4.3,
    time: "25-30 mins",
    image: pizzaHutImg,
    offer: "ITEMS AT ₹99",
    hasOffer: true,
    isVeg: false,
    priceRange: 300,
    menu: [
      { id: 101, name: "Margherita Pizza", price: 199 },
      { id: 102, name: "Farmhouse Pizza", price: 299 },
    ],
  },
  {
    id: 8,
    name: "Domino's Pizza",
    cuisines: ["Pizzas", "Italian", "Pastas", "Desserts"],
    rating: 4.3,
    time: "25-30 mins",
    image: dominos,
    offer: "ITEMS AT ₹69",
    hasOffer: true,
    isVeg: true,
    priceRange: 200,
    menu: [
      { id: 201, name: "Cheese Burst Pizza", price: 249 },
      { id: 202, name: "Garlic Bread", price: 149 },
    ],
  },
  {
    id: 9,
    name: "Faasos – Wraps, Rolls & More",
    cuisines: ["Kebabs", "Fast Food", "Snacks"],
    rating: 4.4,
    time: "20-25 mins",
    image: rolls,
    offer: "ITEMS AT ₹89",
    hasOffer: true,
    isVeg: false,
    priceRange: 500,
    menu: [
      { id: 301, name: "Chicken Roll", price: 129 },
      { id: 302, name: "Paneer Wrap", price: 99 },
    ],
  },
  {
    id: 10,
    name: "Pizza Hut",
    cuisines: ["Pizzas"],
    rating: 4.3,
    time: "25-30 mins",
    image: pizzaHutImg,
    offer: "ITEMS AT ₹99",
    hasOffer: true,
    isVeg: false,
    priceRange: 300,
    menu: [
      { id: 101, name: "Margherita Pizza", price: 199 },
      { id: 102, name: "Farmhouse Pizza", price: 299 },
    ],
  },
  {
    id: 11,
    name: "Domino's Pizza",
    cuisines: ["Pizzas", "Italian", "Pastas", "Desserts"],
    rating: 4.3,
    time: "25-30 mins",
    image: dominos,
    offer: "ITEMS AT ₹69",
    hasOffer: true,
    isVeg: true,
    priceRange: 200,
    menu: [
      { id: 201, name: "Cheese Burst Pizza", price: 249 },
      { id: 202, name: "Garlic Bread", price: 149 },
    ],
  },
  {
    id: 12,
    name: "Faasos – Wraps, Rolls & More",
    cuisines: ["Kebabs", "Fast Food", "Snacks"],
    rating: 4.4,
    time: "20-25 mins",
    image: rolls,
    offer: "ITEMS AT ₹89",
    hasOffer: true,
    isVeg: false,
    priceRange: 500,
    menu: [
      { id: 301, name: "Chicken Roll", price: 129 },
      { id: 302, name: "Paneer Wrap", price: 99 },
    ],
  },
  {
    id: 13,
    name: "Pizza Hut",
    cuisines: ["Pizzas"],
    rating: 4.3,
    time: "25-30 mins",
    image: pizzaHutImg,
    offer: "ITEMS AT ₹99",
    hasOffer: true,
    isVeg: false,
    priceRange: 300,
    menu: [
      { id: 101, name: "Margherita Pizza", price: 199 },
      { id: 102, name: "Farmhouse Pizza", price: 299 },
    ],
  },
  {
    id: 14,
    name: "Domino's Pizza",
    cuisines: ["Pizzas", "Italian", "Pastas", "Desserts"],
    rating: 4.3,
    time: "25-30 mins",
    image: dominos,
    offer: "ITEMS AT ₹69",
    hasOffer: true,
    isVeg: true,
    priceRange: 200,
    menu: [
      { id: 201, name: "Cheese Burst Pizza", price: 249 },
      { id: 202, name: "Garlic Bread", price: 149 },
    ],
  },
  {
    id: 15,
    name: "Faasos – Wraps, Rolls & More",
    cuisines: ["Kebabs", "Fast Food", "Snacks"],
    rating: 4.4,
    time: "20-25 mins",
    image: rolls,
    offer: "ITEMS AT ₹89",
    hasOffer: true,
    isVeg: false,
    priceRange: 500,
    menu: [
      { id: 301, name: "Chicken Roll", price: 129 },
      { id: 302, name: "Paneer Wrap", price: 99 },
    ],
  },
  {
    id: 16,
    name: "Faasos – Wraps, Rolls & More",
    cuisines: ["Kebabs", "Fast Food", "Snacks"],
    rating: 4.4,
    time: "20-25 mins",
    image: rolls,
    offer: "ITEMS AT ₹89",
    hasOffer: true,
    isVeg: false,
    priceRange: 500,
    menu: [
      { id: 301, name: "Chicken Roll", price: 129 },
      { id: 302, name: "Paneer Wrap", price: 99 },
    ],
  },
];

export default restaurants;
