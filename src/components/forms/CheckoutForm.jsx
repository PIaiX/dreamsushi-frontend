import moment from 'moment'
import React from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import {Link} from 'react-router-dom'

const CheckoutForm = ({onSubmit, address = {}, loading}) => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        watch,
        getValues,
        control,
        setValue,
    } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        defaultValues: {
            firsName: '',
            phone: '',
            time: '',
            defaultTime: moment().format('kk:mm'),
            typeDelivery: 'delivery',
            payment: 'online',
            comment: '',

            // Если нет адреса
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
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            placeholder="Введите имя"
                            {...register('firstName', {
                                required: 'Обязательное поле',
                                maxLength: {value: 30, message: 'Максимум 30 символов'},
                            })}
                        />
                        {errors.firstName && (
                            <Form.Text className="text-danger">{errors?.firstName?.message}</Form.Text>
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
                                    message: 'Обязательное поле',
                                },
                            }}
                        />
                        {errors.phone && <Form.Text className="text-danger">{errors.phone.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            placeholder="Введите email"
                            {...register('email', {
                                required: 'Обязательное поле',
                                maxLength: {value: 250, message: 'Максимум 250 символов'},
                            })}
                        />
                        {errors.email && <Form.Text className="text-danger">{errors?.email?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group className="mb-4 toggle-btns">
                        <button
                            type="button"
                            className={watch('typeDelivery') == 'delivery' ? 'btn active' : 'btn'}
                            onClick={() => setValue('typeDelivery', 'delivery')}
                        >
                            Доставка
                        </button>
                        <button
                            type="button"
                            className={watch('typeDelivery') == 'pickup' ? 'btn active' : 'btn'}
                            onClick={() => setValue('typeDelivery', 'pickup')}
                        >
                            Самовывоз
                        </button>
                    </Form.Group>
                </Col>
                {watch('typeDelivery') == 'delivery' ? (
                    <Row>
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
                                {errors.street && (
                                    <Form.Text className="text-danger">{errors?.street?.message}</Form.Text>
                                )}
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
                                {errors.home && (
                                    <Form.Text className="text-danger">{errors?.home?.message}</Form.Text>
                                )}
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
                                {errors.floor && (
                                    <Form.Text className="text-danger">{errors?.floor?.message}</Form.Text>
                                )}
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
                                {errors.code && (
                                    <Form.Text className="text-danger">{errors?.code?.message}</Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Check className="mb-4">
                                <Form.Check.Input
                                    type="checkbox"
                                    id="save"
                                    value={1}
                                    defaultChecked={getValues('save')}
                                    {...register('save')}
                                />
                                <Form.Check.Label htmlFor="save" className="ms-2">
                                    Сохранить адрес по умолчанию
                                </Form.Check.Label>
                            </Form.Check>
                        </Col>
                    </Row>
                ) : (
                    <Form.Group className="mb-4">
                        <Form.Label>Адрес ресторана</Form.Label>
                        <Row xs={1} md={2} className="g-3 g-sm-4">
                            <Col>
                                <Form.Check className="mb-4">
                                    <Form.Check.Input
                                        type="radio"
                                        id="institution"
                                        value={1}
                                        defaultChecked={getValues('institution')}
                                        {...register('institution')}
                                    />
                                    <Form.Check.Label htmlFor="institution" className="d-flex flex-column ms-3">
                                        <div className="fs-11">ул. Юлиуса Фучика, 88А</div>
                                        <div className="fs-09 mt-2">Советский р-н</div>
                                        <div className="fs-09 font-faded mt-2">Открыто до 22:30</div>
                                    </Form.Check.Label>
                                </Form.Check>
                            </Col>
                            <Col>
                                <Form.Check className="mb-4">
                                    <Form.Check.Input
                                        type="radio"
                                        id="institution"
                                        value={2}
                                        defaultChecked={getValues('institution')}
                                        {...register('institution')}
                                    />
                                    <Form.Check.Label htmlFor="institution" className="d-flex flex-column ms-3">
                                        <div className="fs-11">ул. Гагарина, 93</div>
                                        <div className="fs-09 mt-2">Московский р-н</div>
                                        <div className="fs-09 font-faded mt-2">Открыто до 22:00</div>
                                    </Form.Check.Label>
                                </Form.Check>
                            </Col>
                        </Row>
                    </Form.Group>
                )}
                <Col md={12}>
                    <Link to="confirmation" className="btn-2 mt-4 mt-sm-5">
                        Оформить заказ за 3 469 ₽
                    </Link>
                </Col>
            </Row>
        </Form>
    )
}

export default CheckoutForm
