import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
};

export const offerSlice = createSlice({
    name: "offer",
    initialState,
    reducers: {
        setOffer: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const { setOffer } = offerSlice.actions;

export default offerSlice.reducer;
