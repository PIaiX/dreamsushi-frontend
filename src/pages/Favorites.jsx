import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductItem from '../components/ProductItem'

const Favorites = (props) => {
    return (
        <main>
            <Container>
                <section className="mb-6">
                    <h1>Любимые блюда</h1>
                    <Row xs={2} md={3} lg={4} className="justify-content-center gx-3 gx-sm-4 gy-5">
                        <Col>
                            <ProductItem
                                title={'Маргарита'}
                                imgLink={'images/products/prod10.jpg'}
                                price={'1100 '}
                                oldPrice={'1300'}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Пицца Мясная'}
                                imgLink={'images/products/prod8.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Пеперони Острая'}
                                imgLink={'images/products/prod9.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default Favorites
