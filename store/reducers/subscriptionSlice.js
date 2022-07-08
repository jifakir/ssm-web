import { createSlice } from "@reduxjs/toolkit";


const initialState = null;

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        saveSubsDetails: (state, action) => state = action.payload,
        clearSubsDetails: (state) =>    state = initialState
    }
});

export const { saveSubsDetails, clearSubsDetails } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;