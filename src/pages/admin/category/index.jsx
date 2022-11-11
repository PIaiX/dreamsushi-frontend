import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {GrEdit} from 'react-icons/gr'
import CustomDataTable from '../../../components/CustomDataTable'
import Loader from '../../../components/UI/Loader'
import {deleteAddress, getAddresses} from '../../../services/account'
import Info from '../../../components/UI/Info'
import CustomModal from '../../../components/utils/CustomModal'
import {IoTrashOutline} from 'react-icons/io5'
import Button from '../../../components/UI/Button'

const AdminCategories = () => {
    const [addresses, setAddresses] = useState({
        isLoaded: false,
        error: null,
        items: [],
        pagination: false,
    })
    const [modalDelete, setModalDelete] = useState({
        isShow: false,
        id: false,
    })

    const addressColumns = [
        {
            name: 'Название',
            selector: 'title',
            sortable: true,
        },
        {
            name: 'Улица',
            selector: 'street',
            sortable: true,
        },
        {
            name: 'Дом',
            center: true,
            selector: 'home',
        },
        {
            name: 'Подъезд',
            center: true,
            selector: 'entrance',
        },
        {
            name: 'Этаж',
            center: true,
            selector: 'floor',
        },
        {
            name: 'Квартира',
            center: true,
            selector: 'apartment',
        },
        {
            selector: 'action',
            center: true,
            width: '100px',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <Link to={`/account/address/${row.id}`} className="me-4">
                        <GrEdit size={15} color="#fff" />
                    </Link>
                    <a onClick={() => setModalDelete({isShow: !modalDelete.isShow, id: row.id})}>
                        <IoTrashOutline size={20} color="#ff5252" />
                    </a>
                </div>
            ),
        },
    ]
    const getData = () => {
        getAddresses()
            .then(
                (res) =>
                    res &&
                    setAddresses((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res.addresses,
                        pagination: res.pagination,
                    }))
            )
            .catch((error) => error && setAddresses((prev) => ({...prev, isLoaded: true, error})))
    }

    useEffect(() => {
        getData()
    }, [])

    const clickDelete = (id) => {
        deleteAddress(id).then(() => getData())
        setModalDelete({isShow: false, id: false})
    }

    if (!addresses.isLoaded) {
        return <Loader full />
    }

    if (!addresses.items || addresses.items.length === 0) {
        return (
            <Info className="d-flex flex-column align-items-center justify-content-center account-info">
                <h3 className="mb-4">Адресов нет</h3>
                <p>
                    <Link to="/account/address/create" className="btn-2 fs-08">
                        Добавить адрес
                    </Link>
                </p>
            </Info>
        )
    }

    return (
        <section className="addresses">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h1 className="m-0">Адреса</h1>
                <Link to="/account/address/create" className="btn-2">
                    Добавить
                </Link>
            </div>
            <CustomDataTable columns={addressColumns} data={addresses.items} />
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
                Вы точно хотите удалить адрес?
            </CustomModal>
        </section>
    )
}

export default AdminCategories
