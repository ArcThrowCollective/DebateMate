import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from '../../graphql/schema';
import { verifyAuthToken } from '../../middleware/auth';
import { ApolloServer } from '@apollo/server';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';

export const router = express.Router();

const apolloServer = new ApolloServer({ schema });

// The server listens for real-time requests and changes database attributes
export const setupWebSocketServer = (httpServer: any) => {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  useServer({ schema }, wsServer);
  console.log('WebSocket Server for GraphQL Subscriptions is running!');
};

(async () => {
  await apolloServer.start();
  console.log('Apollo Server started successfully!');
})();

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
