import {createAsyncThunk} from '@reduxjs/toolkit'
import {$authApi} from '../index'
import {apiRoutes} from '../../config/api'

const getCart = createAsyncThunk('cart/all', async (payloads, thunkAPI) => {
    try {
        const response = await $authApi.get(apiRoutes.CART_ALL, {params: payloads})

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export {getCart}
