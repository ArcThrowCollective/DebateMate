import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { userQuery, userMutation } from './userSchema';
import { channelQuery, channelMutation } from './channelSchema';
import { roomsQuery, roomsMutation } from './roomSchema';
import {
  participantQuery,
  participantMutation,
  participantSubscription,
  RoleEnum,
} from './participantSchema';
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
    ...roomsQuery,
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
    ...roomsMutation,
    ...participantMutation,
    ...notificationMutation,
    ...requestToSpeakMutation,
    ...debateHistoryMutation,
  },
});

const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...participantSubscription,
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  subscription: SubscriptionType,
  types: [RoleEnum],
});
