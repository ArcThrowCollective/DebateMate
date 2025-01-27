import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';

export const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
