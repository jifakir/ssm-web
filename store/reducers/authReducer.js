import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false,
    userDetails: {}
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.isLoggedIn = true
            state.userDetails = action.payload
        },
        logOut: (state) => {
            state.isLoggedIn  = false
            state.userDetails = {}
        },

        getUserDetails: (state) => state.userDetails,

    }
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;