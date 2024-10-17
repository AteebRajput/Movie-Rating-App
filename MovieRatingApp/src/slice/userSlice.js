import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn : false,
    user : null,
    username : null,
    email : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin(state, action) {
            state.user = action.payload.user;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isLoggedIn = true;
            },
            userLogout(state, action) {
                state.user = null;
                state.username = null;
                
                state.email = null;
                state.isLoggedIn = false;
                }
                }
})

export const {userLogin,userLogout } = authSlice.actions
export const authReducer = authSlice.reducer