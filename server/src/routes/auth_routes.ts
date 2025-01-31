import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';

export const router = express.Router();

router.post('/form/signup', registerUser);
router.post('/form/login', loginUser);
