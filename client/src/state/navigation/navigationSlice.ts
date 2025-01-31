import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PageType = 'home' | 'channel' | 'room' | 'profile';

interface NavigationState {
  currentPage: PageType;
  channelId?: string;
  roomId?: string;
  profileId?: string;
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
  },
});

export const {
  navigateToHome,
  navigateToChannel,
  navigateToRoom,
  navigateToProfile,
} = navigationSlice.actions;

export default navigationSlice.reducer;
