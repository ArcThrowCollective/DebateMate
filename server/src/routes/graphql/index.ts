import express, { Request } from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from '../../graphql/schema';

export const router = express.Router();

router.use(
  '/api',
  createHandler({
    schema,
  })
);
