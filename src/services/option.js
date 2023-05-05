import {$api} from '.'
import {apiRoutes} from '../config/api'

const getOptions = async () => {
    const response = await $api.get(apiRoutes.OPTIONS)
    return response?.data
}

export {getOptions}
