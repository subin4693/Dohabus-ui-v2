// store.js
import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // Import sessionStorage
import languageReducer from "../features/language/languageSlice";
import userReducer from "../features/Auth/userSlice";
import offerReducer from "../features/offerBanner/offerSlice";

// Configuration for redux-persist using sessionStorage
const persistConfig = {
    key: "root",
    storage: storageSession, // Use sessionStorage
};

// Create a persisted reducer for each slice
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedLanguageReducer = persistReducer(persistConfig, languageReducer);

// Configure the store with persisted reducers
export const store = configureStore({
    reducer: {
        language: persistedLanguageReducer,
        user: persistedUserReducer,
        offer: offerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

// Create the persistor for the store
export const persistor = persistStore(store);
