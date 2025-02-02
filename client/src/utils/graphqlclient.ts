import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client';
import { Channel, Room } from '../types/debate';

const link = createHttpLink({
  uri: `${import.meta.env.VITE_APP_API_URL}/api/`,
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export const fetchData = async (): Promise<Channel[]> => {
  const GET_PUBLIC_CHANNELS = gql`
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

  const { data } = await client.query<{ rooms: Channel[] }>({
    query: GET_PUBLIC_CHANNELS,
  });

  return data.rooms;
};

export const fetchRoomById = async (roomId: string | number): Promise<Room> => {
  const GET_ROOM_BY_ID = gql`
    query GetRoomById($roomId: ID!) {
      room(id: $roomId) {
        id
        topic
        channelId
        startTime
        endTime
        createdAt
        updatedAt
        channel {
          name
          avatarUrl
          imageUrl
        }
      }
    }
  `;

  const { data } = await client.query<{ room: Room }>({
    query: GET_ROOM_BY_ID,
    variables: { roomId: String(roomId) },
    fetchPolicy: 'no-cache',
    context: {
      credentials: 'include',
    },
  });

  if (!data.room) {
    throw new Error(`Room "${roomId}" not found`);
  }

  return data.room;
};
