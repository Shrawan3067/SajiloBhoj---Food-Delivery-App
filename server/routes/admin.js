import express from 'express';
import { auth, adminAuth } from '../middleware/auth.js';
import {
  getStats,
  getAllUsers,
  getAllRestaurants,
  getAllOrders,
  updateOrderStatus,
  deleteRestaurant,
  deleteOrder,
  getAnalytics
} from '../controllers/adminController.js';

const router = express.Router();

// Admin only routes
router.get('/stats', auth, adminAuth, getStats);
router.get('/users', auth, adminAuth, getAllUsers);
router.get('/restaurants', auth, adminAuth, getAllRestaurants);
router.get('/orders', auth, adminAuth, getAllOrders);
router.get('/analytics', auth, adminAuth, getAnalytics);
router.put('/orders/:id', auth, adminAuth, updateOrderStatus);
router.delete('/restaurants/:id', auth, adminAuth, deleteRestaurant);
router.delete('/orders/:id', auth, adminAuth, deleteOrder);

export default router;
