import React, {useCallback, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'
import CartItem from '../components/CartItem'
import {useDispatch, useSelector} from 'react-redux'
import Info from '../components/UI/Info'
import Loader from '../components/UI/Loader'
import CustomModal from '../components/utils/CustomModal'
import Button from '../components/UI/Button'
import OrderFree from '../components/OrderFree'
import {MetaTags} from 'react-meta-tags'
import {cartDelete} from '../store/reducers/cartSlice'
import {useTotalCart} from '../hooks/useCart'
import {customPrice} from '../helpers/product'

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state?.cart)
    const cartData = useTotalCart()

    const [deleteModal, setDeleteModal] = useState({
        isShow: false,
        id: null,
    })

    const onDeleteAction = useCallback((product) => {
        product && setDeleteModal({isShow: true, product})
    }, [])

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
                                <div className="mt-2 mt-sm-0 ms-sm-4">{cartData.count} позиции</div>
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
                                        <hr />
                                        <h4 className="mb-2 mb-sm-3">
                                            <span className="main-color me-2">•</span> Детали
                                        </h4>
                                        <table className="simple mb-4">
                                            <tbody>
                                                <tr>
                                                    <td>{cartData.count} позиции</td>
                                                    <td>{customPrice(cartData.price)}</td>
                                                </tr>
                                                {cartData.discount > 0 && (
                                                    <tr>
                                                        <td>Скидка</td>
                                                        <td>-{customPrice(cartData.discount)}</td>
                                                    </tr>
                                                )}
                                                {/* {watch('typeDelivery') == 'delivery' && (
                                                <tr>
                                                    <td>Доставка</td>
                                                    <td>{customPrice(process.env.REACT_APP_DELIVERY_PRICE)}</td>
                                                </tr>
                                            )} */}
                                                <tr>
                                                    <td>Сумма заказа</td>
                                                    <td>{customPrice(cartData.total)}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <Link to="checkout" className="btn-2 w-100">
                                            Перейти к оформлению
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </section>
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
