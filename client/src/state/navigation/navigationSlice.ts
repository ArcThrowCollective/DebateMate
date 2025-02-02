import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/debate';

type PageType =
  | 'home'
  | 'channel'
  | 'room'
  | 'profile'
  | 'debatelobby'
  | 'debatescreen';

interface NavigationState {
  currentPage: PageType;
  channelId?: string;
  roomId?: string;
  profileId?: string;
  user?: User;
}

const initialState: NavigationState = {
  currentPage: 'home',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateToHome: (state) => {
      state.currentPage = 'home';
    },
    navigateToChannel: (state, action: PayloadAction<string>) => {
      state.currentPage = 'channel';
      state.channelId = action.payload;
    },
    navigateToRoom: (state, action: PayloadAction<string>) => {
      state.currentPage = 'room';
      state.roomId = action.payload;
    },
    navigateToProfile: (state, action: PayloadAction<string>) => {
      state.currentPage = 'profile';
      state.profileId = action.payload;
    },
    //! ------------------ This are Test navigations -------------------------------------------
    navigateToDebateLobby: (state) => {
      state.currentPage = 'debatelobby';
    },
    navigateToDebateScreen: (
      state,
      action: PayloadAction<{ user: User; roomId: string }>
    ) => {
      state.currentPage = 'debatescreen';
      state.roomId = action.payload.roomId;
      state.user = action.payload.user;
    },
  },
});

export const {
  navigateToHome,
  navigateToChannel,
  navigateToRoom,
  navigateToProfile,
  navigateToDebateLobby,
  navigateToDebateScreen,
} = navigationSlice.actions;

export default navigationSlice.reducer;
