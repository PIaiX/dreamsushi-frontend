import moment from 'moment'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Col, Container, Form, Row} from 'react-bootstrap'
import {Controller, useForm, useWatch} from 'react-hook-form'
import {IoCheckmarkCircle} from 'react-icons/io5'
import {MetaTags} from 'react-meta-tags'
import PhoneInput from 'react-phone-input-2'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
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
import {resetCheckout, setCheckout} from '../store/reducers/checkoutSlice'
import {getProduct} from '../services/product'
import {cartCreate, cartDelete, cartEdit} from '../services/RTK/cart'

const stickId = 102 // id палочек

const Checkout = () => {
    const dispatch = useDispatch()
    const [end, setEnd] = useState(false)
    const state = useSelector(({auth: {isAuth, user}, cart, checkout: {checkout}}) => ({
        isAuth,
        user,
        cart,
        checkout,
    }))
    const countProducts = state?.cart?.items?.length ?? false

    const [isShowSticksModal, setIsShowSticksModal] = useState(false)
    const [addresses, setAddresses] = useState({
        isLoaded: false,
        error: false,
        items: [],
    })
    const [stick, setStick] = useState({
        isLoaded: false,
        error: null,
        item: null,
    })
    const [isNewAddress, setIsNewAddress] = useState(false)
    const [loading, setLoading] = useState(false)
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        getValues,
        watch,
        control,
        reset,
        setError,
        setValue,
    } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        defaultValues: {
            firstName: state?.checkout?.firstName ?? state?.user?.firstName ?? '',
            phone: state?.checkout?.phone ?? state?.user?.phone ?? '',
            serving: state?.checkout?.serving ?? '',
            radioServing: state?.checkout?.radioServing ?? 1,
            typeDelivery: state?.checkout?.typeDelivery ?? 'delivery',
            payment: state?.checkout?.payment ?? 'online',
            person: state?.checkout?.person ?? 0,
            comment: state?.checkout?.comment ?? '',

            addressId: state?.checkout?.addressId ?? false,
            address: state?.checkout?.address ?? false,
            affiliate: state?.checkout?.affiliate ?? '',

            // Сохранение адреса по умолчанию
            save: state?.checkout?.save ?? false,

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

    const cartStickItem = useMemo(() => {
        const cartItems = state?.cart?.items

        if (cartItems?.length) return cartItems.find((item) => item.id === stickId)
    }, [state.cart, stickId])

    useEffect(() => {
        if (state?.cart?.items?.length > 0) {
            let total = 0
            let productsPrice = 0
            let productsDiscount = 0
            let products = state.cart.items
            let person = 0
            //Подсчет цен товаров со скидкой и без
            products.map((e) => {
                productsPrice += e.price * e.count
                productsDiscount += e.priceSale * e.count
                person += e.sticks * e.count
            })

            //Подсчет скидки
            setValue('productsPrice', productsPrice)
            if (productsDiscount > productsPrice) {
                setValue('discount', productsDiscount - productsPrice)
            }

            total = productsPrice

            // if (watch('typeDelivery') == 'delivery') {
            //     total += Number(process.env.REACT_APP_DELIVERY_PRICE)
            // }

            //Итоговая сумма с учетом скидки
            setValue('total', total)
            setValue('products', products)
        }
    }, [data.typeDelivery, state.cart.items])

    useEffect(() => {
        if (state?.cart?.items?.length > 0) {
            let person = 0
            state.cart.items.map((e) => {
                person += e.sticks * e.count
            })

            // Добавление палочек
            if (person > 0) {
                setValue('person', person)
            }
        }
    }, [])

    useEffect(() => {
        var personData = Number(data.person)
        if (stick && state?.cart?.items?.length > 0 && data?.person) {
            var personLocal = 0
            state.cart.items.map((e) => {
                if (e.id != stickId) {
                    personLocal += e.sticks * e.count
                }
            })

            const count = stick?.item?.count

            if (personData > personLocal) {
                var countPerson = personData - personLocal
                if (count === 0 && !cartStickItem) {
                    setIsShowSticksModal(true)
                } else {
                    dispatch(
                        cartEdit({
                            productId: stickId,
                            count: countPerson,
                        })
                    )
                }
            } else if (count === 1 || personData <= personLocal) {
                dispatch(cartDelete({productId: stickId}))
            }
        }
    }, [stick])

    useEffect(() => {
        getSticks()
    }, [data.person])

    useEffect(() => {
        if (data) dispatch(setCheckout(data))
    }, [data])

    const getAddressesData = useCallback(() => {
        if (state.isAuth && countProducts > 0) {
            getAddresses()
                .then((res) => {
                    if (res) {
                        setAddresses((prev) => ({
                            ...prev,
                            isLoaded: true,
                            items: res?.addresses,
                        }))
                        setValue('addressId', res?.addresses[0]?.id)
                    }
                })
                .catch((error) => error && setAddresses((prev) => ({...prev, isLoaded: true, error})))
        } else {
            setAddresses((prev) => ({...prev, isLoaded: true}))
        }
    }, [])

    const getSticks = useCallback(() => {
        if (stickId) {
            getProduct({productId: stickId})
                .then((res) => res && setStick((prev) => ({...prev, isLoaded: true, item: res?.product})))
                .catch((error) => error && setStick((prev) => ({...prev, isLoaded: true, error})))
        }
    }, [])

    useEffect(() => {
        getAddressesData()
    }, [])

    const onSubmit = useCallback(
        (data) => {
            setLoading(true)
            if (data.addressId && addresses?.items?.length > 0) {
                let address = addresses.items.find((e) => e.id == data.addressId)
                let geoInfo = defineDeliveryZone({lat: address.lat, lon: address.lon})
                if (!geoInfo || !geoInfo.status) {
                    dispatchAlert('danger', 'По данному адресу доставка не производится')
                    setLoading(false)
                    return setError('affiliate', {
                        type: 'custom',
                        message: 'По данному адресу доставка не производится',
                    })
                }
                data.affiliate = geoInfo.affiliate
            }
            if (
                data.typeDelivery == 'delivery' &&
                ((state.isAuth && !data.addressId) || addresses?.items?.length === 0)
            ) {
                setLoading(false)
                return dispatchAlert('danger', 'Добавьте адрес доставки')
            }
            createOrder(data)
                .then((res) => {
                    if (res.type == 'SUCCESS') {
                        dispatchAlert('success', apiResponseMessages.ORDER_CREATE)
                        setEnd(res.order)
                        reset()
                        dispatch(resetCart())
                        dispatch(resetCheckout())
                    }
                })
                .catch((error) => {
                    dispatchApiErrorAlert(error)
                })
                .finally(() => setLoading(false))
        },
        [addresses]
    )

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

            setValue('affiliate', data.affiliate)
            setValue('address', data)
            setIsNewAddress(false)
        }
    }, [])

    if (!addresses.isLoaded) {
        return <Loader full />
    }

    if (end && end.id) {
        return (
            <main>
                <Container>
                    <section className="mb-6">
                        <Row className="justify-content-between">
                            <Col md={12} className="mb-5 md-lg-0">
                                <h1>
                                    <IoCheckmarkCircle className="green fs-07" size={30} /> Заказ принят!
                                </h1>
                                <p>
                                    <OrderFree />
                                </p>
                                <p>
                                    Если вы оформили предварительный заказ, оператор с вами свяжется в ближайшее
                                    время.
                                    <br />
                                    Внимание! На временные заказы +/- 20 минут!
                                </p>
                                <Row xs={2} className="g-2 gx-sm-4 gy-sm-3 mt-4 mt-sm-5">
                                    <Col className="font-faded">Номер заказа</Col>
                                    <Col>№{end.id}</Col>
                                    <Col className="font-faded">Время оформления</Col>
                                    <Col>{moment(end.createdAt).format('DD.MM.YYYY kk:mm')}</Col>
                                </Row>
                                <Link className="btn-1 mt-5" to="/">
                                    Вернутся на главную
                                </Link>
                            </Col>
                        </Row>
                    </section>
                </Container>
            </main>
        )
    }
    if (countProducts === 0) {
        return (
            <main>
                <Container className="empty-page">
                    <section>
                        <img src="/images/cart-img.png" alt="корзина" className="img-fluid" />
                        <h1 className="text-center my-3">В корзине ничего</h1>
                        <p className="font-faded">
                            Добавляйте блюда в коризну, <br />
                            мы покажем их здесь
                        </p>
                        <Link to="/" className="btn-1 mx-auto px-5 mt-4">
                            В меню
                        </Link>
                    </section>
                </Container>
            </main>
        )
    }
    return (
        <main>
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — Оформление заказа</title>
                <meta property="title" content={process.env.REACT_APP_SITE_NAME + ' — Оформление заказа'} />
                <meta property="og:title" content={process.env.REACT_APP_SITE_NAME + ' — Оформление заказа'} />
            </MetaTags>
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
                                    <Col md={12}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>Количество персон</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="0"
                                                        {...register('person', {
                                                            maxLength: {
                                                                value: 100,
                                                                message: 'Максимум 100 символов',
                                                            },
                                                        })}
                                                    />
                                                    {errors.person && (
                                                        <Form.Text className="text-danger">
                                                            {errors?.person?.message}
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>Время подачи</Form.Label>
                                                    <Form.Check className="mb-4">
                                                        <Form.Check.Input
                                                            type="radio"
                                                            id="serving-1"
                                                            value={1}
                                                            defaultChecked={getValues('radioServing') == 1}
                                                            {...register('radioServing')}
                                                        />
                                                        <Form.Check.Label htmlFor="serving-1" className="ms-3">
                                                            В ближайшее время
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                    <Form.Check className="mb-4">
                                                        <Form.Check.Input
                                                            type="radio"
                                                            id="serving-2"
                                                            value={2}
                                                            defaultChecked={getValues('radioServing') == 2}
                                                            {...register('radioServing')}
                                                        />
                                                        <Form.Check.Label
                                                            htmlFor="serving-2"
                                                            className="ms-3 flex-column"
                                                        >
                                                            <p className="mb-2">Предварительный заказ</p>
                                                            {getValues('radioServing') == 2 && (
                                                                <>
                                                                    <Form.Control
                                                                        type="datetime-local"
                                                                        placeholder="0"
                                                                        {...register('serving', {
                                                                            min: {
                                                                                value: moment()
                                                                                    .add(2, 'hours')
                                                                                    .format('YYYY-MM-DDTkk:mm'),
                                                                                message:
                                                                                    'Время подачи заказа не менее чем через 2 часа',
                                                                            },
                                                                            max: {
                                                                                value: moment()
                                                                                    .add(1, 'year')
                                                                                    .format('YYYY-MM-DDTkk:mm'),
                                                                                message:
                                                                                    'Максимальное время подачи не более 1 года',
                                                                            },
                                                                        })}
                                                                    />
                                                                    {errors.serving && (
                                                                        <Form.Text className="text-danger">
                                                                            {errors?.serving?.message}
                                                                        </Form.Text>
                                                                    )}
                                                                </>
                                                            )}
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Комментарий к заказу</Form.Label>
                                            <Form.Control
                                                placeholder="Введите комментарий"
                                                as="textarea"
                                                {...register('comment', {
                                                    maxLength: {value: 1500, message: 'Максимум 1500 символов'},
                                                })}
                                            />
                                            {errors.comment && (
                                                <Form.Text className="text-danger">
                                                    {errors?.comment?.message}
                                                </Form.Text>
                                            )}
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
                                                Онлайн оплата
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
                                            {/* {watch('typeDelivery') == 'delivery' && (
                                                <tr>
                                                    <td>Доставка</td>
                                                    <td>{customPrice(process.env.REACT_APP_DELIVERY_PRICE)}</td>
                                                </tr>
                                            )} */}
                                            <tr>
                                                <td>Сумма заказа</td>
                                                <td>{customPrice(watch('total'))}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <Button
                                    type="submit"
                                    form="checkout"
                                    isLoading={loading}
                                    disabled={!isValid || loading}
                                    className="btn-2 mt-4 w-100"
                                >
                                    Оформить заказ за {customPrice(watch('total'))}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </section>
            </Container>

            <CustomModal
                title="Внимание"
                isShow={isShowSticksModal}
                setIsShow={setIsShowSticksModal}
                footer={
                    <>
                        <Button className="btn-1 me-3" onClick={() => setIsShowSticksModal(false)}>
                            Нет
                        </Button>
                        <Button
                            className="btn-2"
                            onClick={() => {
                                dispatch(cartCreate({product: stick.item}))
                                setIsShowSticksModal(false)
                            }}
                        >
                            Да
                        </Button>
                    </>
                }
            >
                5 приборов бесплатно, далее по 10 р. за прибор. Хотите добавить еще приборов?
            </CustomModal>
        </main>
    )
}

export default Checkout
