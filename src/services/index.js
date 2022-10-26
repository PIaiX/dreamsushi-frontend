import axios from 'axios'
import {BASE_URL} from '../config/api'

const apiBody = {
    baseURL: BASE_URL,
    withCredentials: true,
}

const $api = axios.create(apiBody)
const $authApi = axios.create(apiBody)

export {$api, $authApi}
