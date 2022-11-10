import React, {useCallback, useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductItem from '../components/ProductItem'
import {Link} from 'react-router-dom'
import CartItem from '../components/CartItem'
import {useDispatch, useSelector} from 'react-redux'
import {cartEdit, getCart} from '../services/cart'
import Info from '../components/UI/Info'
import Loader from '../components/UI/Loader'
import {getProductRecommendations} from '../services/product'
import ProductRecommendations from '../components/ProductRecommendations'
import CustomModal from '../components/utils/CustomModal'
import Button from '../components/UI/Button'
import {dispatchAlert, dispatchApiErrorAlert} from '../helpers/alert'
import {apiResponseMessages} from '../config/api'
import OrderFree from '../components/OrderFree'

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const userId = useSelector((state) => state?.auth?.user?.id)
    const reduxCart = useSelector((state) => state?.cart?.items)
    const [cart, setCart] = useState({
        isLoaded: false,
        error: null,
        items: [],
    })
    const [productRecommendations, setProductRecommendations] = useState({
        isLoaded: false,
        error: null,
        items: [],
    })
    const [deleteModal, setDeleteModal] = useState({
        isShow: false,
        id: null,
    })

    const updateProductCount = useCallback(
        (newCount, productId) => {
            setCart((prev) => ({
                ...prev,
                items: prev.items.map((item) => {
                    if (item?.id === productId) {
                        return {...item, count: newCount}
                    } else return item
                }),
            }))
        },
        [cart]
    )

    const onDeleteAction = useCallback((productId) => {
        productId && setDeleteModal({isShow: true, id: productId})
    }, [])

    const deleteProduct = useCallback(
        (productId) => {
            if (isAuth) {
                cartEdit({
                    productId,
                    count: 0,
                    userId,
                })
                    .then(() => {
                        dispatchAlert('success', apiResponseMessages.CART_DELETE)
                        updateProductCount(0, productId)
                    })
                    .catch((error) => dispatchApiErrorAlert(error))
            } else {
                dispatch(deleteProduct({productId}))
                updateProductCount(0, productId)
            }

            setDeleteModal({isShow: false, id: null})
        },
        [isAuth, userId, updateProductCount]
    )

    useEffect(() => {
        isAuth
            ? getCart()
                  .then((res) => res && setCart((prev) => ({...prev, isLoaded: true, items: res?.products})))
                  .catch((error) => error && setCart((prev) => ({...prev, isLoaded: true, error})))
            : setCart((prev) => ({...prev, isLoaded: true, items: reduxCart}))
    }, [isAuth, reduxCart])

    useEffect(() => {
        // ! HARD CODE PRODUCT ID
        getProductRecommendations({productId: 1})
            .then((res) => setProductRecommendations((prev) => ({...prev, isLoaded: true, items: res?.recommends})))
            .catch((error) => setProductRecommendations((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    useEffect(() => {
        console.log('cart', cart)
    }, [cart])

    return (
        <main>
            {cart.error ? (
                <Info>Не удалось загрузить корзину</Info>
            ) : cart.isLoaded ? (
                cart.items?.length ? (
                    <Container>
                        <section className="mb-6">
                            <div className="d-sm-flex align-items-baseline mb-4 mb-sm-5">
                                <h1 className="mb-0">Вы добавили</h1>
                                <div className="mt-2 mt-sm-0 ms-sm-4">{cart.items.length} позиции</div>
                            </div>
                            <Row className="justify-content-between">
                                <Col xs={12} lg={7} xxl={6}>
                                    {cart.items.map((item) => (
                                        <CartItem
                                            key={item?.id}
                                            product={item}
                                            updateProductCount={updateProductCount}
                                            onDeleteAction={onDeleteAction}
                                        />
                                    ))}
                                </Col>
                                <Col xs={12} lg={5} xxl={4}>
                                    <div className="box">
                                        <OrderFree />
                                        <Link to="checkout" className="btn-2 w-100 mt-3">
                                            Перейти к оформлению
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </section>
                        {!productRecommendations?.error ? (
                            productRecommendations?.isLoaded ? (
                                productRecommendations?.items?.length ? (
                                    <ProductRecommendations
                                        products={productRecommendations?.items}
                                        title="Добавьте к заказу"
                                    />
                                ) : null
                            ) : (
                                <div className="d-flex justify-content-center align-items-center">
                                    <Loader size={150} />
                                </div>
                            )
                        ) : null}
                    </Container>
                ) : (
                    <Container className="empty-page">
                        <section>
                            <img src="images/cart-img.svg" alt="корзина" className="img-fluid" />
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
                <div className="d-flex justify-content-center align-items-center mb-5">
                    <Loader full />
                </div>
            )}

            <CustomModal
                title="Удаление товара"
                isShow={deleteModal.isShow}
                setIsShow={(bool) => setDeleteModal({isShow: bool, id: null})}
                footer={
                    <>
                        <Button className="btn-1 me-3" onClick={() => setDeleteModal({isShow: false, id: null})}>
                            Отмена
                        </Button>
                        <Button className="btn-2" onClick={() => deleteModal.id && deleteProduct(deleteModal.id)}>
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
