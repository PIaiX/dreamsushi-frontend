// value - цена, currency - выводить валюту (true|false))
const customPrice = (value, currency = true) => {
    if (!value) {
        return null
    }
    value = parseInt(value).toLocaleString('ru-RU')
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

    if (currency) {
        value = value + '\u00A0₽'
    }
    return value
}

export {customPrice}
