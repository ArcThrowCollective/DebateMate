import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loader/loaderSlice';

export const store = configureStore({
  reducer: {
    // Each slice in the reducer is responsible for its own state.
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
