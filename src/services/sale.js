import {apiRoutes} from '../config/api'
import {$api} from '.'

const getSales = async () => {
    try {
        const response = await $api.get(apiRoutes.SALES_GET)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

export {getSales}
