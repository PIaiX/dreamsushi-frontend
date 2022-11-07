import { $authApi } from '.'
import { apiRoutes } from '../config/api'

const editAccount = async (payloads = {}) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_EDIT, payloads)
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const getAddresses = async () => {
    try {
        const response = await $authApi.get(apiRoutes.ACCOUNT_GET_ADDRESSES)
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const getAddress = async (addressId) => {
    try {
        if (!addressId) {
            return false
        }
        const response = await $authApi.get(apiRoutes.ACCOUNT_GET_ADDRESS, { params: { addressId } })
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const editAddress = async (payloads = {}) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_EDIT_ADDRESS, payloads)
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const deleteAddress = async (addressId) => {
    try {
        const response = await $authApi.delete(apiRoutes.ACCOUNT_DELETE_ADDRESS, { data: { addressId } })
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const createAddress = async (payloads = {}) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_CREATE_ADDRESS, payloads)
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const getOrders = async (page) => {
    try {
        const response = await $authApi.get(apiRoutes.ACCOUNT_GET_ORDERS, { params: { page } })
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const getOrder = async (orderId) => {
    try {
        if (!orderId) {
            return false
        }
        const response = await $authApi.get(apiRoutes.ACCOUNT_GET_ORDER, { params: { orderId } })
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const getNotifications = async () => {
    try {
        const response = await $authApi.get(apiRoutes.ACCOUNT_GET_NOTIFICATIONS)
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const deleteNotification = async (notificationId) => {
    try {
        const response = await $authApi.delete(apiRoutes.ACCOUNT_DELETE_NOTIFICATION, { data: { notificationId } })
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

export {
    editAccount,
    getAddresses,
    getAddress,
    editAddress,
    createAddress,
    getOrders,
    getOrder,
    getNotifications,
    deleteAddress,
    deleteNotification
}
