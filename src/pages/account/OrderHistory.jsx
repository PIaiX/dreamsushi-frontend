import React from 'react'
import Order from '../../components/Order'

const OrderHistory = () => {
    return (
        <section className="mb-6">
            <h2>История заказов</h2>
            <p>Заказов ещё не было</p>
            <Order
                orderNum={1234}
                date={'24.10.2022'}
                priceSum={5000}
                status={1}
                paymentType={0}
                comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            />
            <Order
                orderNum={1234}
                date={'24.10.2022'}
                priceSum={5000}
                status={1}
                paymentType={0}
                comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            />
        </section>
    )
}

export default OrderHistory
