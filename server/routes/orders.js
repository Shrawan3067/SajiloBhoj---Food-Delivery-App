import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  rateOrder,
} from '../controllers/orderController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getUserOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/status', auth, adminAuth, updateOrderStatus);
router.put('/:id/cancel', auth, cancelOrder);
router.put('/:id/rate', auth, rateOrder);

export default router;
