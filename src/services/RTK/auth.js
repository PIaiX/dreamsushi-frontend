import {createAsyncThunk} from '@reduxjs/toolkit'
import {$api, $authApi} from '../index'
import {apiResponseMessages, apiRoutes, BASE_URL} from '../../config/api'
import {setAlert} from '../../store/reducers/alertSlice'
import defineErrorByType from '../../helpers/defineErrorByType'

const login = createAsyncThunk('auth/login', async (payloads, thunkAPI) => {
    try {
        const response = await $authApi.post(`${BASE_URL}${apiRoutes.AUTH_LOGIN}`, payloads)

        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        thunkAPI.dispatch(
            setAlert({
                variant: 'danger',
                message: defineErrorByType(error),
            })
        )
        return thunkAPI.rejectWithValue(error.message)
    }
})

const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        const response = await $authApi.post(`${BASE_URL}${apiRoutes.AUTH_LOGOUT}`)

        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const checkAuth = createAsyncThunk('auth/check', async (_, {rejectWithValue}) => {
    try {
        const response = await $api.post(`${BASE_URL}${apiRoutes.AUTH_REFRESH}`)

        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export {login, logout, checkAuth}
