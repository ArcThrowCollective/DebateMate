import { Debate_History } from '@prisma/client';
import prisma from '../../utils/prismaClient';

export const getDebateHistories = async () => {
  return await prisma.debate_History.findMany();
};

export const createDebateHistory = async (
  debateHistory: Omit<Debate_History, 'id'>,
) => {
  return await prisma.debate_History.create({
    data: {
      ...debateHistory,
    },
  });
};
