import axios from 'axios'
import {apiRoutes, BASE_URL} from '../config/api'
import store from '../store/store'
import {resetCart} from '../store/reducers/cartSlice'
import {resetFavorite} from '../store/reducers/favoriteSlice'

const apiBody = {
    baseURL: BASE_URL,
    withCredentials: true,
}

const $api = axios.create(apiBody)
const $authApi = axios.create(apiBody)

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$authApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$authApi.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true
            try {
                const response = await $api.post(apiRoutes.AUTH_REFRESH)
                response && localStorage.setItem('token', response?.data?.body)
            } catch (err) {
                if (err?.response?.data?.message?.type == 'ACCESS_TOKEN_EXPIRED') {
                    localStorage.removeItem('token')
                }

                // store.dispatch(resetCart())
                // store.dispatch(resetFavorite())
            }
        }
        return Promise.reject(error)
    }
)

export {$api, $authApi}
