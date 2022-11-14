import React, {useCallback} from 'react'
import {createNotification} from '../../../services/admin'
import {useNavigate} from 'react-router-dom'
import {dispatchAlert, dispatchApiErrorAlert} from '../../../helpers/alert'
import {apiResponseMessages} from '../../../config/api'
import NotificationForm from '../../../components/forms/admin/NotificationForm'

const СreateNotification = () => {
    const navigate = useNavigate()

    const onSubmit = useCallback((data) => {
        createNotification(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', apiResponseMessages.ADMIN_NOTIFICATION_CREATE)
                    navigate('/admin/notifications')
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    return (
        <section className="profile">
            <h1>Добавить уведомление</h1>
            <NotificationForm onSubmit={onSubmit} />
        </section>
    )
}

export default СreateNotification
