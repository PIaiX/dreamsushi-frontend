import {createAsyncThunk} from '@reduxjs/toolkit'
import {$authApi} from '../index'
import {apiResponseMessages, apiRoutes} from '../../config/api'
import {setSync, toggleProduct} from '../../store/reducers/favoriteSlice'
import {dispatchAlert, dispatchApiErrorAlert} from '../../helpers/alert'

const getFavorites = createAsyncThunk('favorite/all', async (payloads, thunkAPI) => {
    const isAuth = thunkAPI.getState()?.auth?.isAuth

    if (isAuth) {
        try {
            const response = await $authApi.get(apiRoutes.FAVORITE_ALL, {params: payloads})

            if (response && response.status === 200) {
                return response.data
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
})

const toggleFavorite = createAsyncThunk('favorite/toggle', async (payloads, thunkAPI) => {
    const isAuth = thunkAPI.getState()?.auth?.isAuth
    const favorites = thunkAPI.getState()?.favorite?.items
    const isDelete = favorites?.length && favorites.find((item) => item?.id === payloads?.product?.id)

    if (isAuth) {
        try {
            const response = await $authApi.post(apiRoutes.FAVORITE_TOGGLE, {productId: payloads?.product?.id})

            if (response && response.status === 200) {
                dispatchAlert(
                    'success',
                    !isDelete ? apiResponseMessages.FAVORITE_CREATE : apiResponseMessages.FAVORITE_DELETE
                )
                thunkAPI.dispatch(toggleProduct(payloads))
                return response.data
            }
        } catch (error) {
            dispatchApiErrorAlert(error)
            return thunkAPI.rejectWithValue(error.message)
        }
    } else {
        dispatchAlert(
            'success',
            !isDelete ? apiResponseMessages.FAVORITE_CREATE : apiResponseMessages.FAVORITE_DELETE
        )
        thunkAPI.dispatch(toggleProduct(payloads))
    }
})

const favoritesSync = createAsyncThunk('favorite/sync', async (payloads, thunkAPI) => {
    try {
        const response = await $authApi.post(apiRoutes.FAVORITE_SYNC, payloads)

        if (response && response.status === 200) {
            thunkAPI.dispatch(getFavorites())
            thunkAPI.dispatch(setSync())
            dispatchAlert('success', apiResponseMessages.FAVORITE_SYNC)
            return response.data
        }
    } catch (error) {
        dispatchApiErrorAlert(error)
        return thunkAPI.rejectWithValue(error.message)
    }
})

export {getFavorites, toggleFavorite, favoritesSync}
