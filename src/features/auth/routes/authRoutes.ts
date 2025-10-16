import express from 'express'
import { loginUserController, registerUserController } from '../controllers/authController';

const authRoutes = express();

authRoutes.post('/login', loginUserController)
authRoutes.post('/register', registerUserController)

export default authRoutes