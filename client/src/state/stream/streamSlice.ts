import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StreamState {
  streamLeft: MediaStream;
  streamRight: MediaStream;
}

const initialState: StreamState = {
  streamLeft: new MediaStream(),
  streamRight: new MediaStream(),
};

const streamSlice = createSlice({
  name: 'stream',
  initialState,
  reducers: {
    setStreamLeft: (state, action: PayloadAction<MediaStream>) => {
      state.streamLeft = action.payload;
    },
    setStreamRight: (state, action: PayloadAction<MediaStream>) => {
      state.streamRight = action.payload;
    },
  },
});

export const { setStreamLeft, setStreamRight } = streamSlice.actions;

export default streamSlice.reducer;
