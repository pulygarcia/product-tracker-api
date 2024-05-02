import express from 'express'
import {register, verifyUser, login} from '../controllers/authController.js'

const router = express.Router();

//auth routes
router.post('/register', register);
router.get('/verify/:token', verifyUser);
router.post('/login', login);

export default router