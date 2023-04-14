import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {ReactComponent as IconDelivery} from '../assets/images/icons/delivery.svg'
import {ReactComponent as IconPickup} from '../assets/images/icons/picking-up.svg'
import {ReactComponent as IconOnline} from '../assets/images/icons/online.svg'
import {ReactComponent as IconCard} from '../assets/images/icons/card.svg'
import {ReactComponent as IconCash} from '../assets/images/icons/cash.svg'
import {MetaTags} from 'react-meta-tags'

const Delivery = () => {
    return (
        <main>
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — Доставка и оплата заказов</title>
                <meta property="title" content={process.env.REACT_APP_SITE_NAME + ' — Доставка и оплата заказов'} />
                <meta
                    property="og:title"
                    content={process.env.REACT_APP_SITE_NAME + ' — Доставка и оплата заказов'}
                />
            </MetaTags>
            <Container className="delivery">
                <section className="mb-6">
                    <h1 className="mb-4 mb-sm-5">Доставка и оплата заказов</h1>
                    <Row>
                        <Col md={9} lg={7}>
                            <p className="font-faded mb-4">
                                Закажите доставку в самый отдалённый уголок и мы привезём Ваш заказ без опозданий.
                            </p>
                            <p className="font-faded mb-2">Московский - от 800₽ бесплатная доставка,</p>
                            <p className="font-faded mb-2">Ново-Савиновский - от 800₽ бесплатная доставка,</p>
                            <p className="font-faded mb-2">
                                Авиастроительный - от 800₽ бесплатная доставка до определенных границ - далее платная
                                доставка,
                            </p>
                            <p className="font-faded mb-2">
                                Кировский - от 800₽ бесплатная доставка до определенных границ - далее платная
                                доставка от 300₽,
                            </p>
                            <p className="font-faded mb-2">
                                Советский - от 800₽ бесплатная доставка до определенных границ - далее платная
                                доставка от 100₽,
                            </p>
                            <p className="font-faded mb-2">
                                Приволжский - от 800₽ бесплатная доставка до определенных границ - далее платная
                                доставка от 100₽,
                            </p>
                            <p className="font-faded mb-2">
                                Вахитовский - платная доставка 100₽, Остальные районы уточняйте у администратора.
                            </p>
                        </Col>
                    </Row>
                </section>
                <section className="mb-6">
                    <Row className="g-4">
                        <Col md={6} lg={5}>
                            <div className="d-flex align-items-start">
                                <IconDelivery className="icon" />
                                <div className="flex-1 ms-3 ms-sm-4">
                                    <h4 className="fw-5 mb-2 mb-sm-3">Доставка курьером:</h4>
                                    <p className="font-faded">
                                        Оформляйте заказ на ближайшее время,также вы можете оформить предварительный
                                        заказ.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} lg={5}>
                            <div className="d-flex align-items-start">
                                <IconPickup className="icon" />
                                <div className="flex-1 ms-3 ms-sm-4">
                                    <h4 className="fw-5 mb-2 mb-sm-3">Самовывоз</h4>
                                    <p className="font-faded">
                                        ул. Юлиуса Фучика, 88А
                                        <br />
                                        ул. Гагарина, 93
                                    </p>
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
                                    <p className="font-faded">Оплата при получении/предоплата</p>
                                </div>
                            </div>
                        </Col>
                        {/* <Col md={6} lg={4}>
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
                        </Col> */}
                        <Col md={6} lg={6}>
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
