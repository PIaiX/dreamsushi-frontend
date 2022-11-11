import moment from 'moment'
import React, {useCallback, useEffect, useState} from 'react'
import CustomDataTable from '../../../components/CustomDataTable'
import OrderProductItem from '../../../components/OrderProductItem'
import Info from '../../../components/UI/Info'
import Loader from '../../../components/UI/Loader'
import {deliveryText, paymentText} from '../../../helpers/order'
import {customPrice} from '../../../helpers/product'
import {getOrders} from '../../../services/account'

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
]

const Orders = () => {
    const [orders, setOrders] = useState({
        isLoaded: false,
        error: null,
        items: [],
        pagination: false,
    })

    const getData = async (page = 1) => {
        getOrders(page)
            .then(
                (res) =>
                    res &&
                    setOrders((prev) => ({...prev, isLoaded: true, items: res.orders, pagination: res.pagination}))
            )
            .catch((error) => error && setOrders((prev) => ({...prev, isLoaded: true, error})))
    }

    const handlePageChange = useCallback((page) => {
        getData(page)
    }, [])

    useEffect(() => {
        getData()
    }, [])

    if (!orders.isLoaded) {
        return <Loader full />
    }

    if (!orders.items || orders.items.length === 0) {
        return (
            <Info className="d-flex flex-column align-items-center justify-content-center account-info">
                Пока заказов нет
            </Info>
        )
    }

    return (
        <section className="orders">
            <h1 className="mb-4">Заказы</h1>
            <CustomDataTable
                columns={orderColumns}
                data={orders.items}
                pagination={orders.pagination}
                expandableRows
                handlePageChange={handlePageChange}
                expandableRowsComponent={({data}) =>
                    data.products && data.products.map((e) => <OrderProductItem key={e.id} {...e} />)
                }
            />
        </section>
    )
}

export default Orders
