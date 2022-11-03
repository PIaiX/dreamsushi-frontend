import React from 'react'
import {Outlet} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AccountMenu from '../components/AccountMenu'

const AccountLayout = () => {
    return (
        <main className="account">
            <Container className="account__container">
                <section className="pt-5 pb-5">
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
