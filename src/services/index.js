import axios from 'axios'
import { BASE_URL } from '../config/api'
import { store } from '../store'
import { refreshAuth } from './RTK/auth'
// import * as SecureStore from 'expo-secure-store'
// import * as Network from 'expo-network'
// import * as Device from 'expo-device'

// const DEVICE = JSON.stringify({
//     brand: Device.brand,
//     designName: Device.designName,
//     manufacturer: Device.manufacturer,
//     modelName: Device.modelName,
//     osBuildId: Device.osBuildId,
//     osName: Device.osName,
//     osVersion: Device.osVersion,
//     platformApiLevel: Device.platformApiLevel,
// })

const apiBody = {
    baseURL: BASE_URL,
    withCredentials: true,
}

const $api = axios.create(apiBody)

$api.interceptors.request.use(
    async (config) => {
        config.headers['Content-Type'] = 'application/json'
        // config.headers.ip = await Network.getIpAddressAsync()
        // config.headers.device = DEVICE
        return config
    },
    (error) => Promise.reject(error)
)

const $authApi = axios.create(apiBody)

$authApi.interceptors.request.use(
    async (config) => {
        config.headers['Content-Type'] = 'application/json'
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        // config.headers.ip = await Network.getIpAddressAsync()
        config.headers.Authorization = `Access ${accessToken}`
        config.headers.refreshtoken = refreshToken
        // config.headers.device = DEVICE
        return config
    },
    (error) => Promise.reject(error)
)

$authApi.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const {
            config,
            response: { status },
        } = error
        const originalRequest = config
        if (status === 401 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true
            return store.dispatch(refreshAuth()).then(() => $authApi(originalRequest))
        }
        return Promise.reject(error)
    }
)

export { $api, $authApi }
