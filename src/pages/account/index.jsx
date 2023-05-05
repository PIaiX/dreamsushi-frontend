import React, {useCallback} from 'react'
import ProfileForm from '../../components/forms/ProfileForm'
import {editAccount} from '../../services/account'
import {MetaTags} from 'react-meta-tags'
import {useDispatch} from 'react-redux'
import {setUser} from '../../store/reducers/authSlice'
import {dispatchAlert} from '../../helpers/alert'

const Profile = () => {
    const dispatch = useDispatch()
    const onSubmit = useCallback((data) => {
        dispatch(setUser(data))
        editAccount(data).then(() => {
            return dispatchAlert('success', 'Данные успешно сохранены')
        })
    }, [])

    return (
        <section className="profile">
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — Профиль</title>
                <meta property="title" content={process.env.REACT_APP_SITE_NAME + ' — Профиль'} />
                <meta property="og:title" content={process.env.REACT_APP_SITE_NAME + ' — Профиль'} />
            </MetaTags>
            <h1>Мой профиль</h1>
            <ProfileForm onSubmit={onSubmit} />
        </section>
    )
}

export default Profile
