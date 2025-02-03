import { Rooms } from '@prisma/client';
import prisma from '../../utils/prismaClient';

export const getRooms = async () => {
  return await prisma.rooms.findMany({
    include: {
      channel: true,
    },
  });
};

export const createRoom = async (
  room: Omit<Rooms, 'id' | 'createdAt' | 'updatedAt'>
) => {
  return await prisma.rooms.create({
    data: {
      ...room,
    },
  });
};
