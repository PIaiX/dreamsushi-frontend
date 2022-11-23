import React, {useCallback, useEffect, useMemo, useState, useTransition} from 'react'
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
import ProductRecommendations from '../components/ProductRecommendations'
import {cartCreate, cartDelete, cartEdit} from '../services/RTK/cart'
import {toggleFavorite} from '../services/RTK/favorite'
import {customPrice} from '../helpers/product'
import {MetaTags} from 'react-meta-tags'

const Product = () => {
    const dispatch = useDispatch()
    let {productId} = useParams()
    productId = +productId
    const cart = useSelector((state) => state?.cart?.items)
    const [isPending, startTransition] = useTransition()
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
    const favorites = useSelector((state) => state?.favorite?.items)
    const favoriteItem = useMemo(() => {
        if (favorites?.length) {
            return favorites.find((item) => item?.id === product?.item?.id)
        } else return false
    }, [favorites, product])

    const updateCart = useCallback(
        (mode = 'plus') => {
            startTransition(() => {
                const count = product?.item?.count
                const isCartCreate = count === 0 && mode === 'plus'
                const isCartDelete = count === 1 && mode === 'minus'

                if (isCartCreate) {
                    dispatch(cartCreate({product: product.item}))
                } else if (isCartDelete) {
                    dispatch(cartDelete({productId}))
                } else {
                    dispatch(
                        cartEdit({
                            productId,
                            count: mode === 'plus' ? count + 1 : count - 1,
                        })
                    )
                }
            })
        },
        [product, productId]
    )

    useEffect(() => {
        const cartItem = cart.find((item) => item?.id === productId)

        // redefine product count from redux
        if (cart && cart?.length && cartItem?.count) {
            setProduct((prev) => ({...prev, isLoaded: true, item: cartItem}))
        } else {
            // redefine product count from api
            getProduct({productId})
                .then((res) => res && setProduct((prev) => ({...prev, isLoaded: true, item: res?.product})))
                .catch((error) => error && setProduct((prev) => ({...prev, isLoaded: true, error})))
        }
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
                <meta property="og:image" content={getImageURL(product?.item?.images)} />
            </MetaTags>
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
                                            <BtnFav
                                                isFav={favoriteItem}
                                                toggleFav={() => dispatch(toggleFavorite({product: product?.item}))}
                                            />
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
                                                    {product?.item?.priceSale > 0 && (
                                                        <del className="light-gray fw-6 ms-3">
                                                            {customPrice(product.item.priceSale)} ₽
                                                        </del>
                                                    )}
                                                </div>
                                                <form className="btns">
                                                    <button
                                                        type="button"
                                                        className="edge me-2 me-sm-3"
                                                        onClick={() => updateCart('minus')}
                                                        disabled={product?.item?.count <= 0}
                                                    >
                                                        <FiMinus />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="center"
                                                        onClick={() => updateCart()}
                                                        disabled={product?.item?.count > 0}
                                                    >
                                                        {product?.item?.count === 0
                                                            ? 'Выбрать'
                                                            : product?.item?.count}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="edge ms-2 ms-sm-3"
                                                        onClick={() => updateCart()}
                                                        disabled={product?.item?.count >= 999}
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
                            <Loader full />
                        </div>
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
                        <div className="d-flex justify-content-center align-items-center">
                            <Loader />
                        </div>
                    )
                ) : null}
            </Container>
        </main>
    )
}

export default Product
