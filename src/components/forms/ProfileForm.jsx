import moment from 'moment'
import React from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import Button from '../UI/Button'
import {customPhone} from '../../helpers/profile'

const ProfileForm = ({onSubmit, loading}) => {
    const {user} = useSelector((state) => state?.auth)

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        control,
        getValues,
    } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        defaultValues: {
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            birthday: user.birthday ? moment(user.birthday).format('YYYY-MM-DD') : '',
            sex: user.sex ?? '',
        },
    })

    return (
        <Form className="profile-edit" onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="firstName"
                            placeholder="Введите имя"
                            {...register('firstName', {required: 'Обязательное поле'})}
                        />
                        {errors.firstName && (
                            <Form.Text className="text-danger">{errors?.firstName?.message}</Form.Text>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control type="lastName" placeholder="Введите фамилию" {...register('lastName')} />
                        {errors.lastName && (
                            <Form.Text className="text-danger">{errors?.lastName?.message}</Form.Text>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Номер телефона</Form.Label>
                        <Form.Control readOnly={true} placeholder="Номер телефона" defaultValue={customPhone(user.phone)} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>День рождения</Form.Label>
                        <Form.Control type="date" {...register('birthday')} readOnly={getValues('birthday')} />
                        {errors.birthday ? (
                            <Form.Text className="text-danger">{errors?.birthday?.message}</Form.Text>
                        ) : (
                            <Form.Text>День рождения нельзя изменить после сохраенния данных</Form.Text>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Label>Пол</Form.Label>
                    <div className="d-flex flex-row align-items-center">
                        <Form.Check className="mb-4">
                            <Form.Check.Input
                                type="radio"
                                name="sex"
                                id="sex-man"
                                value="man"
                                defaultChecked={getValues('sex') === 'man'}
                                {...register('sex')}
                            />
                            <Form.Check.Label htmlFor="sex-man" className="ms-2">
                                Мужской
                            </Form.Check.Label>
                        </Form.Check>
                        <Form.Check className="mb-4 ms-4">
                            <Form.Check.Input
                                type="radio"
                                name="sex"
                                value="woman"
                                id="sex-woman"
                                defaultChecked={getValues('sex') === 'woman'}
                                {...register('sex')}
                            />
                            <Form.Check.Label htmlFor="sex-woman" className="ms-2">
                                Женский
                            </Form.Check.Label>
                        </Form.Check>
                    </div>
                </Col>
            </Row>
            <Form.Group className="mb-4">
                <Button type="submit" className="btn-2" disabled={!isValid} isLoading={loading}>
                    Сохранить изменения
                </Button>
            </Form.Group>
        </Form>
    )
}

export default ProfileForm
