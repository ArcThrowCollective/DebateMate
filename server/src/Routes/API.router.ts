import express, { Request, Response } from 'express';

const APIRoutes = express.Router();

// Routes ⤵️
APIRoutes.get('/', (req: Request, res: Response) => {
  res.send('A Team');
});

export default APIRoutes;
