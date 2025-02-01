export enum Role {
  GUEST = 'GUEST',
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  LISTENER = 'LISTENER',
  SPEAKER = 'SPEAKER',
  MODERATOR = 'MODERATOR',
}

export enum NotificationType {
  SYSTEM = 'SYSTEM',
  REQUEST = 'REQUEST',
  DEBATE = 'DEBATE',
  CUSTOM = 'CUSTOM',
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  profile_image?: string;
  createdAt: Date;
  updatedAt: Date;
  channels?: Channel | null;
  history?: DebateHistory[];
  notifications?: Notification[];
  participants?: Participant[];
}

export interface Channel {
  id: string;
  description: string;
  userId?: string | null;
  is_public: boolean;
  channel_image?: string;
  createdAt: Date;
  updatedAt: Date;
  avatarUrl?: string;
  name: string;
  user?: User | null;
  rooms?: Room[];
}

export interface Room {
  id: string;
  topic: string;
  channelId: string;
  startTime: Date;
  endTime?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  history?: DebateHistory[];
  participants?: Participant[];
  request?: RequestsToSpeak[];
  channel: Channel;
}

export interface Participant {
  id: string;
  userId: string;
  role: Role;
  isSpeaking: boolean;
  joinedAt: Date;
  roomId: string;
  room: Room;
  user: User;
  request?: RequestsToSpeak[];
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
  user: User;
}

export interface DebateHistory {
  id: string;
  userId: string;
  role: Role;
  joinedAt: Date;
  leftAt: Date;
  roomId: string;
  room: Room;
  user: User;
}

export interface RequestsToSpeak {
  id: string;
  participantId: string;
  status: RequestStatus;
  requestedAt: Date;
  handledAt?: Date | null;
  roomId: string;
  participant: Participant;
  room: Room;
}
