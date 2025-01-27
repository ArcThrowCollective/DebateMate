import { Channels } from '@prisma/client';
import prisma from '../../utils/prismaClient';

export const getChannels = async () => {
  return await prisma.channels.findMany({
    include: {
      user: true,
    },
  });
};

export const createChannel = async (channel: Channels) => {
  return await prisma.channels.create({
    data: {
      ...channel,
    },
  });
};
