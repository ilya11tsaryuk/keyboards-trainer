import { createSlice } from '@reduxjs/toolkit';

const keyNameSlice = createSlice({
  name: 'keyName',
  initialState: '',
  reducers: {
    setKeyName: (state, action) => {
      return action.payload;
    },
    removeLetter: (state) => {
      return state.slice(0, -1);
    },
  },
});

export const { setKeyName, removeLetter } = keyNameSlice.actions;
export default keyNameSlice;
