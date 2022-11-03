import axios from 'axios'
import {apiRoutes, BASE_URL} from '../config/api'

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
                const response = await $api.post(`${BASE_URL}${apiRoutes.AUTH_REFRESH}`)
                localStorage.setItem('token', response?.data?.body)
            } catch (e) {
                console.log('No auth')
            }
        }
        return Promise.reject(error)
    }
)

export {$api, $authApi}
