import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {$api, $authApi} from '../../services'
import {apiRoutes, BASE_URL} from '../../config/api'

export const login = createAsyncThunk('auth/login', async (payloads, {rejectWithValue}) => {
    try {
        const response = await $authApi.post(`${BASE_URL}${apiRoutes.AUTH_LOGIN}`, payloads)

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error('Login error')
        }
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const logout = createAsyncThunk('auth/logout', async (_, {rejectWithValue}) => {
    try {
        const response = await $authApi.post(`${BASE_URL}${apiRoutes.AUTH_LOGOUT}`)

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error('Login error')
        }
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const checkAuth = createAsyncThunk('auth/check', async (_, {rejectWithValue}) => {
    try {
        const response = await $api.post(`${BASE_URL}${apiRoutes.AUTH_REFRESH}`)

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error('Refresh error')
        }
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const initialState = {
    isLoadingRefresh: true,
    isLoadingLogin: false,
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
    },
    extraReducers: {
        // ! LOGIN
        [login.pending]: (state) => {
            state.isLoadingLogin = true
        },
        [login.fulfilled]: (state, action) => {
            localStorage.setItem('token', action?.payload?.token)
            state.isLoadingLogin = false
            state.isAuth = true
            state.user = action?.payload?.user
        },
        [login.rejected]: (state, action) => {
            state.isLoadingLogin = false
            console.log('Login rejected', action.payload)
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
            console.log('Logout rejected', action.payload)
        },

        // ! CHECK AUTH
        [checkAuth.pending]: (state) => {
            state.isLoadingRefresh = true
        },
        [checkAuth.fulfilled]: (state, action) => {
            localStorage.setItem('token', action?.payload?.token)
            state.isLoadingRefresh = false
            state.isAuth = true
            state.user = action?.payload?.user
        },
        [checkAuth.rejected]: (state, action) => {
            state.isLoadingRefresh = false
            console.log('Refresh rejected', action.payload)
        },
    },
})

export const {setLoadingLogin, setLoadingRefresh, setUser, setAuth} = authSlice.actions

export default authSlice.reducer
