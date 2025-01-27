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
    title: { type: GraphQLString },
    description: { type: GraphQLString },
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
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      is_public: { type: GraphQLBoolean },
    },
    resolve: async (_: unknown, channel: Channels) => {
      return await createChannel(channel);
    },
  },
};
