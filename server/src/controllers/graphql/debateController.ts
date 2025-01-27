import { Debates } from '@prisma/client';
import prisma from '../../utils/prismaClient';

export const getDebates = async () => {
  return await prisma.debates.findMany();
};

export const createDebate = async (
  debate: Omit<Debates, 'id' | 'createdAt' | 'updatedAt'>,
) => {
  return await prisma.debates.create({
    data: {
      ...debate,
    },
  });
};
