import { configureStore } from "@reduxjs/toolkit";
import keyNameSlice from "./keyNameSlice";
import typingSlice from "./typingSlice";
import mainInfoSlice from "./mainInfo";

const store = configureStore({
    reducer: {
        typing: typingSlice.reducer,
        keyName: keyNameSlice.reducer,
        mainInfo: mainInfoSlice.reducer,
    }
})

export default store;