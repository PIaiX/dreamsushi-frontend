import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {IoCheckmarkCircle} from 'react-icons/io5'
import ProductItem from '../components/ProductItem'

const Confirmation = () => {
    return (
        <main>
            <Container>
                <section className="mb-6">
                    <Row className="justify-content-between">
                        <Col xs={12} lg={5} xxl={4} className="mb-5 md-lg-0">
                            <h1>
                                <IoCheckmarkCircle className="green fs-07" /> Заказ принят!
                            </h1>
                            <p className="fs-12 fw-6">Привезём сегодня к 20:30</p>

                            <Row xs={2} className="g-2 gx-sm-4 gy-sm-3 mt-4 mt-sm-5">
                                <Col className="font-faded">Статус оплаты</Col>
                                <Col>Оплачено на сайте</Col>
                                <Col className="font-faded">Сумма заказа</Col>
                                <Col>3569&nbsp;₽</Col>
                                <Col className="font-faded">Адрес доставки</Col>
                                <Col>ул. Петербургская 63</Col>
                            </Row>

                            <Row xs={2} className="g-2 gx-sm-4 gy-sm-3 mt-4 mt-sm-5">
                                <Col className="font-faded">Номер заказа</Col>
                                <Col>248</Col>
                                <Col className="font-faded">Статус заказа</Col>
                                <Col>Новый</Col>
                                <Col className="font-faded">Время оформления</Col>
                                <Col>21:04, сегодня</Col>
                            </Row>
                        </Col>
                        <Col xs={12} lg={7}>
                            <div className="box">
                                <div className="d-flex align-items-baseline">
                                    <h3>
                                        <span className="main-color me-2">•</span> Состав заказа
                                    </h3>
                                    <div className="ms-4">4 позиции</div>
                                </div>
                                <hr />
                                <div>
                                    <ProductItem
                                        title={'Пицца Итальяно'}
                                        imgLink={'images/products/prod10.jpg'}
                                        ingredients={
                                            'Бекон, Куринные бёдрышки, Томаты черри, Грибы шампиньоны, Соус пэсто, Сыр Моцарелла, Сыр Чеддер'
                                        }
                                        price={900}
                                        discount={0.25}
                                        count={3}
                                    />
                                    <ProductItem
                                        title={'Пицца Итальяно'}
                                        imgLink={'images/products/prod10.jpg'}
                                        ingredients={
                                            'Бекон, Куринные бёдрышки, Томаты черри, Грибы шампиньоны, Соус пэсто, Сыр Моцарелла, Сыр Чеддер'
                                        }
                                        price={900}
                                        discount={0.25}
                                        count={3}
                                    />
                                    <ProductItem
                                        title={'Пицца Итальяно'}
                                        imgLink={'images/products/prod10.jpg'}
                                        ingredients={
                                            'Бекон, Куринные бёдрышки, Томаты черри, Грибы шампиньоны, Соус пэсто, Сыр Моцарелла, Сыр Чеддер'
                                        }
                                        price={900}
                                        discount={0.25}
                                        count={3}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default Confirmation
