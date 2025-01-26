import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Middlewares
app.use(cors<Request>());

app.get('/', (req: Request, res: Response) => {
  res.send('A Team');
});

app.listen(port || 3000, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
