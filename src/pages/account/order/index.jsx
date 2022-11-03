import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {GrEdit} from 'react-icons/gr'
import CustomDataTable from '../../../components/CustomDataTable'
import Loader from '../../../components/UI/Loader'
import {getOrders} from '../../../services/account'
import Info from '../../../components/UI/Info'
import {deliveryText} from '../../../helpers/order'

export const orderColumns = [
    {
        name: '#',
        selector: 'id',
    },
    {
        name: 'Тип',
        selector: 'delivery',
        cell: (row) => deliveryText(row.delivery),
    },
]

const Orders = () => {
    const [orders, setOrders] = useState({
        isLoaded: false,
        error: null,
        items: [],
    })

    useEffect(() => {
        getOrders()
            .then((res) => res && setOrders((prev) => ({...prev, isLoaded: true, items: res.orders})))
            .catch((error) => error && setOrders((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    if (!orders.isLoaded) {
        return <Loader full={true} />
    }

    if (orders.items.length === 0) {
        return <Info>Пока заказов нет</Info>
    }

    return (
        <section className="orders">
            <h1 className="mb-4">Заказы</h1>
            <CustomDataTable columns={orderColumns} data={orders.items} />
        </section>
    )
}

export default Orders
