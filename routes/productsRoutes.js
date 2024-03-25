import express from 'express';
import { getAllProducts, createProduct } from '../controllers/productsController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);

export default router;