import axios from 'axios'
import {apiRoutes, BASE_URL} from '../config/api'

const authRegister = async (payloads = {}) => {
    try {
        const response = await axios.post(`${BASE_URL}${apiRoutes.AUTH_REGISTRATION}`, payloads)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

const authActivate = async (payloads = {}) => {
    try {
        const response = await axios.post(`${BASE_URL}${apiRoutes.AUTH_ACTIVATE}`, payloads)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

const authPasswordRecovery = async (payloads = {}) => {
    try {
        const response = await axios.post(`${BASE_URL}${apiRoutes.AUTH_RECOVERY}`, payloads)

        if (response && response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw error
    }
}

export {authRegister, authActivate, authPasswordRecovery}
