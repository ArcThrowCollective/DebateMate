import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
// pub/sub over websockets client
const httpLink = new HttpLink({
  uri: 'http://127.0.0.1:3000/graphql',
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://127.0.0.1:3000/graphql' })
);

// Only for different operation types
/*const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);*/

export const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

export const PARTICIPANTS_UPDATED_SUBSCRIPTION = gql`
  subscription ParticipantsUpdated($roomId: ID!) {
    participantsUpdated(roomId: $roomId) {
      id
      roomId
      userId
      role
      isSpeaking
    }
  }
`;
