import React from 'react'
import {Form, Row, Col} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import Button from '../UI/Button'

const AddressForm = ({onSubmit, address = {}, loading}) => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        getValues,
    } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        defaultValues: {
            id: address.id,
            title: address.title ?? '',
            street: address.street ?? '',
            home: address.home ?? '',
            entrance: address.entrance ?? '',
            floor: address.floor ?? '',
            apartment: address.apartment ?? '',
        },
    })

    return (
        <Form className="profile-edit" onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-4">
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            placeholder="Например, Работа"
                            {...register('title', {maxLength: {value: 250, message: 'Максимум 250 символов'}})}
                        />
                        {errors.title && <Form.Text className="text-danger">{errors?.title?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={8}>
                    <Form.Group className="mb-4">
                        <Form.Label>
                            Улица <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            placeholder="Введите улицу"
                            {...register('street', {
                                required: 'Обязательное поле',
                                maxLength: {value: 150, message: 'Максимум 150 символов'},
                            })}
                        />
                        {errors.street && <Form.Text className="text-danger">{errors?.street?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-4">
                        <Form.Label>
                            Дом <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            placeholder="Введите дом"
                            {...register('home', {
                                required: 'Обязательное поле',
                                maxLength: {value: 8, message: 'Максимум 8 символов'},
                            })}
                        />
                        {errors.home && <Form.Text className="text-danger">{errors?.home?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>
                            Квартира <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            placeholder="Введите квартиру"
                            {...register('apartment', {
                                required: 'Обязательное поле',
                                maxLength: {value: 8, message: 'Максимум 8 символов'},
                            })}
                        />
                        {errors.apartment && (
                            <Form.Text className="text-danger">{errors?.apartment?.message}</Form.Text>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>
                            Подъезд <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            placeholder="Введите подъезд"
                            {...register('entrance', {
                                required: 'Обязательное поле',
                                maxLength: {value: 8, message: 'Максимум 8 символов'},
                            })}
                        />
                        {errors.entrance && (
                            <Form.Text className="text-danger">{errors?.entrance?.message}</Form.Text>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>
                            Этаж <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            placeholder="Введите этаж"
                            {...register('floor', {
                                required: 'Обязательное поле',
                                maxLength: {value: 3, message: 'Максимум 3 символов'},
                            })}
                        />
                        {errors.floor && <Form.Text className="text-danger">{errors?.floor?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Код двери</Form.Label>
                        <Form.Control
                            placeholder="Введите код двери"
                            {...register('code', {
                                maxLength: {value: 12, message: 'Максимум 12 символов'},
                            })}
                        />
                        {errors.code && <Form.Text className="text-danger">{errors?.code?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Check className="mb-4">
                        <Form.Check.Input
                            type="checkbox"
                            name="main"
                            id="main"
                            value={1}
                            defaultChecked={getValues('sex')}
                            {...register('main')}
                        />
                        <Form.Check.Label htmlFor="main" className="ms-2">
                            Адрес по умолчанию
                        </Form.Check.Label>
                    </Form.Check>
                </Col>
            </Row>
            <Form.Group className="mb-4">
                <Button type="submit" className="btn-2" disabled={!isValid}>
                    {address.length > 0 ? 'Сохранить изменения' : 'Сохранить'}
                </Button>
            </Form.Group>
        </Form>
    )
}

export default AddressForm
