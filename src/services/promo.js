import { $api } from '.'
import { apiRoutes } from '../config/api'

const isPromo = async (promo) => {
    const response = await $api.get(`${apiRoutes.GET_PROMO}/${promo}`)
    return response
}

export { isPromo }
