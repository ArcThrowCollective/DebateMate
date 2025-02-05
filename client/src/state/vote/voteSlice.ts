import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const voteSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {
    updateVotes: (state, action) => {
      const { speakerId, votes } = action.payload;
      state[speakerId] = votes;
    },
  },
});

export const { updateVotes } = voteSlice.actions;
export default voteSlice.reducer;
