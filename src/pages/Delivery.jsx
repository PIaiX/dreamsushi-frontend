import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {ReactComponent as IconDelivery} from '../assets/images/icons/delivery.svg'
import {ReactComponent as IconPickup} from '../assets/images/icons/picking-up.svg'
import {ReactComponent as IconOnline} from '../assets/images/icons/online.svg'
import {ReactComponent as IconCard} from '../assets/images/icons/card.svg'
import {ReactComponent as IconCash} from '../assets/images/icons/cash.svg'

const Delivery = () => {
    return (
        <main>
            <Container className="delivery">
                <section className="mb-6">
                    <h1 className="mb-4 mb-sm-5">Доставка и оплата заказов</h1>
                    <Row>
                        <Col md={9} lg={7}>
                            <p className="font-faded mb-4">
                                Закажите доставку в самый отдалённый уголок и мы привезём Ваш заказ без опозданий.
                            </p>
                            <p className="font-faded mb-4">
                                Бесплатная доставка при заказе от 700 ₽ в черте города.
                            </p>
                            <p className="font-faded mb-4">Среднее время доставки 1ч — 1ч 20м.</p>
                            <p className="font-faded mb-4">
                                Время доставки может меняться в зависимости от количества заказов.
                            </p>
                            <p className="font-faded mb-4">Скидки и акции на доставку не распространяются.</p>
                        </Col>
                    </Row>
                </section>
                <section className="mb-6">
                    <h2 className="mb-4 mb-sm-5">Способы доставки:</h2>
                    <Row className="g-4">
                        <Col md={6} lg={5}>
                            <div className="d-flex align-items-start">
                                <IconDelivery className="icon" />
                                <div className="flex-1 ms-3 ms-sm-4">
                                    <h4 className="fw-5 mb-2 mb-sm-3">Доставка курьером</h4>
                                    <p className="font-faded">Бесплатная доставка. Минимальная сумма заказа 700 ₽</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} lg={5}>
                            <div className="d-flex align-items-start">
                                <IconPickup className="icon" />
                                <div className="flex-1 ms-3 ms-sm-4">
                                    <h4 className="fw-5 mb-2 mb-sm-3">Самовывоз</h4>
                                    <p className="font-faded">Бесплатная доставка. Минимальная сумма заказа 700 ₽</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>
                <section className="mb-6">
                    <h2 className="mb-4 mb-sm-5">Способы оплаты:</h2>
                    <Row className="g-4">
                        <Col md={6} lg={4}>
                            <div className="d-flex align-items-start">
                                <IconOnline className="icon" />
                                <div className="flex-1 ms-3 ms-sm-4">
                                    <h4 className="fw-5 mb-2 mb-sm-3">Онлайн оплата</h4>
                                    <p className="font-faded">Принимаются карты Mastercard, Maestro и Visa</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} lg={4}>
                            <div className="d-flex align-items-start">
                                <IconCard className="icon" />
                                <div className="flex-1 ms-3 ms-sm-4">
                                    <h4 className="fw-5 mb-2 mb-sm-3">Оплата картой курьеру</h4>
                                    <p className="font-faded">
                                        Курьер привезёт с собой мобильный платёжный терминал. Принимаются карты
                                        Mastercard, Maestro и Visa.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} lg={4}>
                            <div className="d-flex align-items-start">
                                <IconCash className="icon" />
                                <div className="flex-1 ms-3 ms-sm-4">
                                    <h4 className="fw-5 mb-2 mb-sm-3">Оплата наличными</h4>
                                    <p className="font-faded">
                                        Вы можете оплатить заказ наличными нашему курьеру или при самовывозе
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default Delivery
