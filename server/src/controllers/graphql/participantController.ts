import { Participants } from '@prisma/client';
import prisma from '../../utils/prismaClient';

export const getParticipants = async () => {
  return await prisma.participants.findMany();
};

export const createParticipant = async (
  participant: Omit<Participants, 'id' | 'joinedAt'>
) => {
  return await prisma.participants.create({
    data: {
      ...participant,
    },
  });
};

export const getParticipantByUserId = async (userId: string) => {
  return await prisma.participants.findFirst({
    where: { userId },
  });
};
