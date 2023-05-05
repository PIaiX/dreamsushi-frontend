import { apiRoutes } from '../config/api'
import { $authApi } from './index'

const createOrder = async (order) => {
    const response = await $authApi.post(apiRoutes.ORDER_CREATE, order)
    return response
}

export { createOrder }
