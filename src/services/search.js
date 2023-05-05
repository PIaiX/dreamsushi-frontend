import { apiRoutes } from '../config/api'
import { $api } from '.'

const getSearch = async (text) => {
    const response = await $api.get(apiRoutes.SEARCH_GET, { params: { text } })
    if (response) {
        return response.data
    }
}

export { getSearch }
