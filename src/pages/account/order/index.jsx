import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {IoEyeOutline} from 'react-icons/io5'
import CustomDataTable from '../../../components/CustomDataTable'
import Loader from '../../../components/UI/Loader'
import {getOrders} from '../../../services/account'
import Info from '../../../components/UI/Info'
import {deliveryText, paymentText} from '../../../helpers/order'
import {customPrice} from '../../../helpers/product'
import moment from 'moment'

export const orderColumns = [
    {
        name: '#',
        width: '85px',
        sortable: true,
        selector: 'id',
    },
    {
        name: 'Статус',
        selector: 'delivery',
        sortable: true,
        cell: (row) => deliveryText(row.delivery),
    },
    {
        name: 'Оплата',
        selector: 'payment',
        sortable: true,
        cell: (row) => paymentText(row.payment),
    },
    {
        name: 'Время заказа',
        selector: 'createdAt',
        sortable: true,
        cell: (row) => moment(row.createdAt).format('DD.MM.YYYY kk:mm'),
    },
    {
        name: 'Итого',
        selector: 'payment',
        width: '100px',
        sortable: true,
        cell: (row) => customPrice(row.total),
    },
    {
        selector: 'action',
        center: true,
        width: '60px',
        cell: (row) => (
            <Link to={`/account/address/${row.id}`}>
                <IoEyeOutline size={20} color="#fff" />
            </Link>
        ),
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
            <CustomDataTable
                columns={orderColumns}
                data={orders.items}
                expandableRows
                expandableRowsComponent={({data}) => (
                    <div className="p-3">
                        <h6>{data.title}</h6>
                        <p>{data.content}</p>
                    </div>
                )}
            />
        </section>
    )
}

export default Orders
