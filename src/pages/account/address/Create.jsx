import React, {useCallback} from 'react'
import {editAccount} from '../../../services/account'
import {setAlert} from '../../../store/reducers/alertSlice'
import {useDispatch} from 'react-redux'
import defineErrorByType from '../../../helpers/defineErrorByType'
import AddressForm from '../../../components/forms/AddressForm'

const CreateAddress = () => {
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
            <h1>Добавить адрес</h1>
            <AddressForm onSubmit={onSubmit} />
        </section>
    )
}

export default CreateAddress
