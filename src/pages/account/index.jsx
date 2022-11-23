import React, {useCallback, useState} from 'react'
import ProfileForm from '../../components/forms/ProfileForm'
import {editAccount} from '../../services/account'
import {dispatchAlert, dispatchApiErrorAlert} from '../../helpers/alert'
import {MetaTags} from 'react-meta-tags'

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
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — Профиль</title>
                <meta property="title" content={process.env.REACT_APP_SITE_NAME + ' — Профиль'} />
                <meta property="og:title" content={process.env.REACT_APP_SITE_NAME + ' — Профиль'} />
            </MetaTags>
            <h1>Мой профиль</h1>
            <ProfileForm onSubmit={onSubmit} loading={loading} />
        </section>
    )
}

export default Profile
