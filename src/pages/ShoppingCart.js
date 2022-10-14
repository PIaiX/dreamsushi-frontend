import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'

function ShoppingCart(props) {
    const productsCount = 6
    return (
        <main>
            <Container>
                {
                    (productsCount === 0)
                    ? <section className='mb-6'>
                        <img src='imgs/cart-img.svg' alt='корзина'/>
                        <h1>В корзине ничего</h1>
                        <p>Добавляйте блюда в коризну, мы покажем их здесь</p>
                        <Link to='/' className='btn-1'>В меню</Link>
                    </section>
                    : <>
                    <section className='mb-6'>
                        <div className='d-flex align-items-center mb-5'>
                            <h1 className='mb-0'>Вы добавили</h1>
                            <span className='ms-4'>{productsCount} позиции</span>
                        </div>
                        <Row className='justify-content-between'>
                            <Col xs={12} lg={7} xxl={6}>
                                <CartItem title={'Пицца Итальяно'} imgLink={'imgs/products/prod10.jpg'} ingredients={'Бекон, Куринные бёдрышки, Томаты черри, Грибы шампиньоны, Соус пэсто, Сыр Моцарелла, Сыр Чеддер'} weight={700} price={900} discount={0.25}/>
                                <CartItem title={'Пицца Итальяно'} imgLink={'imgs/products/prod10.jpg'} ingredients={'Бекон, Куринные бёдрышки, Томаты черри, Грибы шампиньоны, Соус пэсто, Сыр Моцарелла, Сыр Чеддер'} weight={700} price={900}/>
                                <CartItem title={'Пицца Итальяно'} imgLink={'imgs/products/prod10.jpg'} ingredients={'Бекон, Куринные бёдрышки, Томаты черри, Грибы шампиньоны, Соус пэсто, Сыр Моцарелла, Сыр Чеддер'} weight={700} price={900} discount={0.25}/>
                            </Col>
                            <Col xs={12} lg={5} xxl={4}>
                                <Row className='g-4' xs={1} md={2} lg={1}>
                                    <Col>
                                        <div className='box'>
                                            <h4 className='mb-3 mb-sm-4'><span className='main-color'>•</span> Бесплатно к заказу</h4>
                                            <table className='simple'>
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
                                        <div className='box'>
                                            <h4 className='mb-3 mb-sm-4'><span className='main-color'>•</span> Детали</h4>
                                            <table className='simple'>
                                                <tbody>
                                                    <tr>
                                                        <td>4 позиции</td>
                                                        <td className='fs-12'>3 469 ₽</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Скидка</td>
                                                        <td className='fs-11'>669 ₽</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Доставка</td>
                                                        <td className='fs-08'>Рассчитаем при оформлении</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='fw-6'>Сумма&nbsp;заказа</td>
                                                        <td className='fs-12 fw-7'>3 469 ₽</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <button type='button' className='btn-2 w-100 mt-3'>Перейти к оформлению</button>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </section>
                    <section className='mb-6'>
                        <h2>Добавьте к заказу</h2>
                        <Row xs={2} md={3} lg={4} className='justify-content-center gx-3 gx-sm-4 gy-5'>
                            <Col>
                                <ProductCard title={'Маргарита'} imgLink={'imgs/products/prod10.jpg'} price={'1100 '} oldPrice={'1300'} weight={'1000'}/>
                            </Col>
                            <Col>
                                <ProductCard title={'Пицца Мясная'} imgLink={'imgs/products/prod8.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                            </Col>
                            <Col>
                                <ProductCard title={'Пеперони Острая'} imgLink={'imgs/products/prod9.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                            </Col>
                            <Col>
                                <ProductCard title={'Посейдон'} imgLink={'imgs/products/prod7.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                            </Col>
                        </Row>
                    </section>
                    </>
                }
            </Container>
        </main>
    );
}

export default ShoppingCart;