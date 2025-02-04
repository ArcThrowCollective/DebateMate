import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './navigation/navigationSlice';
import loaderReducer from './loader/loaderSlice';
import streamReducer from './stream/streamSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    loader: loaderReducer,
    stream: streamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
