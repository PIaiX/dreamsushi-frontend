import { createAsyncThunk } from '@reduxjs/toolkit'
import { $authApi } from '../index'
import { apiRoutes } from '../../config/api'

const getCart = createAsyncThunk('cart/all', async (payloads, thunkAPI) => {
    const isAuth = thunkAPI.getState()?.auth?.isAuth

    if (isAuth) {
        const response = await $authApi.get(apiRoutes.CART_ALL)
        if (response && response.status === 200) {
            thunkAPI.dispatch(updateCart(response.data.products))
            return response.data
        }
    }
})

export { getCart }
