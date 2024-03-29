import { createAsyncThunk } from '@reduxjs/toolkit'
import { $authApi, $api } from '../'
import { apiRoutes } from '../../config/api'
import { dispatchApiErrorAlert, dispatchAlert } from '../../helpers/alert'
// import socket from '../../config/socket'
import { updateAddressesPickup } from '../../store/reducers/addressPickupSlice'
import { resetAddresses, updateAddresses } from '../../store/reducers/addressSlice'
import { setAuth, setUser } from '../../store/reducers/authSlice'
import { cartReset } from '../../store/reducers/cartSlice'
import { resetCheckout } from '../../store/reducers/checkoutSlice'
import { resetFavorite } from '../../store/reducers/favoriteSlice'
import { getFavorites } from './favorite'

const checkAuth = async () => {
    const response = await $authApi.post(apiRoutes.AUTH_CHECK)
    return response
}

const login = createAsyncThunk('auth/login', async (payloads, thunkAPI) => {
    try {
        let pushToken = thunkAPI.getState()?.auth?.pushToken
        const response = await $api.post(apiRoutes.AUTH_LOGIN, { ...payloads, pushToken })
        if (response && response.status === 200) {
            localStorage.setItem('accessToken', response.data.token)

            thunkAPI.dispatch(setUser(response.data.user))
            thunkAPI.dispatch(setAuth(true))

            checkAuth().then(({ data }) => {
                data.addresses && thunkAPI.dispatch(updateAddresses(data.addresses))
                data.addressesPickup && thunkAPI.dispatch(updateAddressesPickup(data.addressesPickup))
                thunkAPI.dispatch(getFavorites())
            })
            dispatchAlert('success', 'Вы успешно вошли в профиль')
        }
    } catch (err) {
        dispatchApiErrorAlert(err)
    }
})

const logout = createAsyncThunk('auth/logout', async (payloads, thunkAPI) => {
    let pushToken = thunkAPI.getState()?.auth?.pushToken
    thunkAPI.dispatch(setAuth(false))
    thunkAPI.dispatch(setUser(false))
    thunkAPI.dispatch(resetCheckout())
    thunkAPI.dispatch(resetAddresses())
    thunkAPI.dispatch(cartReset())
    thunkAPI.dispatch(resetFavorite())

    await $authApi
        .post(apiRoutes.AUTH_LOGOUT, { pushToken })
        .catch((err) => console.log(err))
        .finally(async () => {
            // socket.disconnect()
            localStorage.removeItem('accessToken')
            dispatchAlert('success', 'Вы успешно вышли из профиля')
        })
})

const refreshAuth = createAsyncThunk('auth/refresh', async (payloads, thunkAPI) => {
    const response = await $authApi.post(apiRoutes.AUTH_REFRESH)

    if (response && response.status === 200) {
        localStorage.setItem('accessToken', response.data.token)
        return response.data
    } else {
        thunkAPI.dispatch(setUser(false))
        thunkAPI.dispatch(setAuth(false))
        // socket.disconnect()
        localStorage.removeItem('accessToken')
    }
})

export { login, logout, checkAuth, refreshAuth }
