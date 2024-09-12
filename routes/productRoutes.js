import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
// import auth from '../middlewares/auth.js';
// import admin from '../middlewares/admin.js';

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id',  updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
