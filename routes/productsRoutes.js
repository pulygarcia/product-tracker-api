import express from 'express';
import { getAllProducts, createProduct, getProductById } from '../controllers/productsController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

export default router;