import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import config from '../config/env_config';
import { index_router } from './routes/index_routes';
import cookieParser from 'cookie-parser';

const prisma = new PrismaClient();

const app = express();
const PORT: number = parseInt(config.PORT || '3000', 10);
const HOST: string = config.SERVER_HOST as string;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors());
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
