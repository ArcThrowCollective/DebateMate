import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './navigation/navigationSlice';
import loaderReducer from './loader/loaderSlice';
import voteReducer from './vote/voteSlice';
import timerReducer from './timer/timerSlice';
import participantReducer from './participants/participantSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    loader: loaderReducer,
    votes: voteReducer,
    timer: timerReducer,
    participants: participantReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
