import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const AccountLayout = () => {
    return (
        <main className="account">
            <Container className="account__container">
                <section className="pt-5 pb-5">
                    <Row>
                        <Col xs={8}>
                            <h1>Мой профиль</h1>
                        </Col>
                        <Col xs={4}>
                            <button type="button" className="btn-1 w-100">
                                Выйти
                            </button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            {/* todo: implement AccountMenu component*/}
                            <ul className="account-menu">
                                <li>
                                    <Link to="/account">Личные данные</Link>
                                </li>
                                <li>
                                    <Link to="/">Адреса доставок</Link>
                                </li>
                                <li>
                                    <Link to="/">Способы оплаты</Link>
                                </li>
                                <li>
                                    <Link to="order-history">История заказов</Link>
                                </li>
                                <li>
                                    <Link to="/">Уведомления</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={8}>
                            <Outlet />
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default AccountLayout
