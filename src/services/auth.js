import {$api, $authApi} from '.'
import {apiRoutes} from '../config/api'

const authRegister = async (payloads = {}) => {
    const data = await $api.post(apiRoutes.AUTH_REGISTRATION, payloads)
    return data
}

const authActivate = async (payloads = {}) => {
    const response = await $authApi.post(apiRoutes.AUTH_ACTIVATE, payloads)
    return response?.data
}

const authNewKeyActivate = async () => {
    const response = await $authApi.post(apiRoutes.AUTH_NEW_KEY_ACTIVATE)
    return response?.data
}

const authPasswordRecovery = async (payloads = {}) => {
    const data = await $api.post(apiRoutes.AUTH_RECOVERY, payloads)
    return data
}

const authEditEmail = async (payloads = {}) => {
    const data = await $authApi.post(apiRoutes.AUTH_EDIT_EMAIL, payloads)
    return data
}

export {authRegister, authActivate, authNewKeyActivate, authPasswordRecovery, authEditEmail}
