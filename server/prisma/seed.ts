import { Prisma } from '@prisma/client';
import { uniqueUsers } from './dataUsers';
import { allChannels } from './dataChannels';
import prisma from '../src/utils/prismaClient';
import config from '../config/env_config';

//! WARNING THE SEED DELETES ALL DATA AND REWRITES
async function main() {
  console.log('Seeding database from: ', config.APP_ENV);
  await prisma.requests_To_Speak.deleteMany();
  await prisma.debate_History.deleteMany();
  await prisma.notifications.deleteMany();
  await prisma.participants.deleteMany();
  await prisma.rooms.deleteMany();
  await prisma.channels.deleteMany();
  await prisma.users.deleteMany();

  const users = await Promise.all([
    prisma.users.create({
      data: {
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'ADMIN',
        profile_image: 'https://example.com/images/john_doe.png',
      },
    }),
    prisma.users.create({
      data: {
        username: 'jane_smith',
        email: 'jane.smith@example.com',
        password: 'securepass',
        role: 'MEMBER',
        profile_image: 'https://example.com/images/jane_smith.png',
      },
    }),
    prisma.users.create({
      data: {
        username: 'alice_wonder',
        email: 'alice.wonder@example.com',
        password: 'alicepass',
        role: 'GUEST',
        profile_image: 'https://example.com/images/alice_wonder.png',
      },
    }),
    ...uniqueUsers,
  ]);

  const newChannels = allChannels(users);

  const channels = await Promise.all([
    prisma.channels.create({
      data: {
        name: 'Technology Discussions',
        description: 'A place to discuss the latest in tech.',
        userId: users[0].id,
        is_public: true,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Book Club',
        description: 'Join us to talk about your favorite books.',
        userId: users[1].id,
        is_public: false,
      },
    }),
    ...newChannels,
  ]);

  const room = await Promise.all([
    prisma.rooms.create({
      data: {
        topic: 'Is AI a Threat to Humanity?',
        channel: {
          connect: { id: channels[0].id },
        },
        startTime: new Date('2025-01-20T10:00:00Z'),
        endTime: new Date('2025-01-20T12:00:00Z'),
        imageUrl:
          'https://www.nwpc.com/wp-content/uploads/2022/05/placeholder-image-gray-3x2-1.png',
      } as Prisma.RoomsCreateInput,
    }),
    prisma.rooms.create({
      data: {
        topic: 'The Future of Fiction: Print vs. Digital?',
        channel: {
          connect: { id: channels[1].id },
        },
        startTime: new Date('2025-01-25T15:00:00Z'),
        endTime: null,
        imageUrl:
          'https://www.nwpc.com/wp-content/uploads/2022/05/placeholder-image-gray-3x2-1.png',
      } as Prisma.RoomsCreateInput,
    }),
  ]);

  const participants = await Promise.all([
    prisma.participants.create({
      data: {
        roomId: room[0].id,
        userId: users[0].id,
        role: 'MODERATOR',
        isSpeaking: true,
      },
    }),
    prisma.participants.create({
      data: {
        roomId: room[0].id,
        userId: users[1].id,
        role: 'SPEAKER',
        isSpeaking: false,
      },
    }),
    prisma.participants.create({
      data: {
        roomId: room[1].id,
        userId: users[2].id,
        role: 'LISTENER',
        isSpeaking: false,
      },
    }),
  ]);

  await Promise.all([
    prisma.notifications.create({
      data: {
        userId: users[0].id,
        message: 'Your debate has been scheduled.',
        type: 'DEBATE',
        isRead: false,
      },
    }),
    prisma.notifications.create({
      data: {
        userId: users[1].id,
        message: 'You have been added as a speaker.',
        type: 'REQUEST',
        isRead: true,
      },
    }),
  ]);

  await Promise.all([
    prisma.debate_History.create({
      data: {
        roomId: room[0].id,
        userId: users[0].id,
        role: 'MODERATOR',
        joinedAt: new Date('2025-01-20T09:50:00Z'),
        leftAt: new Date('2025-01-20T12:00:00Z'),
      },
    }),
  ]);

  await Promise.all([
    prisma.requests_To_Speak.create({
      data: {
        roomId: room[0].id,
        participantId: participants[1].id,
        status: 'APPROVED',
        requestedAt: new Date('2025-01-20T10:30:00Z'),
        handledAt: new Date('2025-01-20T10:40:00Z'),
      },
    }),
  ]);

  console.log('---Seed finished with real data---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
