import {apiRoutes} from '../config/api'
import {$authApi} from './index'

const getCart = async () => {
    try {
        const response = await $authApi.get(apiRoutes.CART_ALL)

        if (response && response.status) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

const cartCreate = async (payloads = {}) => {
    try {
        const response = await $authApi.post(apiRoutes.CART_CREATE, payloads)

        if (response && response.status) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

const cartEdit = async (payloads = {}) => {
    try {
        const response = await $authApi.post(apiRoutes.CART_EDIT, payloads)

        if (response && response.status) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

export {getCart, cartCreate, cartEdit}
