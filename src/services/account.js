import { $authApi } from '.'
import { apiRoutes } from '../config/api'

const editAccount = async (payloads = {}) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_EDIT, payloads)
        if (response) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const getAddresses = async () => {
    try {
        const response = await $authApi.get(apiRoutes.ACCOUNT_GET_ADDRESSES)
        if (response) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const getAddress = async (id) => {
    try {
        if (!id) {
            return false
        }
        const response = await $authApi.get(apiRoutes.ACCOUNT_GET_ADDRESS + id)
        if (response) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const editAddress = async (payloads = {}) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_EDIT_ADDRESS, payloads)
        if (response) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const createAddress = async (payloads = {}) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_CREATE_ADDRESS, payloads)
        if (response) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const getOrders = async () => {
    try {
        const response = await $authApi.get(apiRoutes.ACCOUNT_GET_ORDERS)
        if (response) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const getOrder = async (id) => {
    try {
        if (!id) {
            return false
        }
        const response = await $authApi.get(apiRoutes.ACCOUNT_GET_ORDER + id)
        if (response) {
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
    getOrder
}
