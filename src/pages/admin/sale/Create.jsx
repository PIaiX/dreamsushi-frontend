import React, {useCallback} from 'react'
import {createSale} from '../../../services/admin'
import SaleForm from '../../../components/forms/admin/SaleForm'
import {useNavigate} from 'react-router-dom'
import {dispatchAlert, dispatchApiErrorAlert} from '../../../helpers/alert'
import {apiResponseMessages} from '../../../config/api'

const CreateSale = () => {
    const navigate = useNavigate()

    const onSubmit = useCallback((data) => {
        createSale(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', apiResponseMessages.ADMIN_SALE_CREATE)
                    navigate('/admin/sales')
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    return (
        <section className="profile">
            <h1>Добавить акцию</h1>
            <SaleForm onSubmit={onSubmit} />
        </section>
    )
}

export default CreateSale
