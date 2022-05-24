import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loggedIn: false,
    userDetails: {}
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state = { loggedIn: true, userDetails: action.payload }
        },
        logOut: (state) => state =  { loggedIn: false, userDetails: {}},

        getUserDetails: (state) => state.userDetails,

        isLoggedIn: state => state.loggedIn
    }
});

const { logIn, logOut, getUserDetails, isLoggedIn } = authSlice.actions;
export default authSlice.reducer;