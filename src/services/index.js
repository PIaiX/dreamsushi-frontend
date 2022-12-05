import axios from 'axios'
import { BASE_URL } from '../config/api'
import store from '../store/store'
import { refreshAuth } from './RTK/auth'

const apiBody = {
    baseURL: BASE_URL,
    withCredentials: true,
}

const $api = axios.create(apiBody)
const $authApi = axios.create(apiBody)

$authApi.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
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
            if (error?.response?.data?.message?.type == 'REFRESH_TOKEN_EXPIRED' || error?.response?.data?.message?.type == 'ACCESS_TOKEN_EXPIRED') {
                localStorage.removeItem('token')
            }
            store.dispatch(refreshAuth())
            return $api(originalRequest)
        }
    }
)

export { $api, $authApi }
