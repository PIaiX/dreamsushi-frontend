import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {IoTrashOutline} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import CustomDataTable from '../../../components/CustomDataTable'
import Button from '../../../components/UI/Button'
import Info from '../../../components/UI/Info'
import Loader from '../../../components/UI/Loader'
import CustomModal from '../../../components/utils/CustomModal'
import {deleteNotification, getNotifications} from '../../../services/admin'

const Notifications = () => {
    const [notifications, setNotifications] = useState({
        isLoaded: false,
        error: null,
        items: [],
        pagination: false,
    })
    const [modalDelete, setModalDelete] = useState({
        isShow: false,
        id: false,
    })

    const notificationColumns = [
        {
            name: 'Заголовок',
            selector: 'title',
        },
        {
            name: 'Отправлено',
            selector: 'notifications',
            width: '120px',
            center: true,
            cell: (row) => row.notifications && row.notifications.length,
        },
        {
            name: 'Просмотрено',
            selector: 'notifications',
            center: true,
            width: '130px',
            cell: (row) => row.notifications && row.notifications.filter((e) => e.status === 0).length,
        },
        {
            name: 'Время отправки',
            selector: 'createdAt',
            width: '160px',
            right: true,
            sortable: true,
            cell: (row) => moment(row.createdAt).format('DD.MM.YYYY kk:mm'),
        },
        {
            selector: 'action',
            center: true,
            width: '60px',
            cell: (row) => (
                <a onClick={() => setModalDelete({isShow: !modalDelete.isShow, id: row.id})}>
                    <IoTrashOutline size={20} color="#ff5252" />
                </a>
            ),
        },
    ]
    const getData = () => {
        getNotifications()
            .then(
                (res) =>
                    res &&
                    setNotifications((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.notifications?.rows,
                        pagination: res.pagination,
                    }))
            )
            .catch((error) => error && setNotifications((prev) => ({...prev, isLoaded: true, error})))
    }

    const handlePageChange = (page) => {
        getData(page)
    }

    const handlePerRowsChange = async (newLimit, page) => {
        getNotifications(page, newLimit)
            .then(
                (res) =>
                    res &&
                    setNotifications((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.notifications?.rows,
                        pagination: res.pagination,
                    }))
            )
            .catch((error) => error && setNotifications((prev) => ({...prev, isLoaded: true, error})))
    }

    useEffect(() => {
        getData()
    }, [])

    const clickDelete = (id) => {
        deleteNotification(id).then(() => getData())
        setModalDelete({isShow: false, id: false})
    }

    if (!notifications.isLoaded) {
        return <Loader full />
    }

    if (!notifications.items || notifications.items.length === 0) {
        return (
            <Info className="d-flex flex-column align-items-center justify-content-center account-info">
                Уведомлений нет
                <p>
                    <Link to="/admin/notification/create" className="btn-2 fs-08">
                        Добавить
                    </Link>
                </p>
            </Info>
        )
    }

    return (
        <section className="notifications">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h1 className="m-0">Уведомления</h1>
                <Link to="/admin/notification/create" className="btn-2">
                    Добавить
                </Link>
            </div>
            <CustomDataTable
                columns={notificationColumns}
                data={notifications.items}
                handlePerRowsChange={handlePerRowsChange}
                handlePageChange={handlePageChange}
                pagination={notifications.pagination}
                expandableRows
                expandableRowsComponent={({data}) => (
                    <div className="p-4">
                        <h3>{data.title}</h3>
                        {data.desc}
                    </div>
                )}
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
                Вы точно хотите удалить уведомление?
            </CustomModal>
        </section>
    )
}

export default Notifications
