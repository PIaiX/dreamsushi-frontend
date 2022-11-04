import React, {useCallback, useEffect, useState, useTransition} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductItem from '../components/ProductItem'
import BtnFav from '../components/utils/BtnFav'
import {FiMinus, FiPlus} from 'react-icons/fi'
import {useParams} from 'react-router-dom'
import {getProduct, getProductRecommendations} from '../services/product'
import Info from '../components/UI/Info'
import Loader from '../components/UI/Loader'
import {getImageURL} from '../helpers/image'
import {useSelector} from 'react-redux'
import {cartCreate, cartEdit} from '../services/cart'
import {dispatchAlert, dispatchApiErrorAlert} from '../helpers/alert'
import {apiResponseMessages} from '../config/api'
import ProductRecommendations from '../components/ProductRecommendations'

const Product = () => {
    const {id} = useParams()
    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const userId = useSelector((state) => state?.auth?.user?.id)
    const [isPending, startTransition] = useTransition()
    const [count, setCount] = useState(0)
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

    const updateCount = useCallback(
        (count, mode = 'plus') => {
            if (count === 0 && mode === 'plus') {
                cartCreate({
                    productId: +id,
                    userId,
                })
                    .then(() => dispatchAlert('success', apiResponseMessages.CART_CREATE))
                    .catch(() => dispatchApiErrorAlert())
            } else if (count === 1 && mode === 'minus') {
                cartEdit({
                    productId: +id,
                    count: 0,
                    userId,
                })
                    .then(() => dispatchAlert('success', apiResponseMessages.CART_DELETE))
                    .catch(() => dispatchApiErrorAlert())
            } else {
                cartEdit({
                    productId: +id,
                    count: mode === 'plus' ? count + 1 : count - 1,
                    userId,
                })
                    .then(() => dispatchAlert('success', apiResponseMessages.CART_EDIT))
                    .catch(() => dispatchApiErrorAlert())
            }
        },
        [count, userId, id]
    )

    useEffect(() => {
        getProduct(id)
            .then((res) => {
                setProduct((prev) => ({...prev, isLoaded: true, item: res?.product}))

                // redefine count from server
                res?.product?.cart && setCount(res?.product?.count)
            })
            .catch((error) => setProduct((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    useEffect(() => {
        getProductRecommendations(id)
            .then((res) => setProductRecommendations((prev) => ({...prev, isLoaded: true, items: res?.recommends})))
            .catch((error) => setProductRecommendations((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    useEffect(() => {
        console.log('prod', productRecommendations)
    }, [productRecommendations])

    useEffect(() => {
        console.log('count', count)
    }, [count])

    return (
        <main>
            <Container>
                {!product?.error ? (
                    product?.isLoaded ? (
                        product?.item ? (
                            <section className="product-full mb-6">
                                <Row className="gx-lg-5">
                                    <Col md={5} className="mb-4 mb-sm-5 mb-md-0">
                                        <figure className="product-full-img">
                                            <img
                                                src={getImageURL(product?.item?.images)}
                                                alt={product?.item?.title}
                                            />
                                            <figcaption>новинка</figcaption>
                                            <BtnFav />
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
                                                        {product?.item?.price} ₽
                                                    </span>
                                                    <del className="light-gray fw-6 ms-3">
                                                        {product?.item?.priceSale} ₽
                                                    </del>
                                                </div>
                                                <form className="btns">
                                                    <button
                                                        type="button"
                                                        className="edge me-2 me-sm-3"
                                                        onClick={() => {
                                                            updateCount(count, 'minus')
                                                            setCount((prev) => prev - 1)
                                                        }}
                                                        disabled={count <= 0}
                                                    >
                                                        <FiMinus />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="center"
                                                        onClick={() => {
                                                            updateCount(count)
                                                            count === 0 && setCount((prev) => prev + 1)
                                                        }}
                                                        disabled={count > 0}
                                                    >
                                                        {count === 0 ? 'Выбрать' : count}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="edge ms-2 ms-sm-3"
                                                        onClick={() => {
                                                            updateCount(count)
                                                            setCount((prev) => prev + 1)
                                                        }}
                                                        disabled={count >= 999}
                                                    >
                                                        <FiPlus />
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </section>
                        ) : (
                            <Info>Продукт не найден</Info>
                        )
                    ) : (
                        <div className="d-flex justify-content-center align-items-center mb-5">
                            <Loader size={150} />
                        </div>
                    )
                ) : (
                    <Info>Не удалось загрузить продукт</Info>
                )}

                {!productRecommendations?.error ? (
                    productRecommendations?.isLoaded ? (
                        productRecommendations?.items?.length ? (
                            <ProductRecommendations products={productRecommendations?.items} />
                        ) : null
                    ) : (
                        <div className="d-flex justify-content-center align-items-center">
                            <Loader size={150} />
                        </div>
                    )
                ) : null}
            </Container>
        </main>
    )
}

export default Product
