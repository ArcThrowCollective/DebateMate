import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
} from 'graphql';
import { Channels } from '@prisma/client';
import {
  getChannels,
  createChannel,
} from '../../controllers/graphql/channelController';
import { userType } from './userSchema';

export const channelType = new GraphQLObjectType({
  name: 'Channel',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    channel_image: { type: GraphQLString },
    avatarUrl: { type: GraphQLString },
    is_public: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    user: {
      type: userType,
    },
  },
});

export const channelQuery = {
  channels: {
    type: new GraphQLList(channelType),
    resolve: async () => {
      return await getChannels();
    },
  },
};

export const channelMutation = {
  createChannel: {
    type: channelType,
    args: {
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      is_public: { type: GraphQLBoolean },
      userId: { type: GraphQLString },
    },
    resolve: async (
      _: unknown,
      args: {
        name: string;
        description: string;
        is_public: boolean;
        userId: string | null;
      }
    ) => {
      if (!args.userId || args.userId.trim() === '') {
        args.userId = null;
      }
      return await createChannel(args);
    },
  },
};
