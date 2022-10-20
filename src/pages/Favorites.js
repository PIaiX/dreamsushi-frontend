import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductCard from '../components/ProductCard'

function Favorites(props) {
    return (
        <main>
            <Container>
                <section className='mb-6'>
                    <h1>Любимые блюда</h1>
                    <Row xs={2} md={3} lg={4} className='justify-content-center gx-3 gx-sm-4 gy-5'>
                        <Col>
                            <ProductCard title={'Маргарита'} imgLink={'imgs/products/prod10.jpg'} price={'1100 '} oldPrice={'1300'} weight={'1000'} fav={true}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Пицца Мясная'} imgLink={'imgs/products/prod8.jpg'} price={'1100 '} oldPrice={''} weight={'1000'} fav={true}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Пеперони Острая'} imgLink={'imgs/products/prod9.jpg'} price={'900'} oldPrice={''} weight={'1000'} fav={true}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Посейдон'} imgLink={'imgs/products/prod7.jpg'} price={'1100 '} oldPrice={''} weight={'1000'} fav={true}/>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    );
}

export default Favorites;