import axios from 'axios'
import { apiRoutes } from '../config/api'

const getDadataStreets = async (query) => {
    try {
        const response = await axios.post(apiRoutes.DADATA_URL_STREET,
            JSON.stringify({ query, locations: [{ city: "казань" }] }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + process.env.REACT_APP_DADATA_TOKEN
                },
            })
        if (response && response.status === 200) {
            return response
        }
    } catch (error) {
        return error
    }
}
const getDadataAddress = async (query) => {
    try {
        const response = await axios.post(apiRoutes.DADATA_URL_ADDRESS,
            JSON.stringify({ query, locations: [{ city: "казань" }] }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + process.env.REACT_APP_DADATA_TOKEN,
                    "X-Secret": process.env.REACT_APP_DADATA_SECRET,
                },
            })
        console.log(response)
        if (response && response.status === 200) {
            return response
        }
    } catch (error) {
        return error
    }
}

export { getDadataStreets, getDadataAddress }
