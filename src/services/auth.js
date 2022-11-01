import axios from 'axios'
import {apiRoutes, BASE_URL} from '../config/api'

const authRegister = async (payloads) => {
    try {
        const response = await axios.post(`${BASE_URL}${apiRoutes.AUTH_REGISTRATION}`, payloads)
        return response
    } catch (error) {
        throw error.message
    }
}

const authActivate = async (payloads) => {
    try {
        const response = await axios.post(`${BASE_URL}${apiRoutes.AUTH_ACTIVATE}`, payloads)
        return response
    } catch (error) {
        throw error.message
    }
}

export {authRegister, authActivate}
