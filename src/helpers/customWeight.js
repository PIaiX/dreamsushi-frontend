// value - цена, currency - выводить валюту (true|false))
const customWeight = (value) => {
    if (!value) {
        return null
    }
    let weight = value > 1000
        ? (value / 1000).toFixed(1) + 'кг'
        : value + 'г'

    return weight
}

export { customWeight }
