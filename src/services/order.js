import { $api } from '.'
import { apiRoutes } from '../config/api'

const createOrder = async (payloads = {}) => {
    try {
        const response = await $api.post(apiRoutes.ORDER_CREATE, payloads)
        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

export { createOrder }
