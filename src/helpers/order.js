import React from 'react'

const paymentText = (value) => {
    let data = {
        card: 'Банковской картой',
        cash: 'Наличными',
        online: 'Онлайн',
        ip: 'Расчетный счет',
    }
    return data[value] ?? data['card']
}
const deliveryText = (value) => {
    let data = {
        0: {text: 'Принято', color: 'text-white'},
        1: {text: 'Принято', color: 'text-white'},
        3: {text: 'Готовиться', color: 'text-white'},
        13: {text: 'Готовиться', color: 'text-white'},
        4: {text: 'Готов', color: 'text-white'},
        10: {text: 'Выполнен', color: 'text-white'},
        12: {text: 'Предзаказ', color: 'text-white'},
    }
    let info = data[value] ?? data[0]
    return <span className={info.color}>{info.text}</span>
}

export {paymentText, deliveryText}
