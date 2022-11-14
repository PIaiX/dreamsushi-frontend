import React, {useCallback, useState, useEffect} from 'react'
import {Col, Row} from 'react-bootstrap'
import Button from '../../components/UI/Button'
import {getEprProducts, getStatistic} from '../../services/admin'

const Admin = () => {
    const [products, setProducts] = useState({
        isLoaded: true,
        error: null,
        count: 0,
    })
    const [statistic, setStatistic] = useState({
        users: 0,
        products: 0,
        categories: 0,
        orders: 0,
        addresses: 0,
    })
    useEffect(() => {
        getStatistic().then((res) => res && setStatistic(res))
    }, [])
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
                        <h4 className="mb-3 mb-sm-4">
                            Выгружено{' '}
                            <b className="text-success">
                                {products.count > 0 ? products.count : statistic.products}
                            </b>{' '}
                            товаров
                        </h4>
                        <Button
                            isLoading={!products.isLoaded}
                            disabled={!products.isLoaded}
                            className="btn-2"
                            onClick={() => clickGetErpProducts()}
                        >
                            Выгрузить
                        </Button>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="box">
                        <h4 className="mb-3 mb-sm-4">Статистика</h4>
                        <p>
                            Клиентов: <b className="text-success">{statistic.users ?? 0}</b>
                        </p>
                        <p>
                            Заказов: <b className="text-success">{statistic.orders ?? 0}</b>
                        </p>
                        <p>
                            Категорий: <b className="text-success">{statistic.categories ?? 0}</b>
                        </p>
                        <p>
                            Товаров: <b className="text-success">{statistic.products ?? 0}</b>
                        </p>
                        <p>
                            Адресов: <b className="text-success">{statistic.addresses ?? 0}</b>
                        </p>
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default Admin
