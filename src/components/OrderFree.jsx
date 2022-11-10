import React from 'react'

const OrderFree = (cart) => {
    return (
        <>
            <h4 className="mb-3 mb-sm-4">
                <span className="main-color me-2">•</span> Бесплатно к заказу
            </h4>
            <table className="simple">
                <tbody>
                    <tr>
                        <td>Палочки китайские</td>
                        <td>2 пары</td>
                    </tr>
                    <tr>
                        <td>Соевый соус</td>
                        <td>100 мл</td>
                    </tr>
                    <tr>
                        <td>Имбирь Табуко</td>
                        <td>30 г</td>
                    </tr>
                    <tr>
                        <td>Васаби</td>
                        <td>30 г</td>
                    </tr>
                    <tr>
                        <td>Салфетки</td>
                        <td>10 шт</td>
                    </tr>
                    <tr>
                        <td>Жвачка</td>
                        <td>2 шт</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default OrderFree
