import { Requests_To_Speak } from '@prisma/client';
import prisma from '../../utils/prismaClient';

export const getRequestsToSpeak = async () => {
  return await prisma.requests_To_Speak.findMany();
};

export const createRequestToSpeak = async (
  requestToSpeak: Omit<Requests_To_Speak, 'id'>,
) => {
  return await prisma.requests_To_Speak.create({
    data: {
      ...requestToSpeak,
    },
  });
};
