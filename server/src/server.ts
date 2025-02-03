import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import config from '../config/env_config';
import { index_router } from './routes/index_routes';
import cookieParser from 'cookie-parser';
import { setupWebSocketServer } from './routes/graphql';
import { createServer } from 'http';

const prisma = new PrismaClient();
const app = express();
const PORT: number = parseInt(config.PORT || '3000', 10);
const HOST: string = config.SERVER_HOST as string;
const httpServer = createServer(app);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    // when using cookies, credentials must be set to true, allow all * is not allowed
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true,
  })
);

// Setup the websocket server for graphql pub/sub
setupWebSocketServer(httpServer);
app.use(index_router);

(async () => {
  try {
    await prisma.$connect();
    console.log('Prisma connected successfully!');
    app.listen(PORT, HOST, function () {
      console.log(`starting server on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
