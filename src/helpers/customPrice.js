// value - цена, currency - выводить валюту (true|false))
const customPrice = (value, currency = true,) => {
    value = parseInt(value).toLocaleString('ru-RU')
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

    if (currency) {
        value = value + (typeof currency === 'boolean' ? '\u00A0₽' : '\u00A0' + currency)
    }
    return value
}

const customPoint = ({ value, color = false, char = false, size = 14, sizeIcon = 14 }) => {
    if (!value) {
        return null
    }
    value = parseInt(value).toLocaleString('ru-RU')
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

    return value + 'Б'
}

export { customPrice, customPoint }
