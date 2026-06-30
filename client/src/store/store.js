import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import perfumeReducer from "../features/perfumeSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        perfume: perfumeReducer,
        user: userReducer,
    },
});

export default store;
