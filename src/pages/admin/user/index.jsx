import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {GrEdit} from 'react-icons/gr'
import CustomDataTable from '../../../components/CustomDataTable'
import Loader from '../../../components/UI/Loader'
import {deleteUser, getUsers} from '../../../services/admin'
import Info from '../../../components/UI/Info'
import CustomModal from '../../../components/utils/CustomModal'
import {IoTrashOutline} from 'react-icons/io5'
import Button from '../../../components/UI/Button'
import moment from 'moment'

const Users = () => {
    const [users, setUsers] = useState({
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
    const userColumns = [
        {
            name: 'Ф.И.О',
            selector: 'firstName',
            cell: (row) => (row.firstName ?? '') + ' ' + (row.lastName ?? '') + ' ' + (row.patronymic ?? ''),
        },
        {
            name: 'День рождения',
            selector: 'birthday',
            sortable: true,
            cell: (row) => (row.birthday ? moment(row.birthday).format('DD.MM.YYYY') : 'Не указано'),
        },
        {
            name: 'Номер телефона',
            selector: 'phone',
        },
        {
            name: 'Email',
            selector: 'email',
        },
        {
            selector: 'action',
            center: true,
            width: '100px',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <Link to={`/admin/user/${row.id}`} className="me-4">
                        <GrEdit size={15} color="#fff" />
                    </Link>
                    <a onClick={() => setModalDelete({isShow: !modalDelete.isShow, id: row.id})}>
                        <IoTrashOutline size={20} color="#ff5252" />
                    </a>
                </div>
            ),
        },
    ]
    const getData = (page) => {
        getUsers(page, limit)
            .then(
                (res) =>
                    res &&
                    setUsers((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.users?.rows,
                        pagination: res?.pagination,
                    }))
            )
            .catch((error) => error && setUsers((prev) => ({...prev, isLoaded: true, error})))
    }

    const handlePageChange = (page) => {
        getData(page)
    }

    const handlePerRowsChange = async (newLimit, page) => {
        setLimit(newLimit)
        getUsers(page, newLimit)
            .then(
                (res) =>
                    res &&
                    setUsers((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.users?.rows,
                        pagination: res?.pagination,
                    }))
            )
            .catch((error) => error && setUsers((prev) => ({...prev, isLoaded: true, error})))
    }

    useEffect(() => {
        getData()
    }, [])

    const clickDelete = (id) => {
        deleteUser(id).then(() => getData())
        setModalDelete({isShow: false, id: false})
    }

    if (!users.isLoaded) {
        return <Loader full />
    }

    if (!users.items || users.items.length === 0) {
        return (
            <Info className="d-flex flex-column align-items-center justify-content-center account-info">
                <h3 className="mb-4">Клиентов нет</h3>
            </Info>
        )
    }

    return (
        <section className="users">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h1 className="m-0">Клиенты</h1>
            </div>
            <CustomDataTable
                handlePerRowsChange={handlePerRowsChange}
                handlePageChange={handlePageChange}
                columns={userColumns}
                data={users.items}
                pagination={users.pagination}
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
                Вы точно хотите удалить клиента?
            </CustomModal>
        </section>
    )
}

export default Users
