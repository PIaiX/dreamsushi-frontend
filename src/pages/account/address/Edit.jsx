import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {editAddress, getAddress} from '../../../services/account'
import AddressForm from '../../../components/forms/AddressForm'
import {dispatchAlert} from '../../../helpers/alert'
import Loader from '../../../components/UI/Loader'
import Info from '../../../components/UI/Info'
import {apiResponseMessages} from '../../../config/api'
import {MetaTags} from 'react-meta-tags'
import {updateAddress} from '../../../store/reducers/addressSlice'
import { useDispatch } from 'react-redux'

const EditAddress = () => {
    const dispatch = useDispatch()
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
        editAddress(data).then((res) => {
            if (res.type == 'SUCCESS') {
                dispatch(updateAddress(res.address))
                dispatchAlert('success', apiResponseMessages.ACCOUNT_ADDRESS_EDIT)
            }
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
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — Редактировать адрес</title>
                <meta property="title" content={process.env.REACT_APP_SITE_NAME + ' — Редактировать адрес'} />
                <meta property="og:title" content={process.env.REACT_APP_SITE_NAME + ' — Редактировать адрес'} />
            </MetaTags>
            <h1>Редактировать адрес</h1>
            <AddressForm onSubmit={onSubmit} address={address.data} />
        </section>
    )
}

export default EditAddress
