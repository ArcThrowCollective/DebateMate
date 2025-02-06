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

export const client = new ApolloClient({
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
  role: 'GUEST' | 'MODERATOR' | 'SPEAKER' | 'LISTENER' | 'MEMBER'
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

export const REMOVE_PARTICIPANT_MUTATION = gql`
  mutation RemoveParticipant($roomId: ID!, $userId: ID!) {
    removeParticipant(roomId: $roomId, userId: $userId) {
      id
      roomId
      userId
    }
  }
`;

export const removeParticipant = async (roomId: string, userId: string) => {
  try {
    const { data } = await client.mutate({
      mutation: REMOVE_PARTICIPANT_MUTATION,
      variables: { roomId, userId },
    });
    console.log(data);
    if (!data.removedParticipant) {
      throw Error('No participant found');
    }
    return data.removeParticipant;
  } catch (error) {
    console.error('Error removing participant:', error);
    return null;
  }
};

export const fetchParticipantsByRoomId = async (
  roomId: string
): Promise<Participant[]> => {
  const GET_PARTICIPANTS_BY_ROOM_ID = gql`
    query PublicQuery($roomId: ID!) {
      participantsByRoom(roomId: $roomId) {
        id
        roomId
        userId
        role
        isSpeaking
        joinedAt
      }
    }
  `;

  try {
    const { data } = await client.query<{ participantsByRoom: Participant[] }>({
      query: GET_PARTICIPANTS_BY_ROOM_ID,
      variables: { roomId },
      fetchPolicy: 'no-cache',
      context: {
        credentials: 'include',
      },
    });

    if (!data.participantsByRoom) {
      throw new Error(`No participants found: ${roomId}`);
    }

    return data.participantsByRoom;
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw error;
  }
};

export const CREATE_CHANNEL_MUTATION = gql`
  mutation CreateChannel(
    $name: String!
    $description: String!
    $isPublic: Boolean
    $userId: String
  ) {
    createChannel(
      name: $name
      description: $description
      is_public: $isPublic
      userId: $userId
    ) {
      id
      name
      description
      is_public
      createdAt
      user {
        id
        username
        email
      }
    }
  }
`;

export const createChannel = async (
  name: String,
  description: String,
  isPublic: boolean,
  userId?: string
) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_CHANNEL_MUTATION,
      variables: { name, description, isPublic, userId: userId || null },
    });
    return data.createChannel;
  } catch (error) {
    console.error('Channel creation failed', error);
    throw error;
  }
};

export const CREATE_ROOM_MUTATION = gql`
  mutation CreateRoom($topic: String!, $description: String, $channelId: ID) {
    createRoom(
      topic: $topic
      description: $description
      channelId: $channelId
    ) {
      id
      topic
      description
      channelId
      createdAt
      updatedAt
    }
  }
`;

export const createRoom = async (
  topic: String,
  description?: String,
  channelId?: String
) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_ROOM_MUTATION,
      variables: {
        topic,
        description: description || null,
        channelId: channelId || null,
      },
    });
    return data.createRoom;
  } catch (error) {
    console.error('Room creation failed', error);
    throw error;
  }
};
