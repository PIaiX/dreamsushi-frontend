import React, {useCallback} from 'react'
import ProfileForm from '../../components/forms/ProfileForm'
import {editAccount} from '../../services/account'
import {setAlert} from '../../store/reducers/alertSlice'
import {useDispatch} from 'react-redux'
import defineErrorByType from '../../helpers/defineErrorByType'

const Profile = () => {
    const dispatch = useDispatch()

    const submit = useCallback((data) => {
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
            <ProfileForm onSubmit={submit} />
        </section>
    )
}

export default Profile
