import React, {useCallback, useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductItem from '../components/ProductItem'
import {Link} from 'react-router-dom'
import CartItem from '../components/CartItem'
import {useSelector} from 'react-redux'
import {getCart} from '../services/cart'
import Info from '../components/UI/Info'
import Loader from '../components/UI/Loader'
import {getProductRecommendations} from '../services/product'
import ProductRecommendations from '../components/ProductRecommendations'
import CustomModal from '../components/utils/CustomModal'
import Button from '../components/UI/Button'

const ShoppingCart = () => {
    const isAuth = useSelector((state) => state?.auth?.isAuth)
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

    const onDeleteProduct = useCallback(() => {}, [deleteModal.id])

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
                                        <CartItem key={item?.id} product={item} setCart={setCart} />
                                    ))}
                                </Col>
                                <Col xs={12} lg={5} xxl={4}>
                                    <Row className="g-4" xs={1} md={2} lg={1}>
                                        <Col>
                                            <div className="box">
                                                <h4 className="mb-3 mb-sm-4">
                                                    <span className="main-color me-2">•</span> Бесплатно к заказу
                                                </h4>
                                                <table className="simple">
                                                    <tbody>
                                                        <tr>
                                                            <td>Палочки китайские</td>
                                                            <td>2 пары</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Соевый соус</td>
                                                            <td>100 мл</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Имбирь Табуко</td>
                                                            <td>30 г</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Васаби</td>
                                                            <td>30 г</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Салфетки</td>
                                                            <td>10 шт</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Жвачка</td>
                                                            <td>2 шт</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="box">
                                                <h4 className="mb-3 mb-sm-4">
                                                    <span className="main-color me-2">•</span> Детали
                                                </h4>
                                                <table className="simple">
                                                    <tbody>
                                                        <tr>
                                                            <td>4 позиции</td>
                                                            <td className="fs-12">3 469 ₽</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Скидка</td>
                                                            <td className="fs-11">669 ₽</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Доставка</td>
                                                            <td className="fs-08">Рассчитаем при оформлении</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="fw-6">Сумма&nbsp;заказа</td>
                                                            <td className="fs-12 fw-7">3 469 ₽</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <Link to="checkout" className="btn-2 w-100 mt-3">
                                                    Перейти к оформлению
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
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
                    <Loader size={150} />
                </div>
            )}

            {/*<CustomModal*/}
            {/*    title="Удаление товара"*/}
            {/*    isShow={deleteModal}*/}
            {/*    setIsShow={(e) => setDeleteModal({isShow: e, id: false})}*/}
            {/*    footer={*/}
            {/*        <>*/}
            {/*            <Button className="btn-1 me-3" onClick={() => setDeleteModal({isShow: false, id: null})}>*/}
            {/*                Отмена*/}
            {/*            </Button>*/}
            {/*            <Button className="btn-2" onClick={() => deleteModal.id && onDeleteProduct(deleteModal.id)}>*/}
            {/*                Удалить*/}
            {/*            </Button>*/}
            {/*        </>*/}
            {/*    }*/}
            {/*>*/}
            {/*    Вы точно хотите удалить товар из корзины?*/}
            {/*</CustomModal>*/}
        </main>
    )
}

export default ShoppingCart
