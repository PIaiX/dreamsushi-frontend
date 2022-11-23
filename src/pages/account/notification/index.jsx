import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {IoTrashOutline} from 'react-icons/io5'
import {MetaTags} from 'react-meta-tags'
import {useDispatch, useSelector} from 'react-redux'
import CustomDataTable from '../../../components/CustomDataTable'
import Button from '../../../components/UI/Button'
import Info from '../../../components/UI/Info'
import Loader from '../../../components/UI/Loader'
import CustomModal from '../../../components/utils/CustomModal'
import {deleteNotification, getNotifications} from '../../../services/account'
import {setUser} from '../../../store/reducers/authSlice'

const Notifications = () => {
    const user = useSelector(({auth: {user}}) => user ?? false)
    const dispatch = useDispatch()

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
            name: 'Время отправки',
            selector: 'createdAt',
            width: '200px',
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
            .then((res) => {
                if (res) {
                    setNotifications((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res.notifications,
                        pagination: res.pagination,
                    }))
                    dispatch(setUser({...user, notificationCount: 0}))
                }
            })
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
                        items: res.notifications,
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
            </Info>
        )
    }

    return (
        <section className="notifications">
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — Уведомления</title>
                <meta property="title" content={process.env.REACT_APP_SITE_NAME + ' — Уведомления'} />
                <meta property="og:title" content={process.env.REACT_APP_SITE_NAME + ' — Уведомления'} />
            </MetaTags>
            <h1 className="mb-4">Уведомления</h1>
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
                        <Button className="btn-1 me-3" onClick={(e) => setModalDelete({isShow: e, id: false})}>
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
