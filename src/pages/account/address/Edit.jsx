import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {editAddress, getAddress} from '../../../services/account'
import AddressForm from '../../../components/forms/AddressForm'
import {dispatchAlert, dispatchApiErrorAlert} from '../../../helpers/alert'
import Loader from '../../../components/UI/Loader'
import Info from '../../../components/UI/Info'

const EditAddress = () => {
    const {addressId} = useParams()
    const [address, setAddress] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAddress(addressId)
            .then((res) => {
                if (res.type == 'SUCCESS' && res.address) {
                    setAddress(res.address)
                }
            })
            .finally(() => setLoading(!loading))
    }, [])

    const onSubmit = useCallback((data) => {
        editAddress(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', 'Адрес успешно изменен')
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert('danger', error)
            })
    }, [])

    if (loading) {
        return <Loader full={true} />
    }
    if (!address) {
        return <Info>Такого адреса нет</Info>
    }

    return (
        <section className="profile">
            <h1>Редактировать адрес</h1>
            <AddressForm onSubmit={onSubmit} address={address} loading={loading} />
        </section>
    )
}

export default EditAddress
