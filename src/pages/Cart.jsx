import React, {useCallback, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'
import CartItem from '../components/CartItem'
import {useDispatch, useSelector} from 'react-redux'
import Info from '../components/UI/Info'
import Loader from '../components/UI/Loader'
// import {getProductRecommendations} from '../services/product'
import ProductRecommendations from '../components/ProductRecommendations'
import CustomModal from '../components/utils/CustomModal'
import Button from '../components/UI/Button'
import OrderFree from '../components/OrderFree'
import {MetaTags} from 'react-meta-tags'
import {cartDelete} from '../store/reducers/cartSlice'

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state?.cart)
    const [productRecommendations, setProductRecommendations] = useState({
        isLoaded: false,
        error: null,
        items: [],
    })
    const [deleteModal, setDeleteModal] = useState({
        isShow: false,
        id: null,
    })

    const onDeleteAction = useCallback((product) => {
        product && setDeleteModal({isShow: true, product})
    }, [])

    // useEffect(() => {
    //     // ! HARD CODE PRODUCT ID
    //     getProductRecommendations({productId: 1})
    //         .then((res) => setProductRecommendations((prev) => ({...prev, isLoaded: true, items: res?.recommends})))
    //         .catch((error) => setProductRecommendations((prev) => ({...prev, isLoaded: true, error})))
    // }, [])

    return (
        <main>
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — Корзина</title>
                <meta property="title" content={process.env.REACT_APP_SITE_NAME + ' — Корзина'} />
                <meta property="og:title" content={process.env.REACT_APP_SITE_NAME + ' — Корзина'} />
            </MetaTags>
            {cart?.error ? (
                <Info>Не удалось загрузить корзину</Info>
            ) : !cart?.isLoading ? (
                cart?.items?.length > 0 ? (
                    <Container>
                        <section className="mb-6">
                            <div className="d-sm-flex align-items-baseline mb-4 mb-sm-5">
                                <h1 className="mb-0">Вы добавили</h1>
                                <div className="mt-2 mt-sm-0 ms-sm-4">{cart.items.length} позиции</div>
                            </div>
                            <Row className="justify-content-between">
                                <Col xs={12} lg={7} xxl={6}>
                                    {cart.items.map((item) => (
                                        <CartItem key={item?.id} product={item} onDeleteAction={onDeleteAction} />
                                    ))}
                                </Col>
                                <Col xs={12} lg={5} xxl={4}>
                                    <div className="box">
                                        <OrderFree />
                                        <Link to="checkout" className="btn-2 w-100">
                                            Перейти к оформлению
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </section>
                        {!productRecommendations?.error
                            ? productRecommendations?.isLoaded &&
                              (productRecommendations?.items?.length > 0 ? (
                                  <ProductRecommendations
                                      products={productRecommendations?.items}
                                      title="Добавьте к заказу"
                                  />
                              ) : null)
                            : null}
                    </Container>
                ) : (
                    <Container className="empty-page">
                        <section>
                            <img src="/images/cart-img.png" alt="корзина" className="img-fluid" />
                            <h1 className="text-center my-3">В корзине ничего</h1>
                            <p className="font-faded">
                                Добавляйте блюда в коризну, <br />
                                мы покажем их здесь
                            </p>
                            <Link to="/" className="btn-1 mx-auto px-5 mt-4">
                                В меню
                            </Link>
                        </section>
                    </Container>
                )
            ) : (
                <Loader full />
            )}

            <CustomModal
                title="Удаление товара"
                isShow={deleteModal.isShow}
                setIsShow={(bool) => setDeleteModal({isShow: bool, product: null})}
                footer={
                    <>
                        <Button
                            className="btn-1 me-3"
                            onClick={() => setDeleteModal({isShow: false, product: null})}
                        >
                            Отмена
                        </Button>
                        <Button
                            className="btn-2"
                            onClick={() => {
                                setDeleteModal({isShow: false, product: null})
                                deleteModal.product && dispatch(cartDelete({product: deleteModal.product}))
                            }}
                        >
                            Удалить
                        </Button>
                    </>
                }
            >
                Вы точно хотите удалить товар из корзины?
            </CustomModal>
        </main>
    )
}

export default ShoppingCart
