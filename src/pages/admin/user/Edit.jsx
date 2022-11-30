import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {editUser, getUser} from '../../../services/admin'
import UserForm from '../../../components/forms/admin/UserForm'
import {dispatchAlert, dispatchApiErrorAlert} from '../../../helpers/alert'
import Loader from '../../../components/UI/Loader'
import Info from '../../../components/UI/Info'
import {apiResponseMessages} from '../../../config/api'
import ComplaintTable from '../../../components/forms/admin/table/ComplaintTable'
import OrderTable from '../../../components/forms/admin/table/OrderTable'

const EditUser = () => {
    const {userId} = useParams()
    const [user, setUser] = useState({
        isLoaded: false,
        error: null,
        data: {},
    })

    useEffect(() => {
        getUser(userId)
            .then(
                (res) =>
                    res &&
                    setUser((prev) => ({
                        ...prev,
                        isLoaded: true,
                        data: res.user,
                    }))
            )
            .catch((error) => error && setUser((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    const onSubmit = useCallback((data) => {
        editUser(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', apiResponseMessages.ADMIN_USER_EDIT)
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    if (!user.isLoaded) {
        return <Loader full />
    }
    if (!user) {
        return (
            <Info className="d-flex flex-column align-items-center justify-content-center account-info">
                Такого клиента нет
            </Info>
        )
    }

    return (
        <section className="profile">
            <h1>Редактировать клиента</h1>
            <UserForm onSubmit={onSubmit} user={user.data} />
            <div className="my-5">
                <OrderTable userId={user.data.id} />
            </div>
            <div className="my-5">
                <ComplaintTable userId={user.data.id} />
            </div>
        </section>
    )
}

export default EditUser
