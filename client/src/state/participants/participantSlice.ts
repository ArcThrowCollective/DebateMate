import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Participant } from '../../types/debate';
import { RootState } from '../store';

interface ParticipantState {
  participants: Participant[];
  participantCount: number;
}

const initialState: ParticipantState = {
  participants: [],
  participantCount: 0,
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
    setParticipantCount: (state, action: PayloadAction<number>) => {
      state.participantCount = action.payload;
    },
  },
});

export const selectParticipantCount = (state: RootState) =>
  state.participants.participantCount;

export const { setParticipantState, setParticipantCount } =
  participantSlice.actions;

export default participantSlice.reducer;
