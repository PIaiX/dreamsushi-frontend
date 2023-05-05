import React from 'react'
import ProductItem from './ProductItem'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Products = ({products = [], limit = 4}) => {
    return (
        <Row xs={2} md={3} lg={4} className="products gx-3 gx-sm-4 gy-5">
            {products?.length > 0 &&
                products.map((item) => (
                    <Col key={item.id}>
                        <ProductItem product={item} />
                    </Col>
                ))}
        </Row>
    )
}

export default Products
