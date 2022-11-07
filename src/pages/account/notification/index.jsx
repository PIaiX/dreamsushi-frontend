import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {IoEyeOutline} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import CustomDataTable from '../../../components/CustomDataTable'
import NotificationItem from '../../../components/NotificationItem'
import Info from '../../../components/UI/Info'
import Loader from '../../../components/UI/Loader'
import {deliveryText, paymentText} from '../../../helpers/order'
import {customPrice} from '../../../helpers/product'
import {getNotifications} from '../../../services/account'

export const notificationColumns = [
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

const Notifications = () => {
    const [notifications, setNotifications] = useState({
        isLoaded: false,
        error: null,
        items: [],
    })

    useEffect(() => {
        getNotifications()
            .then((res) => res && setNotifications((prev) => ({...prev, isLoaded: true, items: res.notifications})))
            .catch((error) => error && setNotifications((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    if (!notifications.isLoaded) {
        return <Loader full={true} />
    }

    if (!notifications.items || notifications.items.length === 0) {
        return <Info>Уведомлений нет</Info>
    }

    return (
        <section className="notifications">
            <h1 className="mb-4">Заказы</h1>
            <CustomDataTable
                columns={notificationColumns}
                data={notifications.items}
                expandableRows
                expandableRowsComponent={({data}) =>
                    data.products && data.products.map((e) => <NotificationItem key={e?.id} {...e} />)
                }
            />
        </section>
    )
}

export default Notifications
