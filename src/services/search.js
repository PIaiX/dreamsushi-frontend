import { apiRoutes } from '../config/api'
import { $authApi } from '.'

const getSearch = async (searchText) => {
    try {
        const response = await $authApi.get(apiRoutes.SEARCH_GET, { params: { text: searchText } })

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

export { getSearch }
