import { $authApi } from '.'
import { apiRoutes } from '../config/api'

const editAccount = async (payloads = {}) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_EDIT, payloads)
        return response
    } catch (error) {
        throw error
    }
}

const getAddresses = async (payloads = {}) => {
    try {
        const response = await $authApi.get(apiRoutes.ACCOUNT_ADDRESSES, payloads)
        return response
    } catch (error) {
        throw error
    }
}

export { editAccount, getAddresses }
