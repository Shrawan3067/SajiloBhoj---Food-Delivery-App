import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  veg: {
    type: Boolean,
    default: true,
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  offer: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  description: String,
  preparationTime: String,
  calories: String,
  image: String,
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisines: [{
    type: String,
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  offer: String,
  hasOffer: {
    type: Boolean,
    default: false,
  },
  isVeg: {
    type: Boolean,
    default: false,
  },
  priceRange: {
    type: Number,
    required: true,
  },
  isBestseller: {
    type: Boolean,
    default: false,
  },
  popularity: {
    type: Number,
    default: 0,
  },
  menu: [menuItemSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  location: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Restaurant', restaurantSchema);
