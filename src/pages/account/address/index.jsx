import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import CustomDataTable from '../../../components/CustomDataTable'
import Loader from '../../../components/Loader'
import defineErrorByType from '../../../helpers/defineErrorByType'
import {dispatchAlert} from '../../../helpers/dispatchAlert'
import {getAddresses} from '../../../services/account'

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
        // cell: (row) => (
        //     <Link to={`/test/${row.testId}/user/${row.id}`}>
        //         <Edit size={20} />
        //     </Link>
        // ),
    },
]

const Address = () => {
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAddresses()
            .then((res) => {
                if (res.status === 200 && res.data.addresses) {
                    setAddresses(res.data.addresses)
                }
            })
            .catch((error) => {
                dispatchAlert('danger', defineErrorByType(error))
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <section className="addresses">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h1 className="m-0">Адреса</h1>
                <Link to="create" className="btn-2 btn btn-primary">
                    Добавить
                </Link>
            </div>
            {!addresses || addresses.length === 0 ? (
                <p>Адреса не найдены</p>
            ) : (
                <CustomDataTable columns={addressColumns} data={addresses} />
            )}
        </section>
    )
}

export default Address
