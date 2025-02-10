import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import { Users } from '@prisma/client';
import { getUsers, createUser } from '../../controllers/graphql/userController';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    profile_image: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const userQuery = {
  users: {
    type: new GraphQLList(userType),
    resolve: async () => {
      return await getUsers();
    },
  },
};

export const userMutation = {
  createUser: {
    type: userType,
    args: {
      username: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: async (_: unknown, user: Users) => {
      return await createUser(user);
    },
  },
};
