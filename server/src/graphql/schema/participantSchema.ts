import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLEnumType,
} from 'graphql';
import { Participants, Role } from '@prisma/client';
import {
  getParticipants,
  createParticipant,
  getParticipantByUserId,
  getAllParticipants,
  removeParticipant,
} from '../../controllers/graphql/participantController';
import { roomsType } from './roomSchema';
import { userType } from './userSchema';
import { PubSub, PubSubEngine } from 'graphql-subscriptions';

const pubsub: PubSubEngine = new PubSub();

export const RoleEnum = new GraphQLEnumType({
  name: 'RoleEnum',
  values: {
    GUEST: { value: 'GUEST' },
    MODERATOR: { value: 'MODERATOR' },
    SPEAKER: { value: 'SPEAKER' },
    LISTENER: { value: 'LISTENER' },
    ADMIN: { value: 'ADMIN' },
    MEMBER: { value: 'MEMBER' },
  },
});

export const participantType = new GraphQLObjectType({
  name: 'Participant',
  fields: {
    id: { type: GraphQLID },
    room: { type: roomsType },
    roomId: { type: GraphQLID },
    user: { type: userType },
    userId: { type: GraphQLID },
    role: { type: RoleEnum },
    isSpeaking: { type: GraphQLBoolean },
    joinedAt: { type: GraphQLString },
  },
});

export const participantQuery = {
  participants: {
    type: new GraphQLList(participantType),
    resolve: async () => {
      return await getParticipants();
    },
  },
  participantsByRoom: {
    type: new GraphQLList(participantType),
    args: {
      roomId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_: unknown, { roomId }: { roomId: string }) => {
      return await getAllParticipants(roomId);
    },
  },
  participant: {
    type: participantType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_: unknown, { userId }: { userId: string }) => {
      return await getParticipantByUserId(userId);
    },
  },
};

export const participantMutation = {
  createParticipant: {
    type: participantType,
    args: {
      roomId: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
      role: { type: new GraphQLNonNull(RoleEnum) },
      isSpeaking: { type: GraphQLBoolean },
    },
    resolve: async (
      _: unknown,
      participant: Omit<Participants, 'id' | 'joinedAt'>
    ) => {
      return await createParticipant(participant);
    },
  },
  removeParticipant: {
    type: participantType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      roomId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (
      _: unknown,
      { userId, roomId }: { userId: string; roomId: string }
    ) => {
      const removedParticipant = await removeParticipant(userId, roomId);
      pubsub.publish(`PARTICIPANTS_UPDATED_${roomId}`, {
        participantsUpdated: { roomId, userId },
      });
      if (!removedParticipant) {
        console.log('No participants found');
      }
      return removedParticipant;
    },
  },

  joinRoom: {
    type: participantType,
    args: {
      roomId: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
      role: { type: new GraphQLNonNull(RoleEnum) },
    },
    resolve: async (
      _: unknown,
      { roomId, userId, role }: { roomId: string; userId: string; role: Role }
    ) => {
      const participant = await createParticipant({
        roomId,
        userId,
        role,
        isSpeaking: false,
      });

      pubsub.publish(`PARTICIPANTS_UPDATED_${roomId}`, {
        participantsUpdated: { roomId, userId },
      });

      return participant;
    },
  },
};

export const participantSubscription = {
  participantsUpdated: {
    type: participantType,
    args: { roomId: { type: new GraphQLNonNull(GraphQLID) } },
    subscribe: (_: any, { roomId }: { roomId: string }) =>
      pubsub.asyncIterableIterator(`PARTICIPANTS_UPDATED_${roomId}`),
  },
};
