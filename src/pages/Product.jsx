import React, {useCallback, useEffect, useState, useTransition} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BtnFav from '../components/utils/BtnFav'
import {FiMinus, FiPlus} from 'react-icons/fi'
import {useParams} from 'react-router-dom'
import {getProduct, getProductRecommendations} from '../services/product'
import Info from '../components/UI/Info'
import Loader from '../components/UI/Loader'
import {getImageURL} from '../helpers/image'
import {useDispatch, useSelector} from 'react-redux'
import {cartCreate, cartEdit} from '../services/cart'
import {dispatchAlert, dispatchApiErrorAlert} from '../helpers/alert'
import {apiResponseMessages} from '../config/api'
import ProductRecommendations from '../components/ProductRecommendations'
import {createProduct, deleteProduct, updateProduct} from '../store/reducers/cartSlice'

const Product = () => {
    const dispatch = useDispatch()
    let {productId} = useParams()
    productId = +productId
    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const userId = useSelector((state) => state?.auth?.user?.id)
    const cart = useSelector((state) => state?.cart?.items)
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

    useEffect(() => {
        console.log('prod', product)
    }, [product])

    const onClickCountAction = (mode = 'plus') => {
        startTransition(() => (isAuth ? updateCartWithAuth(mode) : updateCart(mode)))
    }

    const updateCart = useCallback(
        (mode) => {
            const isCartCreate = count === 0 && mode === 'plus'
            const isCartDelete = count === 1 && mode === 'minus'

            if (isCartCreate) {
                dispatch(createProduct({product: product.item}))
                setCount(1)
            } else if (isCartDelete) {
                dispatch(deleteProduct({productId}))
                setCount(0)
            } else {
                dispatch(
                    updateProduct({
                        productId,
                        count: mode === 'plus' ? count + 1 : count - 1,
                    })
                )
                setCount((prev) => (mode === 'plus' ? prev + 1 : prev - 1))
            }
        },
        [count, product?.item?.price, productId]
    )

    const updateCartWithAuth = useCallback(
        (mode) => {
            const isCartCreate = count === 0 && mode === 'plus'
            const isCartDelete = count === 1 && mode === 'minus'

            if (isCartCreate) {
                cartCreate({
                    productId,
                    userId,
                })
                    .then(() => {
                        dispatchAlert('success', apiResponseMessages.CART_CREATE)
                        setCount(1)
                    })
                    .catch(() => dispatchApiErrorAlert())
            } else {
                cartEdit({
                    productId,
                    count: mode === 'plus' ? count + 1 : count - 1,
                    userId,
                })
                    .then(() => {
                        dispatchAlert(
                            'success',
                            isCartDelete ? apiResponseMessages.CART_DELETE : apiResponseMessages.CART_EDIT
                        )
                        setCount((prev) => (mode === 'plus' ? prev + 1 : prev - 1))
                    })
                    .catch(() => dispatchApiErrorAlert())
            }
        },
        [count, productId, userId]
    )

    useEffect(() => {
        getProduct({productId})
            .then((res) => {
                setProduct((prev) => ({...prev, isLoaded: true, item: res?.product}))

                // redefine count from server
                if (isAuth) {
                    res?.product?.cart && setCount(res?.product?.count)
                    // redefine count from localStorage
                } else {
                    const cartItem = cart.find((item) => item?.id === productId)
                    setCount(cartItem?.count || 0)
                }
            })
            .catch((error) => setProduct((prev) => ({...prev, isLoaded: true, error})))
    }, [productId, isAuth])

    useEffect(() => {
        getProductRecommendations({productId})
            .then((res) => setProductRecommendations((prev) => ({...prev, isLoaded: true, items: res?.recommends})))
            .catch((error) => setProductRecommendations((prev) => ({...prev, isLoaded: true, error})))
    }, [productId])

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
                                                        onClick={() => onClickCountAction('minus')}
                                                        disabled={count <= 0}
                                                    >
                                                        <FiMinus />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="center"
                                                        onClick={() => onClickCountAction()}
                                                        disabled={count > 0}
                                                    >
                                                        {isPending ? <Loader /> : count === 0 ? 'Выбрать' : count}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="edge ms-2 ms-sm-3"
                                                        onClick={() => onClickCountAction()}
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
