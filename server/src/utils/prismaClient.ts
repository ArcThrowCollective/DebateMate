import { PrismaClient } from '@prisma/client';
import config from '../../config/env_config';

// loads the prisma client dynamically with dev or prod
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.DATABASE_URL,
    },
  },
});

export default prisma;
