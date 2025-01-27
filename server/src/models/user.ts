import { Users } from '@prisma/client';
import prisma from '../utils/prismaClient';
import { Prisma } from '@prisma/client';
import config from '../../config/env_config';
import { hashSync, compareSync } from 'bcrypt';

const pepper = config.BCRYPT_PEPPER || 'unsafepepper';
const saltRounds = config.SALT_ROUNDS || '10';

export class UserStore {
  async create(userData: Prisma.UsersCreateInput): Promise<Users> {
    try {
      const hash = hashSync(userData.password + pepper, parseInt(saltRounds));

      const newUser = await prisma.users.create({
        data: {
          email: userData.email,
          username: userData.username,
          password: hash,
          role: userData.role,
          profile_image: userData.profile_image,
        },
      });

      return newUser;
    } catch (error) {
      console.error('Error register user:', error);
      throw error;
    }
  }

  async authenticate(email: string, password: string): Promise<Users | null> {
    try {
      const user = await prisma.users.findUnique({
        where: { email },
      });

      if (!user) {
        return null;
      }

      const isValidPassword = compareSync(password + pepper, user.password);

      if (isValidPassword) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw new Error(`Authentication failed: ${error}`);
    }
  }
}
