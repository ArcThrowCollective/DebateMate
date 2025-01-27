import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { userQuery, userMutation } from './userSchema';
import { channelQuery, channelMutation } from './channelSchema';
import { debateQuery, debateMutation } from './debateSchema';
import { participantQuery, participantMutation } from './participantSchema';
import { notificationQuery, notificationMutation } from './notificationSchema';
import {
  requestToSpeakQuery,
  requestToSpeakMutation,
} from './requestToSpeakSchema';
import {
  debateHistoryQuery,
  debateHistoryMutation,
} from './debateHistorySchema';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...userQuery,
    ...channelQuery,
    ...debateQuery,
    ...participantQuery,
    ...notificationQuery,
    ...requestToSpeakQuery,
    ...debateHistoryQuery,
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutation,
    ...channelMutation,
    ...debateMutation,
    ...participantMutation,
    ...notificationMutation,
    ...requestToSpeakMutation,
    ...debateHistoryMutation,
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
