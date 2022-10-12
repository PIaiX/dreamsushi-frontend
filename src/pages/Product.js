import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Product(props) {
    return (
        <main>
            <Container>
                <Row>
                    <Col md={5}>

                    </Col>
                    <Col md={6}>
                        <h1>Пицца Дейви Джонс</h1>
                        <h6>Состав блюда</h6>
                        <div>Тигровые креветки, Апельсин, Сыр Моцарелла, Сыр Чеддер, Сливочный соус, Зелень</div>
                        <Row md={3} className='mt-5'>
                            <Col>
                                <h6>Количество</h6>
                                <div>1 шт.</div>
                            </Col>
                            <Col>
                                <h6>Вес</h6>
                                <div>850 г</div>
                            </Col>
                            <Col>
                                <h6>Категория</h6>
                                <div>Пиццы</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>  
            </Container>
        </main>
    );
}

export default Product;