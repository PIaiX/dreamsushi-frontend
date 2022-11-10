import React, {useCallback} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {createOrder} from '../services/order'
import CheckoutForm from '../components/forms/CheckoutForm'
import Button from '../components/UI/Button'
import {useSelector} from 'react-redux'
import OrderFree from '../components/OrderFree'

const Checkout = () => {
    const cart = useSelector(({cart}) => cart ?? false)
    const countProducts = cart?.items?.length ?? false

    const onSubmit = useCallback((data) => {
        createOrder(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', apiResponseMessages.ACCOUNT_ADDRESS_CREATE)
                    navigate('/account/address')
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    if (!countProducts || countProducts.length === 0) {
        return (
            <main>
                <Container className="empty-page">
                    <section>
                        <img src="/images/cart-img.svg" alt="корзина" className="img-fluid" />
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
            <Container>
                <section className="mb-6">
                    <div className="d-sm-flex align-items-baseline mb-4 mb-sm-5">
                        <h1 className="mb-0">Оформление заказа</h1>
                        <div className="mt-2 mt-sm-0 ms-sm-4">{countProducts} позиции</div>
                    </div>
                    <Row className="justify-content-between">
                        <Col xs={12} lg={7} xxl={6}>
                            <CheckoutForm onSubmit={onSubmit} />
                        </Col>
                        <Col xs={12} lg={5} xxl={4}>
                            <div className="box mt-4 mt-sm-5 mt-lg-0">
                                <div>
                                    <h4 className="mb-2 mb-sm-3">
                                        <span className="main-color me-2">•</span> Ваш заказ
                                    </h4>
                                    <table className="simple">
                                        <tbody>
                                            {cart.items.map((item) => (
                                                <tr>
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
                                                <td>4 позиции</td>
                                                <td>3 469 ₽</td>
                                            </tr>
                                            <tr>
                                                <td>Скидка</td>
                                                <td>669 ₽</td>
                                            </tr>
                                            <tr>
                                                <td>Доставка</td>
                                                <td>+ 100 ₽</td>
                                            </tr>
                                            <tr>
                                                <td>Сумма заказа</td>
                                                <td>3 569 ₽</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <Button type="submit" form="checkout" className="btn-2 mt-4 w-100">
                                    Оформить заказ за 3 469 ₽
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
