import { apiRoutes } from '../config/api'
import { $api } from './index'

const getLog = async (id = '') => {
    const response = await $api.get(`${apiRoutes.LOG_GET}/${id}`)
    return response?.data
}

const getLogs = async () => {
    const response = await $api.get(apiRoutes.LOGS_GET)
    return response?.data
}

const createLogs = async (data) => {
    await $api.post(apiRoutes.LOGS_CREATE, data)
}

export { getLog, getLogs, createLogs }
