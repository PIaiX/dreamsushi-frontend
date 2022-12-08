import axios from 'axios'
import {apiRoutes} from '../config/api'

const getDadataStreets = async (query) => {
    try {
        const response = await axios.post(
            process.env.REACT_APP_DADATA_URL_STREET,
            JSON.stringify({
                query,
                from_bound: {value: 'street'},
                to_bound: {value: 'house'},
                locations: [
                    {city: 'казань'},
                    {settlement: 'куюки'},
                    {settlement: 'высокая гора'},
                    {settlement: 'кульсеитово'},
                    {settlement: 'семиозерка'},
                    {settlement: 'озерный'},
                    {settlement: 'усады'},
                    {settlement: 'песчаные ковали'},
                    {settlement: 'поселок габишебо'},
                    {settlement: 'боровое матюшино'},
                    {settlement: 'петровский'},
                    {settlement: 'вороновка'},
                    {settlement: 'юдино'},
                    {settlement: 'осиново'},
                    {settlement: 'кощаково'},
                    {settlement: 'званка'},
                    {settlement: 'кадышево'},
                    {settlement: 'новые салмачи'},
                    {settlement: 'малые кабаны'},
                    {settlement: 'малые дербышки'},
                    {settlement: 'большие кабаны'},
                    {settlement: 'большие дербышки'},
                ],
                restrict_value: true,
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Token ' + process.env.REACT_APP_DADATA_TOKEN,
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
            JSON.stringify({query: fiasId}),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Token ' + process.env.REACT_APP_DADATA_TOKEN,
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

export {getDadataStreets, getDadataAddress}
