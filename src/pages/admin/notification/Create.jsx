import React, {useCallback} from 'react'
import {createAddress} from '../../../services/account'
import AddressForm from '../../../components/forms/AddressForm'
import {useNavigate} from 'react-router-dom'
import {dispatchAlert, dispatchApiErrorAlert} from '../../../helpers/alert'
import {apiResponseMessages} from '../../../config/api'

const CreateAddress = () => {
    const navigate = useNavigate()

    const onSubmit = useCallback((data) => {
        createAddress(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', apiResponseMessages.ADMIN_NOTIFICATION_CREATE)
                    navigate('/account/addresses')
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    return (
        <section className="profile">
            <h1>Добавить адрес</h1>
            <AddressForm onSubmit={onSubmit} />
        </section>
    )
}

export default CreateAddress
