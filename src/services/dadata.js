import axios from 'axios'
const DADATA_URL_STREET = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
const DADATA_URL_ADDRESS = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/address'
const DADATA_TOKEN = '75e4dbde399d9ff27f2568b852252b7964ad0f92'
const DADATA_SECRET = '3a48a9c470e2a537eee392bc6e88e4a64efdc3f4'

const getDadataStreets = async (query) => {
    return await axios.post(
        DADATA_URL_STREET,
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
                Authorization: 'Token ' + DADATA_TOKEN,
            },
        }
    )
}
const getDadataAddress = async (fiasId) => {
    return await axios.post(DADATA_URL_ADDRESS, JSON.stringify({query: fiasId}), {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token ' + DADATA_TOKEN,
        },
    })
}

export {getDadataStreets, getDadataAddress}
