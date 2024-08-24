import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lang: "en",
};

export const languageSlice = createSlice({
    name: "lang",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.lang = action.payload;
        },
    },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
