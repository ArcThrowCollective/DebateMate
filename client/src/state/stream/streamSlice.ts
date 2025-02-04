import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StreamState {
  remoteStreamLeft: MediaStream;
  remoteStreamRight: MediaStream;
}

const initialState: StreamState = {
  remoteStreamLeft: new MediaStream(),
  remoteStreamRight: new MediaStream(),
};

const streamSlice = createSlice({
  name: 'stream',
  initialState,
  reducers: {
    setRemoteStreamLeft: (state, action: PayloadAction<MediaStream>) => {
      state.remoteStreamLeft = action.payload;
    },
    setRemoteStreamRight: (state, action: PayloadAction<MediaStream>) => {
      state.remoteStreamRight = action.payload;
    },
  },
});

export const { setRemoteStreamLeft, setRemoteStreamRight } =
  streamSlice.actions;

export default streamSlice.reducer;
