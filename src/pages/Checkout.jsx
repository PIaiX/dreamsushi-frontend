import React, {useCallback, useEffect, useState} from 'react'
import {Col, Container, Form, Row} from 'react-bootstrap'
import {Controller, useForm, useWatch} from 'react-hook-form'
import {IoCheckmarkCircle} from 'react-icons/io5'
import PhoneInput from 'react-phone-input-2'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import AddressForm from '../components/forms/AddressForm'
import OrderFree from '../components/OrderFree'
import Button from '../components/UI/Button'
import Loader from '../components/UI/Loader'
import CustomModal from '../components/utils/CustomModal'
import {apiResponseMessages} from '../config/api'
import {dispatchAlert, dispatchApiErrorAlert} from '../helpers/alert'
import defineDeliveryZone from '../helpers/defineDeliveryZone'
import {customPrice} from '../helpers/product'
import {createAddress, getAddresses} from '../services/account'
import {createOrder} from '../services/order'
import {resetCart} from '../store/reducers/cartSlice'

const Checkout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [end, setEnd] = useState(false)
    const state = useSelector(({auth: {isAuth, user}, cart}) => ({
        isAuth,
        user,
        cart,
    }))
    const countProducts = state?.cart?.items?.length ?? false

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
        getValues,
        watch,
        control,
        reset,
        setError,
        setValue,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onSubmit',
        defaultValues: {
            firstName: state?.user?.firstName ?? '',
            phone: state?.user?.phone ?? '',
            email: state?.user?.email ?? '',
            // time: '',
            typeDelivery: 'delivery',
            payment: 'online',
            person: 1,
            comment: '',

            addressId: false,
            affiliate: '',

            // Сохранение адреса по умолчанию
            save: false,

            products: state?.cart?.items ?? [],

            // Сумма товаров
            productsPrice: 0,

            // Сумма скидки
            discount: 0,

            // Итоговая сумма
            total: 0,
        },
    })
    const data = useWatch({control})

    useEffect(() => {
        if (data?.products?.length > 0) {
            let total = 0
            let productsPrice = 0
            let productsDiscount = 0
            let products = data.products

            //Подсчет цен товаров со скидкой и без
            products.map((e) => {
                productsPrice += e.price
                productsDiscount += e.priceSale
            })

            //Подсчет скидки
            setValue('productsPrice', productsPrice)
            if (productsDiscount > productsPrice) {
                setValue('discount', productsDiscount - productsPrice)
            }

            total = productsPrice

            if (watch('typeDelivery') == 'delivery') {
                total += Number(process.env.REACT_APP_DELIVERY_PRICE)
            }

            //Итоговая сумма с учетом скидки
            setValue('total', total)
        }
    }, [data.typeDelivery])

    const getAddressesData = useCallback(() => {
        if (state.isAuth && countProducts > 0) {
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
        } else {
            setAddresses((prev) => ({...prev, isLoaded: true}))
        }
    }, [])

    useEffect(() => {
        getAddressesData()
    }, [])

    const onSubmit = useCallback((data) => {
        if (data.addressId && addresses?.items?.length > 0) {
            let address = addresses.items.find((e) => e.id == data.addressId)
            let geoInfo = defineDeliveryZone({lat: address.lat, lon: address.lon})
            if (!geoInfo || !geoInfo.status) {
                dispatchAlert('danger', 'По данному адресу доставка не производится')
                setError('affiliate', {type: 'custom', message: 'По данному адресу доставка не производится'})
                return false
            }
            data.affiliate = geoInfo.affiliate
        }
        createOrder(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', apiResponseMessages.ORDER_CREATE)
                    setEnd(true)
                    reset()
                    dispatch(resetCart())
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    const onSaveNewAddress = useCallback((data) => {
        if (state.isAuth) {
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
        } else {
            setAddresses((prev) => ({
                ...prev,
                items: [...prev.items, data],
            }))
            setIsNewAddress(false)
        }
    }, [])

    if (!state && countProducts === 0) {
        navigate(-1)
    }
    if (!addresses.isLoaded) {
        return <Loader full />
    }
    if (end) {
        return (
            <main>
                <Container>
                    <section className="mb-6">
                        <Row className="justify-content-between">
                            <Col md={12} className="mb-5 md-lg-0">
                                <h1>
                                    <IoCheckmarkCircle className="green fs-07" size={30} /> Заказ принят!
                                </h1>
                                <p>Менеджер свяжется с вами в течении пару минут</p>
                                {/* <Row xs={2} className="g-2 gx-sm-4 gy-sm-3 mt-4 mt-sm-5">
                                    <Col className="font-faded">Номер заказа</Col>
                                    <Col>248</Col>
                                    <Col className="font-faded">Статус заказа</Col>
                                    <Col>Новый</Col>
                                    <Col className="font-faded">Время оформления</Col>
                                    <Col>21:04, сегодня</Col>
                                </Row> */}
                            </Col>
                        </Row>
                    </section>
                </Container>
            </main>
        )
    }
    return (
        <main>
            <Container>
                <section className="mb-6">
                    <div className="d-sm-flex align-items-baseline mb-4 mb-sm-5">
                        <h1 className="mb-0">Оформление заказа</h1>
                        <div className="mt-2 mt-sm-0 ms-sm-4">{countProducts} позиции</div>
                    </div>
                    <Row className="justify-content-between">
                        <Col xs={12} lg={7} xxl={6}>
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
                                                <Form.Text className="text-danger">
                                                    {errors?.firstName?.message}
                                                </Form.Text>
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
                                            {errors.phone && (
                                                <Form.Text className="text-danger">{errors.phone.message}</Form.Text>
                                            )}
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
                                            {errors.email && (
                                                <Form.Text className="text-danger">
                                                    {errors?.email?.message}
                                                </Form.Text>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mb-4 toggle-btns">
                                            <button
                                                type="button"
                                                className={
                                                    watch('typeDelivery') == 'delivery' ? 'btn active' : 'btn'
                                                }
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
                                            {addresses?.items?.length > 0 ? (
                                                <Col md={12}>
                                                    <Form.Group className="mb-4">
                                                        {addresses?.items.map((item, index) => {
                                                            return (
                                                                <Form.Check key={item?.id} className="mb-4">
                                                                    <Form.Check.Input
                                                                        type="radio"
                                                                        id={'address-' + (item.id ?? 'key_' + index)}
                                                                        value={item.id}
                                                                        defaultChecked={
                                                                            getValues('addressId') == item.id ||
                                                                            (!getValues('addressId') && index === 0)
                                                                        }
                                                                        {...register('addressId')}
                                                                    />
                                                                    <Form.Check.Label
                                                                        htmlFor={
                                                                            'address-' + (item.id ?? 'key_' + index)
                                                                        }
                                                                        className="d-flex flex-column ms-3"
                                                                    >
                                                                        <div className="fs-11">
                                                                            {item.title ?? item.street}
                                                                        </div>
                                                                        <div className="fs-09 font-faded mt-2">
                                                                            {item.street}
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
                                            <Button
                                                type="button"
                                                className="btn-2"
                                                onClick={() => setIsNewAddress(!isNewAddress)}
                                            >
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
                                                            id="affiliate-1"
                                                            value={145}
                                                            defaultChecked
                                                            {...register('affiliate')}
                                                        />
                                                        <Form.Check.Label
                                                            htmlFor="affiliate-1"
                                                            className="d-flex flex-column ms-3"
                                                        >
                                                            <div className="fs-11">ул. Юлиуса Фучика, 88А</div>
                                                            <div className="fs-09 mt-2">Советский р-н</div>
                                                            <div className="fs-09 font-faded mt-2">
                                                                Открыто до 22:30
                                                            </div>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </Col>
                                                <Col>
                                                    <Form.Check className="mb-4">
                                                        <Form.Check.Input
                                                            type="radio"
                                                            id="affiliate-2"
                                                            value=""
                                                            {...register('affiliate')}
                                                        />
                                                        <Form.Check.Label
                                                            htmlFor="affiliate-2"
                                                            className="d-flex flex-column ms-3"
                                                        >
                                                            <div className="fs-11">ул. Гагарина, 93</div>
                                                            <div className="fs-09 mt-2">Московский р-н</div>
                                                            <div className="fs-09 font-faded mt-2">
                                                                Открыто до 22:00
                                                            </div>
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
                                                <Form.Text className="text-danger">
                                                    {errors?.person?.message}
                                                </Form.Text>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    {/* <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Время подачи</Form.Label>
                                            <Form.Control
                                                type="time"
                                                placeholder="0"
                                                {...register('time', {
                                                    maxLength: {value: 100, message: 'Максимум 100 символов'},
                                                })}
                                            />
                                            {errors.time && (
                                                <Form.Text className="text-danger">
                                                    {errors?.time?.message}
                                                </Form.Text>
                                            )}
                                        </Form.Group>
                                    </Col> */}
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
                                            <Form.Check.Input
                                                type="radio"
                                                id="payment-2"
                                                value="cash"
                                                {...register('payment')}
                                            />
                                            <Form.Check.Label htmlFor="payment-2" className="ms-3">
                                                Наличными
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </Col>
                                </Row>
                            </Form>
                            <CustomModal
                                size="lg"
                                isShow={isNewAddress}
                                setIsShow={setIsNewAddress}
                                title="Добавить адрес"
                            >
                                <AddressForm onSubmit={onSaveNewAddress} classNameButton="w-100" />
                            </CustomModal>
                        </Col>
                        <Col xs={12} lg={5} xxl={4}>
                            <div className="box mt-4 mt-sm-5 mt-lg-0">
                                <div>
                                    <h4 className="mb-2 mb-sm-3">
                                        <span className="main-color me-2">•</span> Ваш заказ
                                    </h4>
                                    <table className="simple">
                                        <tbody>
                                            {state?.cart?.items.map((item) => (
                                                <tr key={item?.id}>
                                                    <td>{item.title}</td>
                                                    <td>{item.count} шт.</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <hr />
                                <div>
                                    <OrderFree />
                                </div>
                                <hr />
                                <div>
                                    <h4 className="mb-2 mb-sm-3">
                                        <span className="main-color me-2">•</span> Детали
                                    </h4>
                                    <table className="simple">
                                        <tbody>
                                            <tr>
                                                <td>{countProducts} позиции</td>
                                                <td>{customPrice(watch('productsPrice'))}</td>
                                            </tr>
                                            {watch('discount') > 0 && (
                                                <tr>
                                                    <td>Скидка</td>
                                                    <td>-{customPrice(watch('discount'))}</td>
                                                </tr>
                                            )}
                                            {watch('typeDelivery') == 'delivery' && (
                                                <tr>
                                                    <td>Доставка</td>
                                                    <td>{customPrice(process.env.REACT_APP_DELIVERY_PRICE)}</td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td>Сумма заказа</td>
                                                <td>{customPrice(watch('total'))}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <Button type="submit" form="checkout" className="btn-2 mt-4 w-100">
                                    Оформить заказ за {customPrice(watch('total'))}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default Checkout
