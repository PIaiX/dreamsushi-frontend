import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoadingRefresh: true,
    isLoadingLogin: false,
    loginError: null,
    isAuth: false,
    user: {},
    pushToken: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setPushToken: (state, action) => {
            state.pushToken = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setLoadingRefresh: (state, action) => {
            state.isLoadingRefresh = action.payload
        },
        setLoadingLogin: (state, action) => {
            state.isLoadingLogin = action.payload
        },
        setLoginError: (state, action) => {
            state.loginError = action.payload
        },
    },
})

export const { setLoadingLogin, setLoadingRefresh, setUser, setAuth, setLoginError, setPushToken } = authSlice.actions

export default authSlice.reducer
