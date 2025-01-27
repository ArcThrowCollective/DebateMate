import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import { Participants } from '@prisma/client';
import {
  getParticipants,
  createParticipant,
} from '../../controllers/graphql/participantController';
import { debateType } from './debateSchema';
import { userType } from './userSchema';

export const participantType = new GraphQLObjectType({
  name: 'Participant',
  fields: {
    id: { type: GraphQLID },
    debate: { type: debateType },
    debateId: { type: GraphQLID },
    user: { type: userType },
    userId: { type: GraphQLID },
    role: { type: GraphQLString },
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
};

export const participantMutation = {
  createParticipant: {
    type: participantType,
    args: {
      debateId: { type: new GraphQLNonNull(GraphQLID) },
      userId: { type: new GraphQLNonNull(GraphQLID) },
      role: { type: GraphQLString },
      isSpeaking: { type: GraphQLBoolean },
    },
    resolve: async (
      _: unknown,
      participant: Omit<Participants, 'id' | 'joinedAt'>,
    ) => {
      return await createParticipant(participant);
    },
  },
};
