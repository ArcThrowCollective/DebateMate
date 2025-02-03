import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  authStatus,
} from '../Controllers/userController';

export const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/auth/status', authStatus);
