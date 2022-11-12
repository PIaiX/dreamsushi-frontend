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
        const response = await $authApi.get(apiRoutes.ADMIN_EPR_CATEGORIES_GET)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}
const getEprProducts = async () => {
    try {
        const response = await $authApi.get(apiRoutes.ADMIN_EPR_PRODUCTS_GET)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}
const createEprOrder = async () => {
    try {
        const response = await $authApi.post(apiRoutes.ADMIN_EPR_ORDER_CREATE)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}
const getCategories = async (page = 1, limit = 30) => {
    try {
        const response = await $authApi.get(apiRoutes.ADMIN_CATEGORIES_GET, {
            params: {
                page,
                limit,
            },
        })

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}
const getCategory = async (id) => {
    try {
        const response = await $authApi.get(apiRoutes.ADMIN_CATEGORY_GET, {
            params: {
                id,
            },
        })

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}
const editCategory = async (category) => {
    try {
        const response = await $authApi.post(apiRoutes.ADMIN_CATEGORY_EDIT, category)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}
const deleteCategory = async (id) => {
    try {
        const response = await $authApi.delete(apiRoutes.ADMIN_CATEGORY_DELETE, {data: {id}})

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}
const createCategory = async (category) => {
    try {
        const response = await $authApi.post(apiRoutes.ADMIN_CATEGORY_CREATE, category)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}

const getProducts = async (page = 1, limit = 30) => {
    try {
        const response = await $authApi.get(apiRoutes.ADMIN_PRODUCTS_GET, {
            params: {
                page,
                limit,
            },
        })

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}
const getProduct = async (id) => {
    try {
        const response = await $authApi.get(apiRoutes.ADMIN_PRODUCT_GET, {
            params: {
                id,
            },
        })

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}
const editProduct = async (product) => {
    try {
        const response = await $authApi.post(apiRoutes.ADMIN_PRODUCT_EDIT, product)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}
const deleteProduct = async (id) => {
    try {
        const response = await $authApi.delete(apiRoutes.ADMIN_PRODUCT_DELETE, {data: {id}})

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
}
const createProduct = async (product) => {
    try {
        const response = await $authApi.post(apiRoutes.ADMIN_PRODUCT_CREATE, product)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        return error
    }
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

export {
    getEprCategories,
    getEprProducts,
    createEprOrder,
    getCategories,
    getCategory,
    editCategory,
    createCategory,
    deleteCategory,
    getProducts,
    getProduct,
    editProduct,
    createProduct,
    deleteProduct,
}
