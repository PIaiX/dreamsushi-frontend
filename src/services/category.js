import { apiRoutes } from '../config/api'
import { $api } from './index'

const getCategory = async (id = '') => {
    const response = await $api.get(`${apiRoutes.CATEGORY_ONE}/${id}`)
    if (response) {
        return response.data
    }
}

const getCategories = async () => {
    const response = await $api.get(apiRoutes.CATEGORY_ALL)
    if (response) {
        return response.data
    }
}

export { getCategory, getCategories }
