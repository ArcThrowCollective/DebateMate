import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import { Debate_History } from '@prisma/client';
import {
  getDebateHistories,
  createDebateHistory,
} from '../../controllers/graphql/debateHistoryController';
import { debateType } from './debateSchema';
import { userType } from './userSchema';

export const debateHistoryType = new GraphQLObjectType({
  name: 'DebateHistory',
  fields: {
    id: { type: GraphQLID },
    debate: { type: debateType },
    debateId: { type: GraphQLID },
    user: { type: userType },
    userId: { type: GraphQLID },
    role: { type: GraphQLString },
    joinedAt: { type: GraphQLString },
    leftAt: { type: GraphQLString },
  },
});

export const debateHistoryQuery = {
  debateHistories: {
    type: new GraphQLList(debateHistoryType),
    resolve: async () => {
      return await getDebateHistories();
    },
  },
};

export const debateHistoryMutation = {
  createDebateHistory: {
    type: debateHistoryType,
    args: {
      debateId: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
      role: { type: GraphQLString },
      joinedAt: { type: new GraphQLNonNull(GraphQLString) },
      leftAt: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_: unknown, debateHistory: Omit<Debate_History, 'id'>) => {
      return await createDebateHistory(debateHistory);
    },
  },
};
