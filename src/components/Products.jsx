import React, {useEffect, useState} from 'react'
import ProductItem from './ProductItem'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Button, Collapse} from 'react-bootstrap'

const Products = ({products = [], limit = 4}) => {
    // const [formattedProducts, setFormattedProducts] = useState(products)

    // // added collapse state for individual product
    // useEffect(() => {
    //     products?.length &&
    //         setFormattedProducts({
    //             isShow: false,
    //             items: products.slice(0, limit),
    //             collapsedItems: products.slice(limit),
    //         })
    // }, [products])

    return (
        <>
            <Row xs={2} md={3} lg={4} className="products gx-3 gx-sm-4 gy-5">
                {products?.length > 0 &&
                    products.map((item) => (
                        <Col key={item.id}>
                            <ProductItem product={item} />
                        </Col>
                    ))}
            </Row>
            {/* <div className="products__inner">
                {formattedProducts?.collapsedItems?.length > 0 && (
                    <Button
                        className="products__button btn-2"
                        onClick={() => setFormattedProducts((prev) => ({...prev, isShow: !prev.isShow}))}
                        aria-controls="example-collapse-text"
                        aria-expanded={formattedProducts.isShow}
                    >
                        <span>{formattedProducts.isShow ? 'Скрыть' : 'Показать еще'}</span>
                    </Button>
                )}
                <Collapse in={formattedProducts.isShow}>
                    <div id="example-collapse-text">
                        <Row xs={2} md={3} lg={4} className="products gx-3 gx-sm-4 gy-5">
                            {formattedProducts?.collapsedItems?.length > 0 &&
                                formattedProducts.collapsedItems.map((item) => (
                                    <Col key={item.id}>
                                        <ProductItem product={item} />
                                    </Col>
                                ))}
                        </Row>
                    </div>
                </Collapse>
            </div> */}
        </>
    )
}

export default Products
