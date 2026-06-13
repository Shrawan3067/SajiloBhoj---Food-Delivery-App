import Order from '../models/Order.js';
import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';

export const createOrder = async (req, res) => {
  try {
    const { restaurantId, items, deliveryAddress, deliveryInstructions, paymentMethod, total, deliveryFee, tax } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const finalAmount = total + deliveryFee + tax;
    const estimatedDelivery = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

    const order = new Order({
      user: req.user._id,
      restaurant: restaurantId,
      restaurantName: restaurant.name,
      restaurantCuisine: restaurant.cuisines.join(', '),
      items,
      total,
      finalAmount,
      deliveryFee,
      tax,
      deliveryAddress,
      deliveryInstructions,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'paid',
      status: 'pending',
      estimatedDelivery,
    });

    await order.save();

    // Update user's total orders and loyalty points
    user.totalOrders += 1;
    user.loyaltyPoints += Math.floor(finalAmount / 10);
    await user.save();

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { status, sortBy } = req.query;

    let query = { user: req.user._id };

    if (status) {
      query.status = status;
    }

    let sortOption = { orderDate: -1 };
    if (sortBy === 'price_high') {
      sortOption = { finalAmount: -1 };
    } else if (sortBy === 'price_low') {
      sortOption = { finalAmount: 1 };
    } else if (sortBy === 'oldest') {
      sortOption = { orderDate: 1 };
    }

    const orders = await Order.find(query)
      .sort(sortOption)
      .populate('restaurant', 'name cuisines image rating');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant', 'name cuisines image rating deliveryTime')
      .populate('user', 'name phone');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user._id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status, deliveryPartner } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status) {
      order.status = status;
      
      if (status === 'delivered') {
        order.deliveryDate = new Date();
        order.paymentStatus = 'paid';
      } else if (status === 'on_the_way') {
        order.deliveryPartner = deliveryPartner || null;
      }
    }

    await order.save();

    res.json({
      message: 'Order status updated successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { cancellationReason } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (order.status === 'delivered' || order.status === 'on_the_way') {
      return res.status(400).json({ message: 'Cannot cancel this order' });
    }

    order.status = 'cancelled';
    order.cancellationReason = cancellationReason;
    await order.save();

    res.json({
      message: 'Order cancelled successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const rateOrder = async (req, res) => {
  try {
    const { rating, review } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (order.status !== 'delivered') {
      return res.status(400).json({ message: 'Can only rate delivered orders' });
    }

    order.rating = rating;
    order.review = review;
    await order.save();

    res.json({
      message: 'Order rated successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
