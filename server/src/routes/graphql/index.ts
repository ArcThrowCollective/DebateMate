import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from '../../graphql/schema';
import { verifyAuthToken } from '../../middleware/auth';

export const router = express.Router();

router.use(
  '/api',
  verifyAuthToken,
  createHandler({
    schema,
    context: (req: any) => ({
      // GraphQL Request type and Express not compatibel, extending it doesnt work Request & { user?: any }
      user: req.user,
    }),
  })
);
