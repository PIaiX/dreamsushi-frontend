import React, {useCallback} from 'react'
import {createAddress} from '../../../services/account'
import AddressForm from '../../../components/forms/AddressForm'
import {useNavigate} from 'react-router-dom'
import {dispatchAlert, dispatchApiErrorAlert} from '../../../helpers/alert'
import {apiResponseMessages} from '../../../config/api'
import {MetaTags} from 'react-meta-tags'

const CreateAddress = () => {
    const navigate = useNavigate()

    const onSubmit = useCallback((data) => {
        createAddress(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', apiResponseMessages.ACCOUNT_ADDRESS_CREATE)
                    navigate('/account/addresses')
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    return (
        <section className="profile">
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — Добавить адрес</title>
                <meta property="title" content={process.env.REACT_APP_SITE_NAME + ' — Добавить адрес'} />
                <meta property="og:title" content={process.env.REACT_APP_SITE_NAME + ' — Добавить адрес'} />
            </MetaTags>
            <h1>Добавить адрес</h1>
            <AddressForm onSubmit={onSubmit} />
        </section>
    )
}

export default CreateAddress
