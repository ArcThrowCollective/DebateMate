import { Channels } from '@prisma/client';
import prisma from '../../utils/prismaClient';

export const getChannels = async () => {
  return await prisma.channels.findMany({
    include: {
      user: true,
    },
  });
};

export const createChannel = async (channelData: {
  name: string;
  description: string;
  is_public: boolean;
  userId: string | null;
}) => {
  const newChannel = await prisma.channels.create({
    data: {
      name: channelData.name,
      description: channelData.description,
      is_public: channelData.is_public,
      userId:
        channelData.userId && channelData.userId.trim() !== ''
          ? channelData.userId
          : null,
    },
    include: {
      user: true,
    },
  });

  return newChannel;
};
