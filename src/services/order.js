import { apiRoutes } from '../config/api'
import { $authApi } from './index'

const createOrder = async (order) => {
      try {
            const response = await $authApi.post(apiRoutes.ORDER_CREATE, order)

            if (response && response.status === 200) {
                  return response.data
            }
      } catch (error) {
            throw error
      }
}

export {
      createOrder,
}
