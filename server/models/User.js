import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'admin', 'restaurant_owner'],
    default: 'customer',
  },
  addresses: [{
    type: {
      type: String,
      enum: ['home', 'work', 'other'],
      default: 'home',
    },
    name: String,
    address: String,
    landmark: String,
    city: String,
    state: String,
    pincode: String,
    phone: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
  }],
  loyaltyPoints: {
    type: Number,
    default: 0,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
  favoriteCuisine: String,
  dietaryPreference: String,
  spiceLevel: String,
}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);
