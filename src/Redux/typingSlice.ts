// typingSlice.js

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cpm: 0,
  timer: "00:00",
  error: 0,
  accuracy: 100,
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    setCpm(state, action) {
      state.cpm = action.payload;
    },
    setTimer(state, action) {
      state.timer = action.payload;
    },
    setError(state, action: PayloadAction<number>) {
      state.error = action.payload;
    },
    setAccuracy(state, action) {
      state.accuracy = action.payload;
    },
  },
});

export const { setCpm, setTimer, setError, setAccuracy } = typingSlice.actions;

export default typingSlice;
