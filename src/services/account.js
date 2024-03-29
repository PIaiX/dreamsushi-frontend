import { createAsyncThunk } from '@reduxjs/toolkit'
import { $authApi } from '.'
import { apiRoutes } from '../config/api'
import { mainAddressEdit, deleteAddressSlice } from '../store/reducers/addressSlice'

const editAccount = async (payloads) => {
    const response = await $authApi.post(apiRoutes.ACCOUNT_EDIT, payloads)
    if (response) {
        return response.data
    }
}

const getAddresses = async (page, limit) => {
    const response = await $authApi.get(apiRoutes.ACCOUNT_ADDRESSES_GET, { params: { page, limit } })
    if (response) {
        return response.data
    }
}

const getAddress = async (addressId) => {
    if (!addressId) {
        return false
    }
    const response = await $authApi.get(apiRoutes.ACCOUNT_ADDRESS_GET, { params: { addressId } })
    if (response) {
        return response.data
    }
}

const mainAddress = createAsyncThunk('address/main', async (payloads, thunkAPI) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_ADDRESS_MAIN, payloads)
        if (response) {
            thunkAPI.dispatch(mainAddressEdit(response.data.address))
            return response.data
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const editAddress = async (payloads) => {
    const response = await $authApi.post(apiRoutes.ACCOUNT_ADDRESS_EDIT, payloads)
    return response
}
const deleteAddress = createAsyncThunk('address/delete', async (addressId, thunkAPI) => {
    try {
        const response = await $authApi.delete(apiRoutes.ACCOUNT_ADDRESS_DELETE, { data: { addressId } })
        if (response) {
            thunkAPI.dispatch(deleteAddressSlice(addressId))
            return response.data
        }
    } catch (err) { }
})

const createAddress = async (payloads) => {
    const response = await $authApi.post(apiRoutes.ACCOUNT_ADDRESS_CREATE, payloads)
    return response
}

const getOrders = async (page, limit) => {
    const response = await $authApi.get(apiRoutes.ACCOUNT_ORDERS_GET, { params: { page, limit } })
    if (response) {
        return response.data
    }
}

const getOrder = async (orderId) => {
    if (!orderId) {
        return false
    }
    const response = await $authApi.get(apiRoutes.ACCOUNT_ORDER_GET, { params: { orderId } })
    if (response) {
        return response.data
    }
}

const getNotifications = async (page, limit) => {
    const response = await $authApi.get(apiRoutes.ACCOUNT_NOTIFICATIONS_GET, { params: { page, limit } })
    if (response) {
        return response.data
    }
}

const deleteNotification = async (notificationId) => {
    const response = await $authApi.delete(apiRoutes.ACCOUNT_NOTIFICATION_DELETE, { data: { notificationId } })
    if (response) {
        return response.data
    }
}

const deleteAccount = async (data) => {
    const response = await $authApi.post(apiRoutes.ACCOUNT_DELETE, data)
    if (response) {
        return response.data
    }
}

const savePushToken = async (token) => {
    const response = await $authApi.post(apiRoutes.ACCOUNT_SAVE_PUSHTOKEN, { token })
    if (response) {
        return response.data
    }
}

const createComplain = async (payloads = {}) => {
    const response = await $authApi.post(apiRoutes.ACCOUNT_COMPLAIN_CREATE, payloads)
    if (response) {
        return response.data
    }
}
export {
    savePushToken,
    editAccount,
    getAddresses,
    getAddress,
    editAddress,
    mainAddress,
    createAddress,
    getOrders,
    getOrder,
    getNotifications,
    deleteAddress,
    deleteNotification,
    deleteAccount,
    createComplain,
}
