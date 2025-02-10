import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const uniqueUsers = [
  prisma.users.create({
    data: {
      username: 'user_gaming',
      email: 'gaming@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_gaming.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_health',
      email: 'health@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_health.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_travel',
      email: 'travel@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_travel.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_photography',
      email: 'photography@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_photography.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_foodies',
      email: 'foodies@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_foodies.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_science',
      email: 'science@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_science.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_fitness',
      email: 'fitness@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_fitness.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_coding',
      email: 'coding@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_coding.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_music',
      email: 'music@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_music.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_parenting',
      email: 'parenting@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_parenting.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_movies',
      email: 'movies@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_movies.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_pets',
      email: 'pets@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_pets.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_entrepreneurship',
      email: 'entrepreneurship@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_entrepreneurship.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_history',
      email: 'history@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_history.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_diy',
      email: 'diy@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_diy.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_language',
      email: 'language@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_language.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_art',
      email: 'art@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_art.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_stocks',
      email: 'stocks@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_stocks.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_mentalhealth',
      email: 'mentalhealth@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_mentalhealth.png',
    },
  }),
  prisma.users.create({
    data: {
      username: 'user_hobbies',
      email: 'hobbies@example.com',
      password: 'pass123',
      role: 'MEMBER',
      profile_image: 'https://example.com/images/user_hobbies.png',
    },
  }),
];
