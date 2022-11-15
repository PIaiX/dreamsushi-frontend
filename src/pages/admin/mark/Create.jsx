import React, {useCallback} from 'react'
import {createMark} from '../../../services/admin'
import MarkForm from '../../../components/forms/admin/MarkForm'
import {useNavigate} from 'react-router-dom'
import {dispatchAlert, dispatchApiErrorAlert} from '../../../helpers/alert'
import {apiResponseMessages} from '../../../config/api'

const CreateMark = () => {
    const navigate = useNavigate()

    const onSubmit = useCallback((data) => {
        createMark(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', apiResponseMessages.ADMIN_MARK_CREATE)
                    navigate('/admin/marks')
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    return (
        <section className="profile">
            <h1>Добавить адрес</h1>
            <MarkForm onSubmit={onSubmit} />
        </section>
    )
}

export default CreateMark
