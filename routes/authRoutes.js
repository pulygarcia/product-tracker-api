import express from 'express'
import {register, verifyUser, login, user} from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

//auth routes
router.post('/register', register);
router.get('/verify/:token', verifyUser);
router.post('/login', login);

//private routes that Requires json web token to get access
router.get('/user', authMiddleware, user)

export default router