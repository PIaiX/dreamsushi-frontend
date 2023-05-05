import React, {useState, useLayoutEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductItem from './ProductItem'
import CustomModal from './utils/CustomModal'
import {getProductsPerson} from '../services/product'

const ProductPerson = ({products = [], show = false, setShow}) => {
    const [productPerson, setProductPerson] = useState({
        isLoaded: false,
        items: [],
    })
    useLayoutEffect(() => {
        getProductsPerson()
            .then((res) => setProductPerson((prev) => ({...prev, loading: false, items: res?.products})))
            .catch(() => setProductPerson((prev) => ({...prev, loading: false})))
    }, [])

    return (
        <CustomModal title="Дополнительно" size="lg" isShow={show} setIsShow={(bool) => setShow(bool)}>
            <Row xs={2} md={2} lg={3} className="justify-content-start gx-3 gx-sm-4 gy-5">
                {productPerson.items.length > 0 &&
                    productPerson.items.map((item) => (
                        <Col key={item?.id}>
                            <ProductItem product={item} />
                        </Col>
                    ))}
            </Row>
        </CustomModal>
    )
}

export default ProductPerson
