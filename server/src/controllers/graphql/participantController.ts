import { Participants } from '@prisma/client';
import prisma from '../../utils/prismaClient';

export const getParticipants = async () => {
  return await prisma.participants.findMany();
};

export const getAllParticipants = async (roomId: string) => {
  return await prisma.participants.findMany({
    where: { roomId },
  });
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

export const removeParticipant = async (
  userId: string,
  roomId: string
): Promise<Participants | null> => {
  try {
    const participant = await prisma.participants.findFirst({
      where: { userId, roomId },
    });

    if (!participant) {
      throw new Error('Participant not found');
    }

    await prisma.participants.delete({
      where: { id: participant.id },
    });

    return participant;
  } catch (error) {
    console.error('Error removing participant:', error);
    return null;
  }
};

export const getParticipantByUserId = async (userId: string) => {
  return await prisma.participants.findFirst({
    where: { userId },
  });
};
