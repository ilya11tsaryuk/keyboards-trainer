import { createSlice } from "@reduxjs/toolkit";

const refSlice = createSlice({
    name: 'ref',
    initialState: null, // Изначальное состояние рефа
    reducers: {
      setRef: (state, action) => {
        return action.payload; // Устанавливаем значение рефа
      },
      clearRef: (state) => {
        return null; // Очищаем значение рефа
      },
    },
  });

  export const { setRef, clearRef } = refSlice.actions; // Экспортируем созданные действия

export default refSlice; 