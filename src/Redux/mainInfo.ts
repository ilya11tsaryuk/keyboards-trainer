import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'dark',
  language: 'Javascript', 
  level: '1',
  globalRecord: '', 
  globalRecordID: '',
};

const mainInfoSlice = createSlice({
  name: 'mainInfo',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setLevel(state, action) {
      state.level = action.payload;
    },
    setGlobalRecord(state, action) {
      state.globalRecord = action.payload;
    },
    setGlobalRecordID(state, action) {
      state.globalRecordID = action.payload;
    },
  },
});

export const {
  setTheme,
  setLanguage,
  setLevel,
  setGlobalRecord,
  setGlobalRecordID,
} = mainInfoSlice.actions;

export default mainInfoSlice;
