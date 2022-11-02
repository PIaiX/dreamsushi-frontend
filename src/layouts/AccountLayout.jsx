import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useDispatch} from 'react-redux'
import {logout} from '../services/RTK/auth'
import AccountMenu from '../components/AccountMenu'

const AccountLayout = () => {
    const dispatch = useDispatch()

    return (
        <main className="account">
            <Container className="account__container">
                <section className="pt-5 pb-5">
                    <Row>
                        <Col xs={8}>
                            <h1>Мой профиль</h1>
                        </Col>
                        <Col xs={4}>
                            <button type="button" className="btn-1 w-100" onClick={() => dispatch(logout())}>
                                Выйти
                            </button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <AccountMenu />
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
