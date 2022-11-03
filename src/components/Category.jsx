import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductItem from './ProductItem'

const Category = ({category = {}}) => {
    return (
        <section id="categorie-1" className="mb-6">
            <h2>Сеты</h2>
            <Row xs={2} md={3} lg={4} className="products gx-3 gx-sm-4 gy-5">
                <Col>
                    <ProductItem
                        title={'Рандеву (Филадельфия, Будапешт, Дели)'}
                        imgLink={'images/products/prod1.jpg'}
                        price={'1100 '}
                        oldPrice={'1300'}
                        weight={'1000'}
                    />
                </Col>
                <Col>
                    <ProductItem
                        title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'}
                        imgLink={'images/products/prod2.jpg'}
                        price={'1100 '}
                        oldPrice={''}
                        weight={'1000'}
                    />
                </Col>
                <Col>
                    <ProductItem
                        title={'Сашими (6 шт)'}
                        imgLink={'images/products/prod3.jpg'}
                        price={'900'}
                        oldPrice={''}
                        weight={'1000'}
                    />
                </Col>
                <Col>
                    <ProductItem
                        title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'}
                        imgLink={'images/products/prod4.jpg'}
                        price={'1100 '}
                        oldPrice={''}
                        weight={'1000'}
                    />
                </Col>
                <Col>
                    <ProductItem
                        title={'Суши Вельвет'}
                        imgLink={'images/products/prod5.jpg'}
                        price={'900'}
                        oldPrice={''}
                        weight={'1000'}
                    />
                </Col>
                <Col>
                    <ProductItem
                        title={'Рандеву (Филадельфия, Будапешт, Дели)'}
                        imgLink={'images/products/prod1.jpg'}
                        price={'1100 '}
                        oldPrice={'1300'}
                        weight={'1000'}
                    />
                </Col>
                <Col>
                    <ProductItem
                        title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'}
                        imgLink={'images/products/prod2.jpg'}
                        price={'1100 '}
                        oldPrice={''}
                        weight={'1000'}
                    />
                </Col>
                <Col>
                    <ProductItem
                        title={'Сашими (6 шт)'}
                        imgLink={'images/products/prod3.jpg'}
                        price={'900'}
                        oldPrice={''}
                        weight={'1000'}
                    />
                </Col>
            </Row>
        </section>
    )
}

export default Category
