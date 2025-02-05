import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  isTimeOut: boolean;
  remainingTime: number;
}

const initialState: TimerState = {
  isTimeOut: false,
  remainingTime: 55,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimerState: (state, action: PayloadAction<{ isTimeOut: boolean }>) => {
      state.isTimeOut = action.payload.isTimeOut;
    },
    setRemainingTime: (state, action: PayloadAction<number>) => {
      state.remainingTime = action.payload;
    },
  },
});

export const { setTimerState, setRemainingTime } = timerSlice.actions;

export default timerSlice.reducer;
