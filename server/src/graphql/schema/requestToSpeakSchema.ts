import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import { Requests_To_Speak } from '@prisma/client';
import {
  getRequestsToSpeak,
  createRequestToSpeak,
} from '../../controllers/graphql/requestToSpeakController';
import { debateType } from './debateSchema';
import { participantType } from './participantSchema';

export const requestToSpeakType = new GraphQLObjectType({
  name: 'RequestToSpeak',
  fields: {
    id: { type: GraphQLID },
    debate: { type: debateType },
    debateId: { type: GraphQLID },
    participant: { type: participantType },
    participantId: { type: GraphQLID },
    status: { type: GraphQLString },
    requestedAt: { type: GraphQLString },
    handledAt: { type: GraphQLString },
  },
});

export const requestToSpeakQuery = {
  requestsToSpeak: {
    type: new GraphQLList(requestToSpeakType),
    resolve: async () => {
      return await getRequestsToSpeak();
    },
  },
};

export const requestToSpeakMutation = {
  createRequestToSpeak: {
    type: requestToSpeakType,
    args: {
      debateId: { type: new GraphQLNonNull(GraphQLID) },
      participantId: { type: new GraphQLNonNull(GraphQLID) },
      status: { type: GraphQLString },
      requestedAt: { type: new GraphQLNonNull(GraphQLString) },
      handledAt: { type: GraphQLString },
    },
    resolve: async (
      _: unknown,
      requestToSpeak: Omit<Requests_To_Speak, 'id'>,
    ) => {
      return await createRequestToSpeak(requestToSpeak);
    },
  },
};
