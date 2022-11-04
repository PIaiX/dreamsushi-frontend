import {apiRoutes, BASE_URL} from '../config/api'
import {$authApi} from './index'

const getProduct = async (id = '') => {
    try {
        const response = await $authApi.get(`${apiRoutes.PRODUCT_ONE}/${id}`)

        if (response && response.status) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

const getProductRecommendations = async (id = '') => {
    try {
        const response = await $authApi.get(`${apiRoutes.PRODUCT_RECOMMEND}/${id}`)

        if (response && response.status) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

export {getProduct, getProductRecommendations}
