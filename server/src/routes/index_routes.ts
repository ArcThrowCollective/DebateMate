import express from 'express';
import { router as graphqlRoutes } from './graphql';

export const index_router = express.Router();

index_router.use(graphqlRoutes);
