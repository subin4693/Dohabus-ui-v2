import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "../features/language/languageSlice";
import userReducer from "../features/Auth/userSlice";

export const store = configureStore({
    reducer: {
        language: languageReducer,
        user: userReducer,
    },
});
