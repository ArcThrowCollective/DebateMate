import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Participant } from '../../types/debate';

interface ParticipantState {
  participants: Participant[];
}

const initialState: ParticipantState = {
  participants: [],
};

const participantSlice = createSlice({
  name: 'participant',
  initialState,
  reducers: {
    setParticipantState: (
      state,
      action: PayloadAction<{ participants: Participant[] }>
    ) => {
      state.participants = action.payload.participants;
    },
  },
});

export const { setParticipantState } = participantSlice.actions;

export default participantSlice.reducer;
