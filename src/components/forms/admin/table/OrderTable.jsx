import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {IoTrashOutline} from 'react-icons/io5'
import CustomDataTable from '../../../CustomDataTable'
import OrderProductItem from '../../../OrderProductItem'
import Button from '../../../UI/Button'
import Info from '../../../UI/Info'
import Loader from '../../../UI/Loader'
import CustomModal from '../../../utils/CustomModal'
import {deliveryText, paymentText} from '../../../../helpers/order'
import {customPrice} from '../../../../helpers/product'
import {deleteOrder, getOrders} from '../../../../services/admin'

const OrderTable = ({userId = ''}) => {
    const [orders, setOrders] = useState({
        isLoaded: false,
        error: null,
        items: [],
        pagination: false,
    })
    const [modalDelete, setModalDelete] = useState({
        isShow: false,
        id: false,
    })
    const [limit, setLimit] = useState(10)
    const orderColumns = [
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
            width: '100px',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    {/* <Link to={`/admin/order/${row.id}`} className="me-4">
                        <GrEdit size={15} color="#fff" />
                    </Link> */}
                    <a onClick={() => setModalDelete({isShow: !modalDelete.isShow, id: row.id})}>
                        <IoTrashOutline size={20} color="#ff5252" />
                    </a>
                </div>
            ),
        },
    ]
    const getData = async (page = 1) => {
        getOrders(page, limit, userId)
            .then(
                (res) =>
                    res &&
                    setOrders((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.orders?.rows,
                        pagination: res?.pagination,
                    }))
            )
            .catch((error) => error && setOrders((prev) => ({...prev, isLoaded: true, error})))
    }

    const handlePageChange = (page) => {
        getData(page)
    }

    const handlePerRowsChange = async (newLimit, page) => {
        setLimit(newLimit)
        getOrders(page, newLimit, userId)
            .then(
                (res) =>
                    res &&
                    setOrders((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.orders?.rows,
                        pagination: res?.pagination,
                    }))
            )
            .catch((error) => error && setOrders((prev) => ({...prev, isLoaded: true, error})))
    }

    useEffect(() => {
        getData()
    }, [])

    const clickDelete = (id) => {
        deleteOrder(id).then(() => getData())
        setModalDelete({isShow: false, id: false})
    }

    if (!orders.isLoaded) {
        return <Loader full />
    }

    if (!orders.items || orders.items.length === 0) {
        return (
            <Info className="d-flex flex-column align-items-center justify-content-center account-info">
                <h5 className="mb-4">Пока заказов нет</h5>
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
                handlePerRowsChange={handlePerRowsChange}
                handlePageChange={handlePageChange}
                expandableRowsComponent={({data}) =>
                    data.products && JSON.parse(data.products).map((e) => <OrderProductItem key={e.id} {...e} />)
                }
            />
            <CustomModal
                title={`Удаление ${modalDelete.id ? '#' + modalDelete.id : ''}`}
                isShow={modalDelete.isShow}
                setIsShow={(e) => setModalDelete({isShow: e, id: false})}
                footer={
                    <>
                        <Button
                            className="btn-1 me-3"
                            onClick={(e) => setModalDelete({isShow: !modalDelete.isShow, id: false})}
                        >
                            Отмена
                        </Button>
                        <Button className="btn-2" onClick={() => modalDelete.id && clickDelete(modalDelete.id)}>
                            Удалить
                        </Button>
                    </>
                }
            >
                Вы точно хотите удалить заказ?
            </CustomModal>
        </section>
    )
}

export default OrderTable
