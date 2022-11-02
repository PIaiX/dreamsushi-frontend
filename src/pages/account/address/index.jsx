import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
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
    if (!addresses || addresses.length === 0) {
        return (
            <section className="addresses-notfound">
                <h2>Адреса</h2>
                <p>Адреса не найдены</p>
            </section>
        )
    }
    return (
        <section className="addresses">
            <h2>Адреса</h2>
            {!addresses || addresses.length === 0 ? (
                <>
                    <h2>Адреса</h2>
                    <p>Адреса не найдены</p>
                </>
            ) : (
                <CustomDataTable columns={addressColumns} data={addresses} />
            )}
        </section>
    )
}

export default Address
