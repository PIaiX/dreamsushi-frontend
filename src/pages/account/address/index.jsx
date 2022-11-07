import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {GrEdit} from 'react-icons/gr'
import CustomDataTable from '../../../components/CustomDataTable'
import Loader from '../../../components/UI/Loader'
import {getAddresses} from '../../../services/account'
import Info from '../../../components/UI/Info'

export const addressColumns = [
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
        width: '60px',
        cell: (row) => (
            <Link to={`/account/address/${row.id}`}>
                <GrEdit size={15} color="#fff" />
            </Link>
        ),
    },
]

const Addresses = () => {
    const [addresses, setAddresses] = useState({
        isLoaded: false,
        error: null,
        items: [],
    })

    useEffect(() => {
        getAddresses()
            .then((res) => res && setAddresses((prev) => ({...prev, isLoaded: true, items: res.addresses})))
            .catch((error) => error && setAddresses((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    if (!addresses.isLoaded) {
        return <Loader full={true} />
    }

    if (!addresses.items || addresses.items.length === 0) {
        return <Info>Адресов нет</Info>
    }

    return (
        <section className="addresses">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h1 className="m-0">Адреса</h1>
                <Link to="create" className="btn-2">
                    Добавить
                </Link>
            </div>
            <CustomDataTable columns={addressColumns} data={addresses.items} />
        </section>
    )
}

export default Addresses
