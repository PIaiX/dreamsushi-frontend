import React, {useEffect, useMemo, useState} from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {MetaTags} from 'react-meta-tags'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import ProductRecommendations from '../components/ProductRecommendations'
import Info from '../components/UI/Info'
import Loader from '../components/UI/Loader'
import BtnFav from '../components/utils/BtnFav'
import ButtonCart from '../components/utils/ButtonCart'
import {BASE_URL} from '../config/api'
import {customPrice} from '../helpers/product'
import {getProduct, getProductRecommendations} from '../services/product'

const Product = () => {
    let {productId} = useParams()
    const cart = useSelector((state) => state?.cart?.items)
    const [product, setProduct] = useState({
        isLoaded: false,
        error: null,
        item: null,
    })
    const [productRecommendations, setProductRecommendations] = useState({
        isLoaded: false,
        error: null,
        items: [],
    })

    const image =
        product?.item?.media && product.item.media[0]?.media?.full
            ? BASE_URL + '/products' + product.item.media[0].media.full
            : false

    useEffect(() => {
        // redefine product count from api
        getProduct({productId})
            .then((res) => res && setProduct((prev) => ({...prev, isLoaded: true, item: res?.product})))
            .catch((error) => error && setProduct((prev) => ({...prev, isLoaded: true, error})))
    }, [cart, productId])

    useEffect(() => {
        getProductRecommendations({productId})
            .then((res) => setProductRecommendations((prev) => ({...prev, isLoaded: true, items: res?.recommends})))
            .catch((error) => setProductRecommendations((prev) => ({...prev, isLoaded: true, error})))
    }, [productId])

    return (
        <main>
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME + ' — ' + product?.item?.title}</title>
                <meta property="title" content={process.env.REACT_APP_SITE_NAME + ' — ' + product?.item?.title} />
                <meta
                    property="description"
                    content={product?.item?.description ?? process.env.REACT_APP_SITE_DESCRIPTION}
                />
                <meta property="og:title" content={process.env.REACT_APP_SITE_NAME} />
                <meta property="og:image" content={image} />
            </MetaTags>
            <Container>
                {!product?.error ? (
                    product?.isLoaded ? (
                        product?.item ? (
                            <section className="product-full mb-6">
                                <Row className="gx-lg-5">
                                    <Col md={5} className="mb-4 mb-sm-5 mb-md-0">
                                        <figure className="product-full-img">
                                            <img src={image} alt={product?.item?.title} />
                                            {product?.new && <figcaption>новинка</figcaption>}
                                            <BtnFav product={product.item} />
                                        </figure>
                                    </Col>
                                    <Col md={6}>
                                        <div className="h-100 d-flex flex-column justify-content-between">
                                            <div>
                                                <h1>{product?.item?.title}</h1>
                                                <Row>
                                                    <Col xs={12} lg={8}>
                                                        <h6>Состав блюда</h6>
                                                        <div>{product?.item?.description}</div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="mt-4 d-flex flex-column flex-lg-row-reverse justify-content-end align-lg-items-center">
                                                <div className="d-flex align-items-center ms-lg-5">
                                                    <span className="fs-15 fw-6 me-4">
                                                        {product?.item?.weight} г
                                                    </span>
                                                    <span className="main-color fs-15 fw-6">
                                                        {customPrice(product?.item?.price)}
                                                    </span>
                                                    {product?.item?.priceSale > 0 && (
                                                        <del className="light-gray fw-6 ms-3">
                                                            {customPrice(product.item.priceSale)}
                                                        </del>
                                                    )}
                                                </div>
                                                <ButtonCart product={product.item} btnText="Добавить в корзину" />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </section>
                        ) : (
                            <Info>Продукт не найден</Info>
                        )
                    ) : (
                        <Loader full />
                    )
                ) : (
                    <Info>Не удалось загрузить продукт</Info>
                )}

                {!productRecommendations?.error ? (
                    productRecommendations?.isLoaded ? (
                        productRecommendations?.items?.length > 0 ? (
                            <ProductRecommendations products={productRecommendations?.items} title="Похожие блюда" />
                        ) : null
                    ) : (
                        <Loader full />
                    )
                ) : null}
            </Container>
        </main>
    )
}

export default Product
