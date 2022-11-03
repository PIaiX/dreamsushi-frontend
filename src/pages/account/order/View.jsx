import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getOrder} from '../../../services/account'
import {dispatchAlert, dispatchApiErrorAlert} from '../../../helpers/alert'
import Loader from '../../../components/UI/Loader'
import Info from '../../../components/UI/Info'

const OrderView = () => {
    const {orderId} = useParams()
    const [order, setOrder] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getOrder(orderId)
            .then((res) => {
                if (res.type == 'SUCCESS' && res.order) {
                    setOrder(res.order)
                }
            })
            .finally(() => setLoading(!loading))
    }, [])

    const onSubmit = useCallback((data) => {
        editOrder(data)
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
    if (!order) {
        return <Info>Такого адреса нет</Info>
    }

    return <section className="profile"></section>
}

export default OrderView
