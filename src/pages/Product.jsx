import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductCard from '../components/ProductCard'
import BtnFav from '../components/utils/BtnFav'

import {FiPlus, FiMinus} from 'react-icons/fi'

const Product = () => {
    const [count, setCount] = useState(0)
    const weight = 500
    const price = 1000
    const discount = 0.1

    const handleMinus = () => {
        count > 0 && setCount(count - 1)
    }
    const handlePlus = () => {
        setCount(count + 1)
    }

    return (
        <main>
            <Container>
                <section className="product-full mb-6">
                    <Row className="gx-lg-5">
                        <Col md={5} className="mb-4 mb-sm-5 mb-md-0">
                            <figure className="product-full-img">
                                <img src="imgs/products/prod6.jpg" alt="Пицца Дейви Джонс" />
                                <figcaption>новинка</figcaption>
                                <BtnFav />
                            </figure>
                        </Col>
                        <Col md={6}>
                            <div className="h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <h1>Пицца Дейви Джонс</h1>
                                    <Row>
                                        <Col xs={12} lg={8}>
                                            <h6>Состав блюда</h6>
                                            <div>
                                                Тигровые креветки, Апельсин, Сыр Моцарелла, Сыр Чеддер, Сливочный
                                                соус, Зелень
                                            </div>
                                        </Col>
                                        <Col xs={12} lg={9}>
                                            <Row md={3} className="gx-2 gx-sm-4 mt-4 mt-xl-5">
                                                <Col>
                                                    <h6>Количество</h6>
                                                    <div>1 шт.</div>
                                                </Col>
                                                <Col>
                                                    <h6>Вес</h6>
                                                    <div>{weight} г</div>
                                                </Col>
                                                <Col>
                                                    <h6>Категория</h6>
                                                    <div>Пиццы</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mt-4 d-flex flex-column flex-lg-row-reverse justify-content-end align-lg-items-center">
                                    <div className="d-flex align-items-center ms-lg-5">
                                        <span className="fs-15 fw-6 me-4">
                                            {count === 0 ? weight : weight * count} г
                                        </span>
                                        {discount !== null ? (
                                            <>
                                                <span className="main-color fs-15 fw-6">
                                                    {count === 0
                                                        ? price * (1 - discount)
                                                        : price * (1 - discount) * count}{' '}
                                                    ₽
                                                </span>
                                                <del className="light-gray fw-6 ms-3">
                                                    {count === 0 ? price : price * count} ₽
                                                </del>
                                            </>
                                        ) : (
                                            <span className="main-color fs-15 fw-6">
                                                {count === 0 ? price : price * count} ₽
                                            </span>
                                        )}
                                    </div>
                                    <form className="btns">
                                        <button
                                            type="button"
                                            className="edge me-2 me-sm-3"
                                            onClick={() => handleMinus()}
                                        >
                                            <FiMinus />
                                        </button>
                                        <button
                                            type="button"
                                            className="center"
                                            onClick={() => setCount(count === 0 ? 1 : count)}
                                        >
                                            {count === 0 ? 'Выбрать' : count}
                                        </button>
                                        <button
                                            type="button"
                                            className="edge ms-2 ms-sm-3"
                                            onClick={() => handlePlus()}
                                        >
                                            <FiPlus />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>

                <section className="mb-6">
                    <h2>Похожие блюда</h2>
                    <Row xs={2} md={3} lg={4} className="justify-content-center gx-3 gx-sm-4 gy-5">
                        <Col>
                            <ProductCard
                                title={'Маргарита'}
                                imgLink={'images/products/prod10.jpg'}
                                price={'1100 '}
                                oldPrice={'1300'}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Пицца Мясная'}
                                imgLink={'images/products/prod8.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Пеперони Острая'}
                                imgLink={'images/products/prod9.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default Product
