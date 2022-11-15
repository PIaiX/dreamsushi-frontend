import React, {useCallback} from 'react'
import {createComplain} from '../../../services/account'
import {dispatchAlert, dispatchApiErrorAlert} from '../../../helpers/alert'
import {apiResponseMessages} from '../../../config/api'
import {useForm} from 'react-hook-form'
import {Col, Form, Row} from 'react-bootstrap'
import Button from '../../../components/UI/Button'

const CreateComplaints = () => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onSubmit',
        defaultValues: {
            title: '',
            desc: '',
            type: 'жалоба',
        },
    })

    const onSubmit = useCallback((data) => {
        createComplain(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', apiResponseMessages.ACCOUNT_COMPLAIN_CREATE)
                    reset()
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    return (
        <section className="profile">
            <h1>Добавить жалобу</h1>
            <Form className="profile-edit" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-4">
                            <Form.Label>Email или номер телефона</Form.Label>
                            <Form.Control
                                placeholder="Ведите название"
                                {...register('user', {
                                    required: 'Обязательное поле',
                                    maxLength: {value: 250, message: 'Максимум 250 символов'},
                                })}
                            />
                            {errors.user && <Form.Text className="text-danger">{errors?.user?.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group className="mb-4">
                            <Form.Label>Тип</Form.Label>
                            <Form.Select {...register('type')} className="form-control">
                                <option value="жалоба" selected="selected">
                                    Жалоба
                                </option>
                                <option value="предлжение">Предложение</option>
                                <option value="пожелание">Пожелание</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group className="mb-4">
                            <Form.Label>Сообщение</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Ведите сообщение"
                                {...register('desc', {
                                    maxLength: {value: 10000, message: 'Максимум 10000 символов'},
                                })}
                            />
                            {errors.desc && <Form.Text className="text-danger">{errors?.desc?.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Button type="submit" className="btn-2" disabled={!isValid}>
                        Отправить
                    </Button>
                </Form.Group>
            </Form>
        </section>
    )
}

export default CreateComplaints
