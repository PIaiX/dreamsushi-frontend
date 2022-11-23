import React from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import {useSelector} from 'react-redux'
import Button from '../UI/Button'

const ProfileForm = ({onSubmit, loading}) => {
    const {user} = useSelector((state) => state?.auth)

    const {
        register,
        formState: {errors, isValid, isDirty},
        handleSubmit,
        control,
        getValues,
    } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        defaultValues: {
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            phone: user.phone ?? '',
            birthday: user.birthday ?? '',
            sex: user.sex ?? 1,
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
                            {...register('firstName', {required: 'введите имя'})}
                        />
                        {errors.firstName && (
                            <Form.Text className="text-danger">{errors?.firstName?.message}</Form.Text>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>фамилию</Form.Label>
                        <Form.Control
                            type="lastName"
                            placeholder="Введите фамилию"
                            {...register('lastName', {required: 'введите фамилию'})}
                        />
                        {errors.lastName && (
                            <Form.Text className="text-danger">{errors?.lastName?.message}</Form.Text>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Номер телефона</Form.Label>
                        <Controller
                            name="phone"
                            control={control}
                            render={({field}) => (
                                <PhoneInput
                                    inputClass="phone-input"
                                    country={'ru'}
                                    placeholder="Номер телефона"
                                    specialLabel={null}
                                    value={getValues('phone')}
                                    onChange={(phone) => field.onChange(phone)}
                                />
                            )}
                            rules={{
                                required: 'Заполните поле',
                                minLength: {
                                    value: 11,
                                    message: 'введите номер до конца',
                                },
                            }}
                        />
                        {errors.phone && <Form.Text className="text-danger">{errors.phone.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>День рождения</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Введите имя"
                            {...register('birthday')}
                            readOnly={getValues('birthday')}
                        />
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
                                value={1}
                                defaultChecked={getValues('sex') === 1 || getValues('sex') === 0}
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
                                value={2}
                                id="sex-woman"
                                defaultChecked={getValues('sex') === 2}
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
                <Button type="submit" className="btn-2" disabled={!isValid || !isDirty} isLoading={loading}>
                    Сохранить изменения
                </Button>
            </Form.Group>
        </Form>
    )
}

export default ProfileForm
