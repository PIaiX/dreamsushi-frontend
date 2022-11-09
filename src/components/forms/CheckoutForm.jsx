import moment from 'moment'
import React, {useEffect, useState, useCallback} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import {useSelector} from 'react-redux'
import {apiResponseMessages} from '../../config/api'
import {dispatchAlert, dispatchApiErrorAlert} from '../../helpers/alert'
import {createAddress, getAddresses} from '../../services/account'
import Button from '../UI/Button'
import Loader from '../UI/Loader'
import CustomModal from '../utils/CustomModal'
import AddressForm from './AddressForm'

const CheckoutForm = ({onSubmit}) => {
    const state = useSelector(({auth: {isAuth, user}, cart}) => ({
        isAuth,
        user,
        cart,
    }))
    const [addresses, setAddresses] = useState({
        isLoaded: false,
        error: false,
        items: [],
    })
    const [isNewAddress, setIsNewAddress] = useState(false)

    const {
        register,
        formState: {errors},
        handleSubmit,
        watch,
        getValues,
        control,
        setValue,
    } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        defaultValues: {
            firstName: state?.user?.firstName ?? '',
            phone: state?.user?.phone ?? '',
            email: state?.user?.email ?? '',
            time: '',
            typeDelivery: 'delivery',
            payment: 'online',
            person: 1,
            comment: '',

            // Ресторан для самовывоза
            institution: 1,

            addressId: false,

            // Сохранение адреса по умолчанию
            save: false,

            products: state?.cart ?? [],
        },
    })

    const getAddressesData = useCallback(() => {
        getAddresses()
            .then((res) => {
                if (res) {
                    setAddresses((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res.addresses,
                    }))
                    setValue('addressId', res.addresses[0]?.id)
                }
            })
            .catch((error) => error && setAddresses((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    useEffect(() => {
        getAddressesData()
    }, [])

    const onSaveNewAddress = useCallback((data) => {
        createAddress(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', apiResponseMessages.ACCOUNT_ADDRESS_CREATE)
                    getAddressesData()
                    setIsNewAddress(false)
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    if (!addresses.isLoaded) {
        return <Loader full />
    }

    return (
        <>
            <Form className="profile-edit" id="checkout" onSubmit={handleSubmit(onSubmit)}>
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
                        <Form.Group className="mb-4">
                            {state.isAuth && addresses?.items.length > 0 ? (
                                <Col md={12}>
                                    <Form.Group className="mb-4">
                                        {addresses?.items.map((item) => {
                                            return (
                                                <Form.Check className="mb-4">
                                                    <Form.Check.Input
                                                        type="radio"
                                                        id={'address-' + item.id}
                                                        value={item.id}
                                                        defaultChecked={getValues('addressId') == item.id}
                                                        {...register('addressId')}
                                                    />
                                                    <Form.Check.Label
                                                        htmlFor={'address-' + item.id}
                                                        className="d-flex flex-column ms-3"
                                                    >
                                                        <div className="fs-11">{item.title ?? item.street}</div>
                                                        <div className="fs-09 font-faded mt-2">
                                                            {item.street} {item.home}
                                                        </div>
                                                    </Form.Check.Label>
                                                </Form.Check>
                                            )
                                        })}
                                    </Form.Group>
                                </Col>
                            ) : (
                                <p className="mb-3">Нет сохраненных адресов</p>
                            )}
                            <Button type="button" className="btn-2" onClick={() => setIsNewAddress(!isNewAddress)}>
                                Добавить новый адрес
                            </Button>
                        </Form.Group>
                    ) : (
                        <Form.Group className="mb-4">
                            <Form.Label>Адрес ресторана</Form.Label>
                            <Row xs={1} md={2} className="g-3 g-sm-4">
                                <Col>
                                    <Form.Check className="mb-4">
                                        <Form.Check.Input
                                            type="radio"
                                            id="institution-1"
                                            value={1}
                                            defaultChecked
                                            {...register('institution')}
                                        />
                                        <Form.Check.Label
                                            htmlFor="institution-1"
                                            className="d-flex flex-column ms-3"
                                        >
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
                                            id="institution-2"
                                            value={2}
                                            {...register('institution')}
                                        />
                                        <Form.Check.Label
                                            htmlFor="institution-2"
                                            className="d-flex flex-column ms-3"
                                        >
                                            <div className="fs-11">ул. Гагарина, 93</div>
                                            <div className="fs-09 mt-2">Московский р-н</div>
                                            <div className="fs-09 font-faded mt-2">Открыто до 22:00</div>
                                        </Form.Check.Label>
                                    </Form.Check>
                                </Col>
                            </Row>
                        </Form.Group>
                    )}
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label>Количество персон</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="0"
                                {...register('person', {
                                    maxLength: {value: 100, message: 'Максимум 100 символов'},
                                })}
                            />
                            {errors.person && (
                                <Form.Text className="text-danger">{errors?.person?.message}</Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4">
                            <Form.Label>Время подачи</Form.Label>
                            <Form.Control
                                type="time"
                                placeholder="0"
                                {...register('time', {
                                    maxLength: {value: 100, message: 'Максимум 100 символов'},
                                })}
                            />
                            {errors.time && <Form.Text className="text-danger">{errors?.time?.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Label className="mb-4">Способ оплаты</Form.Label>
                        <Form.Check className="mb-4">
                            <Form.Check.Input
                                type="radio"
                                id="payment-1"
                                value="online"
                                defaultChecked
                                {...register('payment')}
                            />
                            <Form.Check.Label htmlFor="payment-1" className="ms-3">
                                Онлайн на сайте
                            </Form.Check.Label>
                        </Form.Check>
                        <Form.Check className="mb-4">
                            <Form.Check.Input type="radio" id="payment-2" value="cash" {...register('payment')} />
                            <Form.Check.Label htmlFor="payment-2" className="ms-3">
                                Наличными
                            </Form.Check.Label>
                        </Form.Check>
                    </Col>
                </Row>
            </Form>
            <CustomModal isShow={isNewAddress} setIsShow={setIsNewAddress} title="Добавить адрес">
                <AddressForm onSubmit={onSaveNewAddress} />
            </CustomModal>
        </>
    )
}

export default CheckoutForm
