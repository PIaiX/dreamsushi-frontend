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
    },
    {
        name: 'Улица',
        selector: 'street',
    },
    {
        name: 'Дом',
        selector: 'home',
    },
    {
        name: 'Подъезд',
        selector: 'entrance',
    },
    {
        name: 'Этаж',
        selector: 'floor',
    },
    {
        name: 'Квартира',
        selector: 'apartment',
    },
    {
        name: 'Управлять',
        selector: 'action',
        center: true,
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

    if (addresses.items.length === 0) {
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
