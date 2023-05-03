import moment from 'moment'
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react'
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
import CustomModal from '../components/utils/CustomModal'
import {apiResponseMessages} from '../config/api'
import {dispatchAlert, dispatchApiErrorAlert} from '../helpers/alert'
import defineDeliveryZone from '../helpers/defineDeliveryZone'
import {customPrice} from '../helpers/product'
import {createAddress, mainAddress} from '../services/account'
import {createOrder} from '../services/order'
import {editDeliveryCheckout, resetCheckout, setCheckout} from '../store/reducers/checkoutSlice'
import {cartReset} from '../store/reducers/cartSlice'
import {setAddress} from '../store/reducers/addressSlice'
import {useTotalCart} from '../hooks/useCart'
import CartItem from '../components/CartItem'
import ProductPerson from '../components/ProductPerson'

const Checkout = () => {
    const state = useSelector(
        ({auth: {isAuth, user}, cart, checkout: {checkout, delivery}, address, addressPickup}) => ({
            isAuth,
            user,
            cart,
            checkout,
            delivery,
            address,
            addressPickup,
        })
    )

    const {
        total = 0,
        price = 0,
        count,
        sticks,
        discount = 0,
        point = 0,
        minSum,
        minSumText,
        delivery,
        cashback,
    } = state?.cart?.items && useTotalCart()

    const selectedAddress = state.address.items && state.address.items.find((e) => e.main)
    const selectedAddressPickup = state.addressPickup.items && state.addressPickup.items.find((e) => e.main)

    const [step, setStep] = useState(0)
    const [order, setOrder] = useState(false)
    const [showModalPerson, setShowModalPerson] = useState(false)
    const [isNewAddress, setIsNewAddress] = useState(false)
    const [loading, setLoading] = useState(false)

    const {
        register,
        formState: {errors, isValid},
        getValues,
        trigger,
        control,
        reset,
        setError,
        setValue,
    } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        defaultValues: {
            firstName: state.user.firstName ?? '',
            phone: state.user.phone ?? '',
            serving: state.checkout.serving ?? '',
            delivery: state.checkout.delivery ?? 'delivery',
            payment: state.checkout.payment ?? 'card',
            person: state.checkout.person ?? 1,
            comment: state.checkout.comment ?? '',
            radioServing: state?.checkout?.radioServing ?? '1',

            address: selectedAddress ?? false,
            affiliate: state.checkout.affiliate
                ? state.checkout.affiliate == 'on'
                    ? ''
                    : state.checkout.affiliate
                : selectedAddressPickup?.apiId
                ? selectedAddressPickup.apiId
                : '',

            // Сохранение адреса по умолчанию
            save: state.checkout.save ?? false,

            products: state.cart.items ?? [],

            promo: state.cart.promo ?? false,

            // Сумма баллов
            point: point,

            // Сумма товаров
            price: price,

            //Сумма доставки
            deliveryPrice: delivery,

            // Сумма скидки
            discount: discount,

            // Итоговая сумма
            total: total,
        },
    })
    const dispatch = useDispatch()

    const data = useWatch({control})

    useLayoutEffect(() => {
        if (total > 0) {
            setValue('total', total)
            setValue('price', price)
            setValue('discount', discount)
            setValue('deliveryPrice', delivery)
        }
        setValue('person', sticks)
        setValue('point', point)
        trigger('person')
    }, [total, price, discount, point, delivery, state.isAuth])

    useLayoutEffect(() => {
        if (state.isAuth) {
            setValue('firstName', state.user.firstName)
            setValue('phone', state.user.phone)
        }
    }, [state.user])

    useLayoutEffect(() => {
        if (data) dispatch(setCheckout(data))
    }, [data])

    useEffect(() => {
        if (data?.phone.length > 0 && (data.phone[0] != '7' || data.phone[1] == '8')) {
            setValue('phone', '7')
        }
    }, [data.phone])

    useEffect(() => {
        if (data.radioServing === '1') {
            setValue('serving', '')
        }
    }, [data.radioServing])

    useEffect(() => {
        if (state.delivery) {
            setValue('delivery', state.delivery)
        }
    }, [state.delivery])

    const onSubmit = useCallback(
        (order) => {
            setLoading(true)

            if (order.delivery == 'delivery' && order?.address?.length === 0) {
                setLoading(false)
                return dispatchAlert('danger', 'Добавьте адрес доставки')
            }

            if (order.delivery == 'delivery' && order?.address && order?.address?.lat && order?.address?.lon) {
                let geoInfo = defineDeliveryZone({lat: order.address.lat, lon: order.address.lon})
                if (!geoInfo || !geoInfo.status) {
                    dispatchAlert('danger', 'По данному адресу доставка не производится')
                    setLoading(false)
                    return setError('affiliate', {
                        type: 'custom',
                        message: 'По данному адресу доставка не производится',
                    })
                }
                order = {...order, affiliate: geoInfo.affiliate}
            }
            createOrder(order)
                .then((res) => {
                    if (res.data.type == 'SUCCESS') {
                        setOrder(res.data.order)
                        setStep(2)
                        dispatch(cartReset())
                        dispatchAlert('success', apiResponseMessages.ORDER_CREATE)
                    } else {
                        dispatchApiErrorAlert(res, state.user.id)
                    }
                    reset()
                    dispatch(resetCheckout())
                })
                .catch((error) => {
                    reset()
                    dispatch(resetCheckout())
                    dispatchApiErrorAlert(error, state.user.id)
                })
                .finally(() => setLoading(false))
        },
        [data]
    )

    const onSaveNewAddress = useCallback((data) => {
        if (state.isAuth) {
            createAddress(data)
                .then((res) => {
                    if (res?.data?.type == 'SUCCESS') {
                        dispatch(setAddress(res.data.address))
                        setValue('address', res.data.address)
                        setIsNewAddress(false)
                        dispatchAlert('success', apiResponseMessages.ACCOUNT_ADDRESS_CREATE)
                    } else {
                        dispatchApiErrorAlert(res, state.user.id)
                    }
                })
                .catch((error) => {
                    dispatchApiErrorAlert(error, state.user.id)
                })
        }
    }, [])

    if (step == 1) {
        return (
            <main>
                <Container>
                    <section className="mb-6">
                        <div className="d-sm-flex align-items-baseline mb-4 mb-sm-5">
                            <h1 className="mb-0">Подтвердите заказ</h1>
                        </div>
                        <Row className="justify-content-between">
                            <Col xs={12} lg={7} xxl={6}>
                                {state.cart.items.map((item) => (
                                    <CartItem key={item?.id} product={item} checkout />
                                ))}
                            </Col>
                            <Col xs={12} lg={5} xxl={4}>
                                <div className="box">
                                    <h4 className="mb-2 mb-sm-3">
                                        <span className="main-color me-2">•</span> Детали
                                    </h4>
                                    <div className="mb-4 fs-09">
                                        <table className="simple mb-3">
                                            <tbody>
                                                <tr>
                                                    <td>{data.delivery == 'delivery' ? 'Адрес' : 'Самовывоз'}</td>
                                                    <td>
                                                        <small>
                                                            {data.delivery == 'delivery'
                                                                ? `${data.address.street} ${data.address.home} ${
                                                                      data.address.block
                                                                          ? ', корпус ' + data.address.block
                                                                          : ''
                                                                  }
                                                          ${
                                                              data.address.entrance
                                                                  ? ', подъезд ' + data.address.entrance
                                                                  : ''
                                                          }
                                                          ${data.address.floor ? ', этаж ' + data.address.floor : ''}
                                                          ${
                                                              data.address.apartment
                                                                  ? ', кв ' + data.address.apartment
                                                                  : ''
                                                          }
                                                          `
                                                                : data?.affiliate &&
                                                                  state?.addressPickup?.items.length > 0
                                                                ? state.addressPickup.items.find(
                                                                      (e) => e.apiId === data?.affiliate
                                                                  )?.full
                                                                : selectedAddressPickup?.full
                                                                ? selectedAddressPickup.full
                                                                : 'Не указан адрес'}
                                                        </small>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Заказ будет доставлен</td>
                                                    <td>
                                                        {data.radioServing === '1'
                                                            ? 'Как можно быстрее'
                                                            : moment(data.serving).format('DD.MM.YYYY kk:mm')}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        {data.delivery == 'delivery' && (
                                            <small>
                                                <OrderFree />
                                            </small>
                                        )}
                                        <table className="simple">
                                            <tbody>
                                                <tr>
                                                    <td>Сумма</td>
                                                    <td>{customPrice(data.price)}</td>
                                                </tr>
                                                {data.delivery == 'delivery' && (
                                                    <tr>
                                                        <td>Доставка</td>
                                                        <td>
                                                            {data.deliveryPrice > 0
                                                                ? customPrice(data.deliveryPrice)
                                                                : 'Бесплатно'}
                                                        </td>
                                                    </tr>
                                                )}
                                                {/* {discount > 0 && (
                                                <tr>
                                                    <td>Скидка</td>
                                                    <td>-{customPrice(discount)}</td>
                                                </tr>
                                            )} */}
                                                <tr>
                                                    <td>Итого</td>
                                                    <td>{customPrice(total)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <Button
                                        type="submit"
                                        onClick={() => onSubmit(data)}
                                        form="checkout"
                                        isLoading={loading}
                                        disabled={!isValid || loading}
                                        className="btn-2 w-100 mb-3"
                                    >
                                        Подтвердить
                                    </Button>
                                    <Button onClick={() => setStep(0)} className="btn-1 w-100">
                                        Назад
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </section>
                </Container>
            </main>
        )
    }
    if (step == 2 && order?.id) {
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
                                    <Col>№{order.id}</Col>
                                    <Col className="font-faded">Время оформления</Col>
                                    <Col>{moment(order.createdAt).format('DD.MM.YYYY kk:mm')}</Col>
                                </Row>
                                <Link className="btn-1 mt-5" to="/">
                                    Вернуться на главную
                                </Link>
                            </Col>
                        </Row>
                    </section>
                </Container>
            </main>
        )
    }
    if (count === 0) {
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
                        <div className="mt-2 mt-sm-0 ms-sm-4">{count} позиции</div>
                    </div>
                    <Row className="justify-content-between">
                        <Col xs={12} lg={7} xxl={6}>
                            <Form className="profile-edit" id="checkout">
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Имя</Form.Label>
                                            <Form.Control
                                                placeholder="Введите имя"
                                                {...register('firstName', {
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
                                                className={state.delivery == 'delivery' ? 'btn active' : 'btn'}
                                                onClick={() => dispatch(editDeliveryCheckout('delivery'))}
                                            >
                                                Доставка
                                            </button>
                                            <button
                                                type="button"
                                                className={state.delivery == 'pickup' ? 'btn active' : 'btn'}
                                                onClick={() => dispatch(editDeliveryCheckout('pickup'))}
                                            >
                                                Самовывоз
                                            </button>
                                        </Form.Group>
                                    </Col>
                                    {data.delivery == 'delivery' ? (
                                        <Form.Group className="mb-4">
                                            {state?.address?.items?.length > 0 ? (
                                                <Col md={12}>
                                                    <Form.Group className="mb-4">
                                                        {state.address.items.map((item, index) => {
                                                            return (
                                                                <Form.Check
                                                                    key={item?.id}
                                                                    className="mb-4 checkbox-box"
                                                                >
                                                                    <Form.Check.Input
                                                                        type="radio"
                                                                        id={'address-' + (item.id ?? 'key_' + index)}
                                                                        onChange={() => {
                                                                            setValue('address', item)
                                                                            dispatch(mainAddress(item))
                                                                        }}
                                                                        checked={item.main}
                                                                    />
                                                                    <Form.Check.Label
                                                                        htmlFor={
                                                                            'address-' + (item.id ?? 'key_' + index)
                                                                        }
                                                                        className="w-fit d-flex flex-column ms-3"
                                                                    >
                                                                        <div className="fs-11">
                                                                            {item.title ? item.title : item.full}
                                                                        </div>
                                                                        <div className="fs-09 font-faded mt-2">
                                                                            {item.full ? item.full : item.street}
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
                                            {state.isAuth ? (
                                                <Button
                                                    type="button"
                                                    className="btn-2"
                                                    onClick={() => setIsNewAddress(!isNewAddress)}
                                                >
                                                    Добавить новый адрес
                                                </Button>
                                            ) : (
                                                <span className="text-danger">
                                                    Для добавления адреса войдите в профиль
                                                </span>
                                            )}
                                        </Form.Group>
                                    ) : (
                                        <Form.Group className="mb-4">
                                            <Form.Label>Адрес ресторана</Form.Label>
                                            <Row xs={1} md={2} className="g-3 g-sm-4">
                                                {state?.addressPickup?.items.length > 0 &&
                                                    state.addressPickup.items.map((e) => (
                                                        <Col>
                                                            <Form.Check className="mb-4 checkbox-box">
                                                                <Form.Check.Input
                                                                    type="radio"
                                                                    id={'affiliate-' + e.id}
                                                                    value={e.apiId}
                                                                    defaultChecked={data.affiliate === e.apiId}
                                                                    {...register('affiliate')}
                                                                />
                                                                <Form.Check.Label
                                                                    htmlFor={'affiliate-' + e.id}
                                                                    className="w-fit d-flex flex-column ms-3"
                                                                >
                                                                    <div className="fs-11">{e.full}</div>
                                                                    <div className="fs-09 font-faded mt-2">
                                                                        {e.desc}
                                                                    </div>
                                                                </Form.Check.Label>
                                                            </Form.Check>
                                                        </Col>
                                                    ))}
                                            </Row>
                                        </Form.Group>
                                    )}
                                    <Col md={12}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>Количество персон</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="0"
                                                        {...register('person', {
                                                            required: 'Обязательное поле',
                                                            max: {
                                                                value: sticks ?? 1,
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
                                            {sticks < data.person && (
                                                <Col md={6}>
                                                    <div>
                                                        <small className="fs-08">
                                                            В вашем заказе предусмотрено приборов на <b>{sticks}</b>{' '}
                                                            персон.{' '}
                                                            <a
                                                                className="main-color"
                                                                onClick={() => setShowModalPerson(true)}
                                                            >
                                                                Добавить еще приборов?
                                                            </a>
                                                        </small>
                                                    </div>
                                                </Col>
                                            )}
                                        </Row>
                                    </Col>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>Время подачи</Form.Label>
                                                    <Form.Check className="mb-4 checkbox-box">
                                                        <Form.Check.Input
                                                            type="radio"
                                                            id="serving-1"
                                                            value={1}
                                                            defaultChecked={data.radioServing === '1'}
                                                            {...register('radioServing')}
                                                        />
                                                        <Form.Check.Label htmlFor="serving-1" className="w-fit ms-3">
                                                            В ближайшее время
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                    <Form.Check className="mb-4 checkbox-box">
                                                        <Form.Check.Input
                                                            type="radio"
                                                            id="serving-2"
                                                            value={2}
                                                            defaultChecked={data.radioServing === '2'}
                                                            {...register('radioServing')}
                                                        />
                                                        <Form.Check.Label
                                                            htmlFor="serving-2"
                                                            className="w-fit ms-3 flex-column"
                                                        >
                                                            <p className="mb-2">Предварительный заказ</p>
                                                            {data.radioServing === '2' && (
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
                                    {/* <Col md={12}>
                                        <Form.Label className="mb-4">Способ оплаты</Form.Label>
                                        <Form.Check className="mb-4">
                                            <Form.Check.Input
                                                type="radio"
                                                id="payment-1"
                                                value="card"
                                                defaultChecked
                                                {...register('payment')}
                                            />
                                            <Form.Check.Label htmlFor="payment-1" className="w-fit ms-3">
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
                                            <Form.Check.Label htmlFor="payment-2" className="w-fit ms-3">
                                                Наличными
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </Col> */}
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
                                                    <td>{item.count}&nbsp;шт.</td>
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
                                                <td>{count} позиции</td>
                                                <td>{customPrice(price)}</td>
                                            </tr>
                                            {discount > 0 && (
                                                <tr>
                                                    <td>Скидка</td>
                                                    <td>-{customPrice(discount)}</td>
                                                </tr>
                                            )}
                                            {data.delivery == 'delivery' && (
                                                <tr>
                                                    <td>Доставка</td>
                                                    <td>
                                                        {data.deliveryPrice > 0
                                                            ? customPrice(data.deliveryPrice)
                                                            : 'Бесплатно'}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td>Сумма заказа</td>
                                                <td>{customPrice(total)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {state.isAuth ? (
                                    state.user.status === 0 ? (
                                        <Button disabled className="btn-1 mt-4 w-100">
                                            Профиль не активирован
                                        </Button>
                                    ) : (
                                        <Button
                                            disabled={!isValid || loading}
                                            onClick={() => setStep(1)}
                                            className="btn-2 mt-4 w-100"
                                        >
                                            Оформить заказ за {customPrice(total)}
                                        </Button>
                                    )
                                ) : (
                                    <Button disabled className="btn-1 mt-4 w-100">
                                        <span className="text-danger">Сначала войдите в профиль</span>
                                    </Button>
                                )}
                            </div>
                        </Col>
                    </Row>
                </section>
            </Container>
            <ProductPerson show={showModalPerson} setShow={(e) => setShowModalPerson(e)} />
        </main>
    )
}

export default Checkout
