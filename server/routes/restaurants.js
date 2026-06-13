import express from 'express';
import {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantMenu,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from '../controllers/restaurantController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.get('/:id/menu', getRestaurantMenu);
router.post('/', auth, adminAuth, createRestaurant);
router.put('/:id', auth, adminAuth, updateRestaurant);
router.delete('/:id', auth, adminAuth, deleteRestaurant);

export default router;
