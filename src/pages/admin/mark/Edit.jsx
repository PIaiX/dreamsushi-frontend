import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {editAddress, getAddress} from '../../../services/account'
import AddressForm from '../../../components/forms/AddressForm'
import {dispatchAlert, dispatchApiErrorAlert} from '../../../helpers/alert'
import Loader from '../../../components/UI/Loader'
import Info from '../../../components/UI/Info'
import {apiResponseMessages} from '../../../config/api'

const EditAddress = () => {
    const {addressId} = useParams()
    const [address, setAddress] = useState({
        isLoaded: false,
        error: null,
        data: {},
    })

    useEffect(() => {
        getAddress(addressId)
            .then(
                (res) =>
                    res &&
                    setAddress((prev) => ({
                        ...prev,
                        isLoaded: true,
                        data: res.address,
                    }))
            )
            .catch((error) => error && setAddress((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    const onSubmit = useCallback((data) => {
        editAddress(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', apiResponseMessages.ACCOUNT_ADDRESS_EDIT)
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    if (!address.isLoaded) {
        return <Loader full />
    }
    if (!address) {
        return (
            <Info className="d-flex flex-column align-items-center justify-content-center account-info">
                Такого адреса нет
            </Info>
        )
    }

    return (
        <section className="profile">
            <h1>Редактировать адрес</h1>
            <AddressForm onSubmit={onSubmit} address={address.data} />
        </section>
    )
}

export default EditAddress
