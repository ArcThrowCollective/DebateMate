import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserType = 'guest' | 'member' | 'speaker' | 'moderator';

interface UserState {
  userType: UserType;
  channelId?: string;
  profileId?: string;
  avatarUrl?: string;
}

const initialState: UserState = {
  userType: 'guest',
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    guestUser: (state) => {
      state.userType = 'guest';
    },
    memberUser: (state, action: PayloadAction<string>) => {
      state.userType = 'member';
      state.channelId = action.payload;
    },
    speakingUser: (state, action: PayloadAction<string>) => {
      state.userType = 'speaker';
      state.profileId = action.payload;
    },
    moderatorUser: (state, action: PayloadAction<string>) => {
      state.userType = 'moderator';
      state.profileId = action.payload;
    },
  },
});

export const { guestUser, memberUser, speakingUser, moderatorUser } =
  UserSlice.actions;

export default UserSlice.reducer;
