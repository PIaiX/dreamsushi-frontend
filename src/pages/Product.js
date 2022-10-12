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
                    <Col md={7}>
                        <h1>Пицца Дейви Джонс</h1>
                    </Col>
                </Row>  
            </Container>
        </main>
    );
}

export default Product;