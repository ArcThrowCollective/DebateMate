import { createSlice } from '@reduxjs/toolkit';

interface loaderSlice {
  value: boolean;
}

const initialState: loaderSlice = {
  value: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.value = true;
    },
    stopLoading: (state) => {
      state.value = false;
    },
  },
});

export const { startLoading, stopLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
