import { GraphQLClient, gql } from 'graphql-request';
import { Channel } from '../types/debate';

const client = new GraphQLClient(`${import.meta.env.VITE_APP_API_URL}/api/`);

export const fetchData = async (): Promise<Channel[]> => {
  const query = gql`
    query GetPublicChannels {
      rooms {
        id
        topic
        channel {
          name
          avatarUrl
          imageUrl
        }
      }
    }
  `;
  const { channels } = await client.request<{ channels: Channel[] }>(query);
  return channels;
};
