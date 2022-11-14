import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import SaleForm from '../../../components/forms/admin/SaleForm'
import Info from '../../../components/UI/Info'
import Loader from '../../../components/UI/Loader'
import {apiResponseMessages} from '../../../config/api'
import {dispatchAlert, dispatchApiErrorAlert} from '../../../helpers/alert'
import {editSale, getSale} from '../../../services/admin'

const EditSale = () => {
    const {saleId} = useParams()
    const [sale, setSale] = useState({
        isLoaded: false,
        error: null,
        data: {},
    })

    useEffect(() => {
        getSale(saleId)
            .then(
                (res) =>
                    res &&
                    setSale((prev) => ({
                        ...prev,
                        isLoaded: true,
                        data: res.sale,
                    }))
            )
            .catch((error) => error && setSale((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    const onSubmit = useCallback((data) => {
        editSale(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', apiResponseMessages.ADMIN_SALE_EDIT)
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    if (!sale.isLoaded) {
        return <Loader full />
    }
    if (!sale.data) {
        return (
            <Info className="d-flex flex-column align-items-center justify-content-center account-info">
                Такой акции нет
            </Info>
        )
    }

    return (
        <section className="profile">
            <h1>Редактировать акцию</h1>
            <SaleForm onSubmit={onSubmit} sale={sale.data} />
        </section>
    )
}

export default EditSale
