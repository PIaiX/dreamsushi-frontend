import { createSlice } from '@reduxjs/toolkit'
import { refreshAuth, login, logout, checkAuth } from '../../services/RTK/auth'

const initialState = {
    isLoadingRefresh: true,
    isLoadingLogin: false,
    loginError: null,
    isAuth: false,
    user: {},
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
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
    extraReducers: {
        // ! LOGIN
        [login.pending]: (state) => {
            state.isLoadingLogin = true
            state.loginError = null
        },
        [login.fulfilled]: (state, action) => {
            if (action?.payload?.token) {
                localStorage.setItem('token', action.payload.token)
            }
            state.isLoadingLogin = false
            state.isAuth = true
            state.user = action?.payload?.user
            state.loginError = null
        },
        [login.rejected]: (state, action) => {
            state.isLoadingLogin = false
            state.loginError = action?.payload
        },

        // ! LOGOUT
        [logout.fulfilled]: (state) => {
            localStorage.removeItem('token')
            state.isAuth = false
            state.user = {}
        },
        [logout.rejected]: (state, action) => {
            localStorage.removeItem('token')
            state.isAuth = false
            state.user = {}
        },

        // ! CHECK AUTH
        [checkAuth.pending]: (state) => {
            state.isLoadingRefresh = true
        },
        [checkAuth.fulfilled]: (state, action) => {
            state.isLoadingRefresh = false
            state.isAuth = true
            state.user = action?.payload?.user
        },
        [checkAuth.rejected]: (state) => {
            state.isLoadingRefresh = false
            state.isAuth = false
            state.user = initialState.user
        },

        // ! REFRESH AUTH
        [refreshAuth.fulfilled]: (state, action) => {
            if (action?.payload?.token) {
                localStorage.setItem('token', action.payload.token)
            }
            state.isLoadingRefresh = false
            state.isAuth = true
            state.user = action?.payload?.user
        },
        [refreshAuth.rejected]: (state, action) => {
            state.isLoadingRefresh = false
        },
    },
})

export const { setLoadingLogin, setLoadingRefresh, setUser, setAuth, setLoginError } = authSlice.actions

export default authSlice.reducer
