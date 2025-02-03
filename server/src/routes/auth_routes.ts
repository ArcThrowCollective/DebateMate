import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  authStatus,
} from '../controllers/userController';

export const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/auth/status', authStatus);
