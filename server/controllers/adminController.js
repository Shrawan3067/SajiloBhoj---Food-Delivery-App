import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import Order from '../models/Order.js';

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRestaurants = await Restaurant.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    const orders = await Order.find({});
    const totalRevenue = orders.reduce((sum, order) => sum + (order.finalAmount || 0), 0);
    
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const deliveredOrders = await Order.countDocuments({ status: 'delivered' });
    const cancelledOrders = await Order.countDocuments({ status: 'cancelled' });
    const activeOrders = await Order.countDocuments({ status: { $in: ['preparing', 'on_the_way'] } });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = await Order.countDocuments({ createdAt: { $gte: today } });
    const todayRevenue = orders
      .filter(order => new Date(order.createdAt) >= today)
      .reduce((sum, order) => sum + (order.finalAmount || 0), 0);

    // Calculate month-over-month changes
    const lastMonthStart = new Date();
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
    lastMonthStart.setDate(1);
    lastMonthStart.setHours(0, 0, 0, 0);
    
    const lastMonthEnd = new Date();
    lastMonthEnd.setDate(0);
    lastMonthEnd.setHours(23, 59, 59, 999);

    const lastMonthUsers = await User.countDocuments({ createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } });
    const lastMonthRestaurants = await Restaurant.countDocuments({ createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } });
    const lastMonthOrders = await Order.countDocuments({ createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } });
    const lastMonthOrdersData = await Order.find({ createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } });
    const lastMonthRevenue = lastMonthOrdersData.reduce((sum, order) => sum + (order.finalAmount || 0), 0);

    const calculateChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const usersChange = calculateChange(totalUsers, lastMonthUsers);
    const restaurantsChange = calculateChange(totalRestaurants, lastMonthRestaurants);
    const ordersChange = calculateChange(totalOrders, lastMonthOrders);
    const revenueChange = calculateChange(totalRevenue, lastMonthRevenue);

    res.json({
      totalUsers,
      totalRestaurants,
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
      activeOrders,
      todayOrders,
      todayRevenue,
      usersChange,
      restaurantsChange,
      ordersChange,
      revenueChange,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('restaurant', 'name')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    // Get last 6 months revenue data
    const revenueData = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const year = currentMonth - i >= 0 ? currentYear : currentYear - 1;
      
      const startDate = new Date(year, monthIndex, 1);
      const endDate = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999);
      
      const monthOrders = await Order.find({
        createdAt: { $gte: startDate, $lte: endDate }
      });
      
      const revenue = monthOrders.reduce((sum, order) => sum + (order.finalAmount || 0), 0);
      
      revenueData.push({
        name: months[monthIndex],
        revenue
      });
    }

    // Get weekly orders data (last 7 days)
    const ordersData = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const dayOrders = await Order.countDocuments({
        createdAt: { $gte: date, $lt: nextDate }
      });
      
      ordersData.push({
        name: days[date.getDay()],
        orders: dayOrders
      });
    }

    res.json({
      revenueData,
      ordersData
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
