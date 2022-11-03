const paymentText = (value) => {
    let data = {
        card: 'Банковской картой',
        cash: 'Наличный расчет',
        online: 'Онлайн оплата',
        ip: 'Расчетный счет',
    }
    return data[value] ?? data['card']
}
const deliveryText = (value) => {
    let data = {
        0: 'В процессе',
        1: 'Доставлен',
        2: 'Отменен',
        3: 'Доставка',
        4: 'Выдан',
    }
    return data[value] ?? data[0]
}

export { paymentText, deliveryText }
