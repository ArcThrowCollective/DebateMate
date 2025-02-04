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

export const fetchRoomData = async (): Promise<Room[]> => {
  const GET_PUBLIC_ROOMS = gql`
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

  try {
    const { data } = await client.query<{ rooms: Room[] }>({
      query: GET_PUBLIC_ROOMS,
    });

    console.log('✅ API Response:', data); // ✅ Debug log
    return data.rooms || []; // ✅ Ensure it always returns an array
  } catch (error) {
    console.error('❌ Error fetching rooms:', error);
    return [];
  }
};

// Any public query bypasses auth
export const fetchData = async (): Promise<Channel[]> => {
  console.log('Now fetching data...');
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

  try {
    const { data } = await client.query<{ rooms: Channel[] }>({
      query: GET_PUBLIC_CHANNELS,
    });

    console.log('GraphQL Query Response:', data);
    return data.rooms;
  } catch (error) {
    console.error('Error fetching channels data:', error);
    throw error;
  }
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
    $role: RoleEnum!
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
