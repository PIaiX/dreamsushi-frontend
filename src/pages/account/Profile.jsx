import React, {useCallback} from 'react'
import ProfileForm from '../../components/forms/ProfileForm'
import {authRegister} from '../../services/auth'

const Profile = () => {
    const submit = useCallback((data) => {
        authRegister(data)
            .then((res) => {
                if (res.status === 200) {
                    // setActiveModal('activateAccount')
                    // setSubmittedData(data)
                } else {
                    // ! error alert
                }
            })
            .catch((error) => {})
    }, [])

    return (
        <section className="profile">
            <ProfileForm onSubmit={submit} />
        </section>
    )
}

export default Profile
