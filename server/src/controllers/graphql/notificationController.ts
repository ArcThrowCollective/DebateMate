import { Notifications } from '@prisma/client';
import prisma from '../../utils/prismaClient';

export const getNotifications = async () => {
  return await prisma.notifications.findMany();
};

export const createNotification = async (
  notification: Omit<Notifications, 'id' | 'createdAt'>,
) => {
  return await prisma.notifications.create({
    data: {
      ...notification,
    },
  });
};
