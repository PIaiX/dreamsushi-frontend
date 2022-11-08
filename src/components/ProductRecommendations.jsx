import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductItem from './ProductItem'

const ProductRecommendations = ({products = [], title = ''}) => {
    return (
        <section className="mb-6">
            <h2>{title}</h2>
            <Row xs={2} md={3} lg={4} className="justify-content-start gx-3 gx-sm-4 gy-5">
                {products.map((item) => (
                    <Col key={item?.id}>
                        <ProductItem product={item} />
                    </Col>
                ))}
            </Row>
        </section>
    )
}

export default ProductRecommendations
