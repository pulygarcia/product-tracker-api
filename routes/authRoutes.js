import express from 'express'
import {register, verifyUser} from '../controllers/authController.js'

const router = express.Router();

//auth routes
router.post('/register', register);
router.get('/verify/:token', verifyUser);

export default router