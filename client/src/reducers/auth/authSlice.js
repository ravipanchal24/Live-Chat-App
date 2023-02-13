import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
        username: '',
        room: ''
    },
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
        },
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setRoom: (state, action) => {
            state.room = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, setUsername, setRoom } = authSlice.actions;

export default authSlice.reducer;