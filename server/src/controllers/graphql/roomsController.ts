import { Rooms } from '@prisma/client';
import prisma from '../../utils/prismaClient';

export const getRooms = async () => {
  return await prisma.rooms.findMany({
    include: {
      channel: true,
    },
  });
};

export const createRoom = async (roomData: {
  topic: string;
  channelId?: string | null;
  description?: string | null;
}) => {
  const newRoom = await prisma.rooms.create({
    data: {
      topic: roomData.topic,
      channelId:
        roomData.channelId && roomData.channelId.trim() !== ''
          ? roomData.channelId
          : undefined,
      description: roomData.description ?? undefined,
    },
  });

  return newRoom;
};

export const getRoomById = async (id: string) => {
  return await prisma.rooms.findUnique({
    where: { id },
    include: { channel: true },
  });
};
