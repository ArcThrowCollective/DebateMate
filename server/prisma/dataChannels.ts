import { PrismaClient, Users } from '@prisma/client';
const prisma = new PrismaClient();

export const allChannels = (uniqueUsers: Users[]) => {
  return [
    prisma.channels.create({
      data: {
        name: 'Travel Enthusiasts',
        description: 'Share your travel experiences and plans.',
        userId: uniqueUsers[2].id,
        is_public: false,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Photography',
        description: 'A space for photographers to share and critique.',
        userId: uniqueUsers[3].id,
        is_public: true,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Foodies United',
        description: 'Share recipes and culinary experiences.',
        userId: uniqueUsers[4].id,
        is_public: false,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Science Explorers',
        description: 'Discuss recent discoveries and theories.',
        userId: uniqueUsers[5].id,
        is_public: true,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Fitness Goals',
        description: 'Motivation and advice for your fitness journey.',
        userId: uniqueUsers[6].id,
        is_public: true,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Coding & Programming',
        description: 'A channel for developers and coders.',
        userId: uniqueUsers[7].id,
        is_public: true,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Music Lovers',
        description: 'Talk about your favorite songs and artists.',
        userId: uniqueUsers[8].id,
        is_public: false,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Parenting Tips',
        description: 'A supportive community for parents.',
        userId: uniqueUsers[9].id,
        is_public: true,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Movie Buffs',
        description: 'Discuss the latest movies and classics.',
        userId: uniqueUsers[10].id,
        is_public: true,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Pet Lovers',
        description: 'Show off your pets and share care tips.',
        userId: uniqueUsers[11].id,
        is_public: true,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Entrepreneurship',
        description: 'Exchange ideas and tips for startups.',
        userId: uniqueUsers[12].id,
        is_public: false,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'History Geeks',
        description: 'Dive into historical discussions and events.',
        userId: uniqueUsers[13].id,
        is_public: true,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'DIY Projects',
        description: 'Share and discuss do-it-yourself projects.',
        userId: uniqueUsers[14].id,
        is_public: true,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Language Learning',
        description: 'Support and resources for language learners.',
        userId: uniqueUsers[15].id,
        is_public: true,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Art & Design',
        description: 'Showcase your artwork and get feedback.',
        userId: uniqueUsers[16].id,
        is_public: false,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Stock Market Insights',
        description: 'Discuss trading strategies and market trends.',
        userId: uniqueUsers[17].id,
        is_public: true,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Mental Health Awareness',
        description: 'Support and resources for mental health.',
        userId: uniqueUsers[18].id,
        is_public: true,
      },
    }),
    prisma.channels.create({
      data: {
        name: 'Hobby Collectors',
        description: 'Discuss and share your collections.',
        userId: uniqueUsers[19].id,
        is_public: true,
      },
    }),
  ];
};
