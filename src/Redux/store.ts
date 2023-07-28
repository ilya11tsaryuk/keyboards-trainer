import { configureStore } from "@reduxjs/toolkit";
import keyNameSlice from "./keyNameSlice";
import typingSlice from "./typingSlice";

const store = configureStore({
    reducer: {
        typing: typingSlice.reducer,
        keyName: keyNameSlice.reducer,
    }
})

export default store;