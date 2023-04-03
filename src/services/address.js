import { $api } from '.'
import { apiRoutes } from '../config/api'

const getAddressPickup = async () => {
    const response = await $api.get(apiRoutes.ADDRESS_PICKUP)
    return response?.data
}

export { getAddressPickup }

