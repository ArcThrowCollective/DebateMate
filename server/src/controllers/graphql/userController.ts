import prisma from '../../utils/prismaClient';
import { Users } from '@prisma/client';

export const getUsers = async () => {
  return await prisma.users.findMany();
};

export const createUser = async (user: Users) => {
  return await prisma.users.create({
    data: {
      ...user,
    },
  });
};
