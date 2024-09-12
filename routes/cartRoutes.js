import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from '../controllers/cartController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/cart', addToCart);
router.get('/cart',getCart);
router.put('/cart/:itemId',updateCartItem);
router.delete('/cart/:itemId',removeCartItem);

export default router;
