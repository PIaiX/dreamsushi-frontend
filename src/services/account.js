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

const getAddresses = async (page, limit) => {
    try {
        const response = await $authApi.get(apiRoutes.ACCOUNT_ADDRESSES_GET, { params: { page, limit } })
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
        const response = await $authApi.get(apiRoutes.ACCOUNT_ADDRESS_GET, { params: { addressId } })
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const editAddress = async (payloads = {}) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_ADDRESS_EDIT, payloads)
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const deleteAddress = async (addressId) => {
    try {
        const response = await $authApi.delete(apiRoutes.ACCOUNT_ADDRESS_DELETE, { data: { addressId } })
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const createAddress = async (payloads = {}) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_ADDRESS_CREATE, payloads)
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const getOrders = async (page, limit) => {
    try {
        const response = await $authApi.get(apiRoutes.ACCOUNT_ORDERS_GET, { params: { page, limit } })
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
        const response = await $authApi.get(apiRoutes.ACCOUNT_ORDER_GET, { params: { orderId } })
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const getNotifications = async (page, limit) => {
    try {
        const response = await $authApi.get(apiRoutes.ACCOUNT_NOTIFICATIONS_GET, { params: { page, limit } })
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const deleteNotification = async (notificationId) => {
    try {
        const response = await $authApi.delete(apiRoutes.ACCOUNT_NOTIFICATION_DELETE, { data: { notificationId } })
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const createComplain = async (payloads = {}) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_COMPLAIN_CREATE, payloads)
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
    deleteNotification,
    createComplain
}
