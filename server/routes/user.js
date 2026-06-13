import express from 'express';
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  getAllUsers,
} from '../controllers/userController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/addresses', auth, getAddresses);
router.post('/addresses', auth, addAddress);
router.put('/addresses/:addressId', auth, updateAddress);
router.delete('/addresses/:addressId', auth, deleteAddress);
router.put('/addresses/:addressId/default', auth, setDefaultAddress);
router.get('/all', auth, adminAuth, getAllUsers);

export default router;
