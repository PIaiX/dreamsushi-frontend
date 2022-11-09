import React, {useCallback} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {createOrder} from '../services/order'
import CheckoutForm from '../components/forms/CheckoutForm'
import Button from '../components/UI/Button'
import {useSelector} from 'react-redux'

const Checkout = () => {
    const productsCount = useSelector(({cart}) => cart?.items?.length ?? false)

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

    return (
        <main>
            <Container>
                <section className="mb-6">
                    <div className="d-sm-flex align-items-baseline mb-4 mb-sm-5">
                        <h1 className="mb-0">Оформление заказа</h1>
                        {productsCount ? <div className="mt-2 mt-sm-0 ms-sm-4">{productsCount} позиции</div> : null}
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
                                            <tr>
                                                <td>Пицца Итальяно</td>
                                                <td>2 шт.</td>
                                            </tr>
                                            <tr>
                                                <td>Соус Спайси</td>
                                                <td>1 шт.</td>
                                            </tr>
                                            <tr>
                                                <td>Роллы Венесуэла</td>
                                                <td>1 шт.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <hr />
                                <div>
                                    <h4 className="mb-2 mb-sm-3">
                                        <span className="main-color me-2">•</span> Бесплатно к заказу
                                    </h4>
                                    <table className="simple">
                                        <tbody>
                                            <tr>
                                                <td>Имбирь Табуко</td>
                                                <td>30 г</td>
                                            </tr>
                                            <tr>
                                                <td>Васаби</td>
                                                <td>30 г</td>
                                            </tr>
                                            <tr>
                                                <td>Салфетки</td>
                                                <td>10 шт</td>
                                            </tr>
                                            <tr>
                                                <td>Жвачка</td>
                                                <td>2 шт</td>
                                            </tr>
                                        </tbody>
                                    </table>
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
