import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoadingRefresh: true,
    isLoadingLogin: false,
    loginError: null,
    isAuth: false,
    user: {},
    pointApp: 0,
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
        pointAppUpdate: (state, action) => {
            state.pointApp = action.payload
        }
    },
})

export const { setLoadingLogin, setLoadingRefresh, setUser, setAuth, setLoginError, setPushToken, pointAppUpdate } = authSlice.actions

export default authSlice.reducer
