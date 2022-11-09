import {$authApi} from './index'
import {apiRoutes} from '../config/api'

const getFavorites = async (payloads = {}) => {
    try {
        const response = await $authApi.get(apiRoutes.FAVORITE_ALL, {params: payloads})

        if (response && response.status) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

const createFavorite = async (payloads = {}) => {
    try {
        const response = await $authApi.post(apiRoutes.FAVORITE_CREATE, payloads)

        if (response && response.status) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

const deleteFavorite = async (payloads = {}) => {
    try {
        const response = await $authApi.delete(apiRoutes.FAVORITE_DELETE, {data: payloads})

        if (response && response.status) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

export {getFavorites, createFavorite, deleteFavorite}
