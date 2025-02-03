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
  },
});

export const roomsQuery = {
  rooms: {
    type: new GraphQLList(roomsType),
    resolve: async () => {
      return await getRooms();
    },
  },
};

export const roomsMutation = {
  createDebate: {
    type: roomsType,
    args: {
      topic: { type: new GraphQLNonNull(GraphQLString) },
      channelId: { type: new GraphQLNonNull(GraphQLID) },
      startTime: { type: GraphQLString },
      endTime: { type: GraphQLString },
    },
    resolve: async (
      _: unknown,
      room: Omit<Rooms, 'id' | 'createdAt' | 'updatedAt'>
    ) => {
      return await createRoom(room);
    },
  },
};
