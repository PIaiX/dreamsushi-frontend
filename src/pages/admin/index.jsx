import React, {useCallback, useState} from 'react'
import {Card, Col, Row} from 'react-bootstrap'
import Button from '../../components/UI/Button'
import {getEprProducts} from '../../services/admin'

const Admin = () => {
    const [products, setProducts] = useState({
        isLoaded: true,
        error: null,
        count: 0,
    })

    const clickGetErpProducts = useCallback(() => {
        setProducts({...products, isLoaded: false})
        getEprProducts()
            .then(
                (res) =>
                    res &&
                    setProducts((prev) => ({
                        ...prev,
                        isLoaded: true,
                        count: res.count,
                    }))
            )
            .catch((error) => error && setProducts((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    return (
        <section className="profile">
            <h1>Панель администратора</h1>
            <Row className="row admin-home">
                <Col md={6}>
                    <div className="box">
                        <h4 class="mb-3 mb-sm-4">
                            Выгружено <b className="text-success">{products.count}</b> товаров
                        </h4>
                        <Button
                            isLoading={!products.isLoaded}
                            className="btn-2"
                            onClick={() => clickGetErpProducts()}
                        >
                            Выгрузить
                        </Button>
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default Admin
