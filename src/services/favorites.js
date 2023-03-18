import { $authApi } from './index'
import { apiRoutes } from '../config/api'

const getFavorites = async (payloads = {}) => {
    const response = await $authApi.get(apiRoutes.FAVORITE_ALL, { params: payloads })
    if (response) {
        return response.data
    }
}

const createFavorite = async (payloads = {}) => {
    const response = await $authApi.post(apiRoutes.FAVORITE_CREATE, payloads)
    if (response) {
        return response.data
    }
}

const deleteFavorite = async (payloads = {}) => {
    const response = await $authApi.delete(apiRoutes.FAVORITE_DELETE, { data: payloads })
    if (response) {
        return response.data
    }
}

export { getFavorites, createFavorite, deleteFavorite }
