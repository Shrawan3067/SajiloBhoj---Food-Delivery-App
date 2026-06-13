import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
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
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  restaurantName: String,
  restaurantCuisine: String,
  items: [orderItemSchema],
  total: {
    type: Number,
    required: true,
  },
  finalAmount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  deliveryFee: {
    type: Number,
    default: 30,
  },
  tax: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'on_the_way', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'cash', 'qr'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryInstructions: String,
  orderDate: {
    type: Date,
    default: Date.now,
  },
  estimatedDelivery: Date,
  deliveryDate: Date,
  deliveryPartner: {
    name: String,
    phone: String,
    rating: Number,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  review: String,
  cancellationReason: String,
}, {
  timestamps: true,
});

export default mongoose.model('Order', orderSchema);
