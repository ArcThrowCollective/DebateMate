import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import { Debates } from '@prisma/client';
import {
  getDebates,
  createDebate,
} from '../../controllers/graphql/debateController';
import { channelType } from './channelSchema';

export const debateType = new GraphQLObjectType({
  name: 'Debate',
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

export const debateQuery = {
  debates: {
    type: new GraphQLList(debateType),
    resolve: async () => {
      return await getDebates();
    },
  },
};

export const debateMutation = {
  createDebate: {
    type: debateType,
    args: {
      topic: { type: new GraphQLNonNull(GraphQLString) },
      channelId: { type: new GraphQLNonNull(GraphQLID) },
      startTime: { type: GraphQLString },
      endTime: { type: GraphQLString },
    },
    resolve: async (
      _: unknown,
      debate: Omit<Debates, 'id' | 'createdAt' | 'updatedAt'>,
    ) => {
      return await createDebate(debate);
    },
  },
};
