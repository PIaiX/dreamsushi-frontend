import {apiRoutes} from '../config/api'
import {$authApi} from './index'

const getPlaix = async () => {
    const data = await $host.get('https://api.plaix.ru/?getLink')
    if (data) {
        return data
    } else {
        return false
    }
}

const getEprCategories = async () => {
    try {
        const response = await $authApi.get(apiRoutes.ADMIN_GET_EPR_CATEGORIES)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}
const getEprProducts = async () => {
    try {
        const response = await $authApi.get(apiRoutes.ADMIN_GET_EPR_PRODUCTS)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}
const createEprOrder = async () => {
    try {
        const response = await $authApi.post(apiRoutes.ADMIN_CREATE_EPR_ORDER)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}
const getCategories = async (page = 1, limit = 20) => {
    const {data} = await $authApi.get('/admin/getCategories', {
        params: {
            page,
            limit,
        },
    })
    return data
}
const getCategory = async (id) => {
    const {data} = await $host.get('/admin/getCategory', {
        params: {
            id,
        },
    })
    return data
}
const editCategory = async (category) => {
    const {data} = await $authHost.post('/admin/editCategory', category)
    return data
}
const deleteCategory = async (category) => {
    const {data} = await $authHost.post('/admin/deleteCategory', category)
    return data
}
const createCategory = async (category) => {
    const {data} = await $authHost.post('/admin/createCategory', category)
    return data
}

const getProducts = async (page = 1, limit = 20) => {
    const {data} = await $host.get('/admin/getProducts', {
        params: {
            page,
            limit,
        },
    })
    return data
}
const getProduct = async (id) => {
    const {data} = await $host.get('/admin/getProduct', {
        params: {
            id,
        },
    })
    return data
}
const editProduct = async (product) => {
    const {data} = await $authHost.post('/admin/editProduct', product)
    return data
}
const deleteProduct = async (product) => {
    const {data} = await $authHost.post('/admin/deleteProduct', product)
    return data
}
const createProduct = async (product) => {
    const {data} = await $authHost.post('/admin/createProduct', product)
    return data
}

const getOrders = async (page = 1, limit = 20) => {
    const {data} = await $host.get('/admin/getOrders', {
        params: {
            page,
            limit,
        },
    })
    return data
}
const getOrder = async (id) => {
    const {data} = await $host.get('/admin/getOrder', {
        params: {
            id,
        },
    })
    return data
}
const editOrder = async (order) => {
    const {data} = await $authHost.post('/admin/editOrder', order)
    return data
}
const deleteOrder = async (order) => {
    const {data} = await $authHost.post('/admin/deleteOrder', order)
    return data
}
const createOrder = async (order) => {
    const {data} = await $authHost.post('/admin/createOrder', order)
    return data
}

const getSales = async (page = 1, limit = 20) => {
    const {data} = await $host.get('/admin/getSales', {
        params: {
            page,
            limit,
        },
    })
    return data
}
const getSale = async (id) => {
    const {data} = await $host.get('/admin/getSale', {
        params: {
            id,
        },
    })
    return data
}
const editSale = async (sale) => {
    const {data} = await $authHost.post('/admin/editSale', sale)
    return data
}
const deleteSale = async (sale) => {
    const {data} = await $authHost.post('/admin/deleteSale', sale)
    return data
}
const createSale = async (sale) => {
    const {data} = await $authHost.post('/admin/createSale', sale)
    return data
}

export {getEprCategories, getEprProducts, createEprOrder}
