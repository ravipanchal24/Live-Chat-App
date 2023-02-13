import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        isTyping: false,
        whoIsTyping: '',
        message: '',
        messageList: [],
        userJoined: '',
        showUserJoined: false,
        userDisconnected: '',
        showUserDisconnected: false,

    },
    reducers: {
        setIsTyping: (state, action) => {
            state.isTyping = action.payload;
        },
        setWhoIsTyping: (state, action) => {
            state.whoIsTyping = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        setMessageList: (state, action) => {
            state.messageList = action.payload
        },
        setUserJoined: (state, action) => {
            state.userJoined = action.payload
        },
        setShowUserJoined: (state, action) => {
            state.showUserJoined = action.payload
        },
        setUserDisconnected: (state, action) => {
            state.userDisconnected = action.payload
        },
        setShowUserDisconnected: (state, action) => {
            state.showUserDisconnected = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { setIsTyping, setWhoIsTyping, setMessage, setMessageList, setUserJoined, setShowUserJoined, setUserDisconnected, setShowUserDisconnected } = chatSlice.actions;

export default chatSlice.reducer;