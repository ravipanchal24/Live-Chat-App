import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducers/chat/chatSlice'
import authReducer from './reducers/auth/authSlice'

export default configureStore({
    reducer: {
        chat: chatReducer,
        auth: authReducer  //  state named 'auth' will use authReducer for state update which was exported as default in auth slice
    },
})