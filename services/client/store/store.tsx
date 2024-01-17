import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userReducer/userSlice";
import adminSlice from "./reducers/adminReducer/adminSlice";

const store = configureStore({
    reducer:{
        user: userSlice,
        admin: adminSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;