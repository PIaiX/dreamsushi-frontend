import axios from 'axios'
import {apiRoutes, BASE_URL} from '../config/api'

const authRegister = async (payloads) => {
    try {
        const response = await axios.post(`${BASE_URL}${apiRoutes.AUTH_REGISTER}`, payloads)
        return response.data
    } catch (error) {
        throw error
    }
}

const authActivate = async (payloads) => {
    try {
        const response = await axios.post(`${BASE_URL}${apiRoutes.AUTH_REGISTER}`, payloads)
        return response.data
    } catch (error) {
        throw error
    }
}

const authLogin = async (payloads) => {
    try {
        const response = await axios.post(`${BASE_URL}${apiRoutes.AUTH_REGISTER}`, payloads)
        return response.data
    } catch (error) {
        throw error
    }
}

const authRefresh = async () => {
    try {
        const response = await axios.post(`${BASE_URL}${apiRoutes.AUTH_REGISTER}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export {authRegister, authActivate, authLogin, authRefresh}
