import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import { Rooms } from '@prisma/client';
import {
  getRooms,
  createRoom,
  getRoomById,
} from '../../controllers/graphql/roomsController';
import { channelType } from './channelSchema';

export const roomsType = new GraphQLObjectType({
  name: 'Room',
  fields: {
    id: { type: GraphQLID },
    topic: { type: GraphQLString },
    channel: { type: channelType },
    channelId: { type: GraphQLID },
    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

export const roomsQuery = {
  rooms: {
    type: new GraphQLList(roomsType),
    resolve: async () => {
      return await getRooms();
    },
  },
  room: {
    type: roomsType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_: unknown, { id }: { id: string }) => {
      return await getRoomById(id);
    },
  },
};

export const roomsMutation = {
  createRoom: {
    type: roomsType,
    args: {
      topic: { type: new GraphQLNonNull(GraphQLString) },
      channelId: { type: GraphQLID },
      description: { type: GraphQLString },
    },
    resolve: async (
      _: unknown,
      args: {
        topic: string;
        channelId?: string | null;
        description?: string | null;
      }
    ) => {
      if (!args.channelId || args.channelId.trim() === '') {
        args.channelId = null;
      }

      const description = args.description ? args.description : null;

      return await createRoom({ ...args, description });
    },
  },
};
