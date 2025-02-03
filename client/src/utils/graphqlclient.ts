import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client';
import { Channel, Participant, Room } from '../types/debate';

const link = createHttpLink({
  uri: `${import.meta.env.VITE_APP_API_URL}/api/`,
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

// Any public query bypasses auth
export const fetchData = async (): Promise<Channel[]> => {
  const GET_PUBLIC_CHANNELS = gql`
    query PublicQuery {
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
    query PublicQuery($roomId: ID!) {
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

export const fetchParticipantByUserId = async (
  userId: string
): Promise<Participant> => {
  const GET_PARTICIPANT_BY_USERID = gql`
    query GetParticipant($userId: ID!) {
      participant(userId: $userId) {
        id
        roomId
        userId
        role
        isSpeaking
        joinedAt
      }
    }
  `;

  const { data } = await client.query<{ participant: Participant }>({
    query: GET_PARTICIPANT_BY_USERID,
    variables: { userId: String(userId) },
    fetchPolicy: 'no-cache',
    context: {
      credentials: 'include',
    },
  });

  if (!data.participant) {
    throw new Error(`Participant with userId "${userId}" not found`);
  }

  return data.participant;
};

export const CREATE_PARTICIPANT_MUTATION = gql`
  mutation CreateParticipant(
    $roomId: ID!
    $userId: ID!
    $role: Role!
    $isSpeaking: Boolean!
  ) {
    createParticipant(
      roomId: $roomId
      userId: $userId
      role: $role
      isSpeaking: $isSpeaking
    ) {
      id
      roomId
      userId
      role
      isSpeaking
      joinedAt
    }
  }
`;

export const createParticipant = async (
  roomId: string,
  userId: string,
  role: 'GUEST' | 'MODERATOR' | 'SPEAKER' | 'LISTENER'
) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_PARTICIPANT_MUTATION,
      variables: { roomId, userId, role, isSpeaking: false },
    });
    return data.createParticipant;
  } catch (error) {
    console.error('Error creating participant:', error);
    throw error;
  }
};
