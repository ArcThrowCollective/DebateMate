import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import { Notifications } from '@prisma/client';
import {
  getNotifications,
  createNotification,
} from '../../controllers/graphql/notificationController';
import { userType } from './userSchema';

export const notificationType = new GraphQLObjectType({
  name: 'Notification',
  fields: {
    id: { type: GraphQLID },
    user: { type: userType },
    userId: { type: GraphQLID },
    message: { type: GraphQLString },
    type: { type: GraphQLString },
    isRead: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
  },
});

export const notificationQuery = {
  notifications: {
    type: new GraphQLList(notificationType),
    resolve: async () => {
      return await getNotifications();
    },
  },
};

export const notificationMutation = {
  createNotification: {
    type: notificationType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      message: { type: new GraphQLNonNull(GraphQLString) },
      type: { type: new GraphQLNonNull(GraphQLString) },
      isRead: { type: GraphQLBoolean },
    },
    resolve: async (
      _: unknown,
      notification: Omit<Notifications, 'id' | 'createdAt'>,
    ) => {
      return await createNotification(notification);
    },
  },
};
