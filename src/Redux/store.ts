import { configureStore } from "@reduxjs/toolkit";
import refSlice from './slices'

const store = configureStore({
    reducer: {
        ref: refSlice.reducer 
    }
})

export default store;