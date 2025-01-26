import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import APIRoutes from './Routes/API.router';

// Initialize with config
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Middlewares
app.use(cors<Request>());

// Routes
app.use('/api', APIRoutes);

// Listening to server
app.listen(port || 3000, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
