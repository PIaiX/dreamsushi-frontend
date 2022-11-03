import React, {useCallback} from 'react'
import ProfileForm from '../../components/forms/ProfileForm'
import {editAccount} from '../../services/account'
import {setAlert} from '../../store/reducers/alertSlice'
import {useDispatch} from 'react-redux'
import defineErrorByType from '../../helpers/defineErrorByType'

const Profile = () => {
    const dispatch = useDispatch()

    const onSubmit = useCallback((data) => {
        editAccount(data)
            .then((res) => {
                if (res.status === 200) {
                    console.log(data)
                }
            })
            .catch((error) => {
                dispatch(
                    setAlert({
                        variant: 'danger',
                        message: defineErrorByType(error),
                    })
                )
            })
    }, [])

    return (
        <section className="profile">
            <h1>Мой профиль</h1>
            <ProfileForm onSubmit={onSubmit} />
        </section>
    )
}

export default Profile
