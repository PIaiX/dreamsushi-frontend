import axios from 'axios'
import { apiRoutes } from '../config/api'

const getDadataStreets = async (query) => {
    try {
        const response = await axios.post(
            process.env.REACT_APP_DADATA_URL_STREET,
            JSON.stringify({
                query,
                'from_bound': { 'value': 'street' },
                'to_bound': { 'value': 'house' },
                'locations': [{ 'city': 'казань' }],
                'restrict_value': true
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Token ' + process.env.REACT_APP_DADATA_TOKEN,
                },
            }
        )
        if (response && response.status === 200) {
            return response
        }
    } catch (error) {
        return error
    }
}
const getDadataAddress = async (fiasId) => {
    try {
        const response = await axios.post(
            process.env.REACT_APP_DADATA_URL_ADDRESS,
            JSON.stringify({ query: fiasId }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Token ' + process.env.REACT_APP_DADATA_TOKEN,
                },
            }
        )
        console.log(response)
        if (response && response.status === 200) {
            return response
        }
    } catch (error) {
        return error
    }
}

export { getDadataStreets, getDadataAddress }
