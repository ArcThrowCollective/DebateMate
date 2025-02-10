import express from 'express';
import { router as graphqlRoutes } from './graphql';
import { router as authRoutes } from './auth_routes';

export const index_router = express.Router();

index_router.use(graphqlRoutes);
index_router.use(authRoutes);
