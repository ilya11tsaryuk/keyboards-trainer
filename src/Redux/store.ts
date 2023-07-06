import { configureStore } from "@reduxjs/toolkit";
import keyNameSlice from "./keyNameSlice";

const store = configureStore({
    reducer: {
        keyName: keyNameSlice.reducer,
    }
})

export default store;