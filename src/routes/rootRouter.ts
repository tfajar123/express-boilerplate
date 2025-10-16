import express, { Router } from 'express'
import authRoutes from '../features/auth/routes/authRoutes';
import postRoutes from '../features/core/post/routes/postRoutes';



const rootRouter: Router = express();

rootRouter.use('/api/auth', authRoutes);
rootRouter.use('/api/posts', postRoutes);

export default rootRouter