import React from 'react'
import {Outlet} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AccountMenu from '../components/AccountMenu'

const AccountLayout = () => {
    return (
        <main className="account">
            <Container>
                <section className="pt-sm-5 pt-0 pb-5">
                    <Row>
                        <Col xs={12} md={4}>
                            <AccountMenu />
                        </Col>
                        <Col xs={12} md={8}>
                            <Outlet />
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default AccountLayout
