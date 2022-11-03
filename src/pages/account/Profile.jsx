import React, {useCallback, useState} from 'react'
import ProfileForm from '../../components/forms/ProfileForm'
import {editAccount} from '../../services/account'
import {dispatchApiErrorAlert, dispatchAlert} from '../../helpers/alert'

const Profile = () => {
    const [loading, setLoading] = useState(false)

    const onSubmit = useCallback((data) => {
        setLoading(true)
        editAccount(data)
            .then((res) => {
                if (res.type === 'SUCCESS') {
                    dispatchAlert('success', 'Данные успешно сохранены')
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert('danger', error)
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <section className="profile">
            <h1>Мой профиль</h1>
            <ProfileForm onSubmit={onSubmit} loading={loading} />
        </section>
    )
}

export default Profile
