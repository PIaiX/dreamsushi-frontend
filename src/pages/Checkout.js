import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

const Checkout = () => {
    const [delivery, setDelivery] = useState(true)
    const productsCount = 2
    return (
        <main>
            <Container>
                <section className='mb-6'>
                    <div className='d-sm-flex align-items-baseline mb-4 mb-sm-5'>
                        <h1 className='mb-0'>Оформление заказа</h1>
                        <div className='mt-2 mt-sm-0 ms-sm-4'>{productsCount} позиции</div>
                    </div>

                    <form>
                        <Row className='justify-content-between'>
                            <Col xs={12} lg={7} xxl={6}>
                                <Row>
                                    <Col md={6}>
                                        <div className='fw-5 mb-2 mb-sm-3'>Номер телефона</div>
                                        <input type='text' placeholder='Номер телефона'/>

                                        <div className='fw-5 mt-4 mt-sm-5 mb-2 mb-sm-3'>Тип заказа</div>
                                        <div className='toggle-btns'>
                                            <button type='button' className={(delivery)?'btn active':'btn'} onClick={()=>setDelivery(true)}>Доставка</button>
                                            <button type='button' className={(delivery)?'btn':'btn active'} onClick={()=>setDelivery(false)}>Самовывоз</button>
                                        </div>
                                    </Col>
                                </Row>
                                {
                                    (delivery)
                                    ? <fieldset className='mt-4 mt-sm-5'>
                                        <legend className='mb-2 mb-sm-3'>Адрес доставки</legend>
                                        <Row xs={1} md={2} className='g-2 g-sm-4'>
                                            <Col>
                                                <input type='text' placeholder='Улица и дом'/>
                                            </Col>
                                            <Col>
                                                <input type='text' placeholder='Подъезд'/>
                                            </Col>
                                            <Col>
                                                <input type='text' placeholder='Этаж'/>
                                            </Col>
                                            <Col>
                                                <input type='text' placeholder='Номер квартиры'/>
                                            </Col>
                                        </Row>
                                    </fieldset>
                                    : <fieldset className='mt-4 mt-sm-5'>
                                        <legend className='mb-2 mb-sm-3'>Адрес ресторана</legend>
                                        <Row xs={1} md={2} className='g-3 g-sm-4'>
                                            <Col>
                                                <label>
                                                    <input type='radio' name='address'/>
                                                    <div className='flex-1 ms-3'>
                                                        <div className='fs-11'>ул. Юлиуса Фучика, 88А</div>
                                                        <div className='fs-09 mt-2'>Советский р-н</div>
                                                        <div className='fs-09 font-faded mt-2'>Открыто до 22:30</div>
                                                    </div>
                                                </label>
                                            </Col>
                                            <Col>
                                                <label>
                                                    <input type='radio' name='address'/>
                                                    <div className='flex-1 ms-3'>
                                                        <div className='fs-11'>ул. Гагарина, 93</div>
                                                        <div className='fs-09 mt-2'>Московский р-н</div>
                                                        <div className='fs-09 font-faded mt-2'>Открыто до 22:00</div>
                                                    </div>
                                                </label>
                                            </Col>
                                        </Row>
                                    </fieldset>
                                }
                                <Row>
                                    <Col md={6}>
                                        <div className='fw-5 mt-4 mt-sm-5 mb-2 mb-sm-3'>Желаемое время подачи</div>
                                        <input type='time'/>

                                        <div className='fw-5 mt-4 mt-sm-5 mb-2 mb-sm-3'>Комментарий к заказу</div>
                                        <textarea placeholder='Комментарий по желанию' rows={3}></textarea>

                                        <div className='fs-12 fw-5 mt-4 mt-sm-5 mb-2 mb-sm-3'>Способ оплаты</div>
                                        <label className='mb-3'>
                                            <input type='radio' name='payment'/>
                                            <span className='ms-3'>Онлайн на сайте</span>
                                        </label>
                                        <label>
                                            <input type='radio' name='payment'/>
                                            <span className='ms-3'>Онлайн на сайте</span>
                                        </label>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} lg={5} xxl={4}>
                                <div className='box mt-4 mt-sm-5 mt-lg-0'>
                                    <div>
                                        <h4 className='mb-2 mb-sm-3'><span className='main-color me-2'>•</span> Ваш заказ</h4>
                                        <table className='simple'>
                                            <tbody>
                                                <tr>
                                                    <td>Пицца Итальяно</td>
                                                    <td>2 шт.</td>
                                                </tr>
                                                <tr>
                                                    <td>Соус Спайси</td>
                                                    <td>1 шт.</td>
                                                </tr>
                                                <tr>
                                                    <td>Роллы Венесуэла</td>
                                                    <td>1 шт.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <hr/>   
                                    <div>
                                        <h4 className='mb-2 mb-sm-3'><span className='main-color me-2'>•</span> Бесплатно к заказу</h4>
                                        <table className='simple'>
                                            <tbody>
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
                                    <hr/>
                                    <div>
                                        <h4 className='mb-2 mb-sm-3'><span className='main-color me-2'>•</span> Детали</h4>
                                        <table className='simple'>
                                            <tbody>
                                                <tr>
                                                    <td>4 позиции</td>
                                                    <td>3 469 ₽</td>
                                                </tr>
                                                <tr>
                                                    <td>Скидка</td>
                                                    <td>669 ₽</td>
                                                </tr>
                                                <tr>
                                                    <td>Доставка</td>
                                                    <td>+ 100 ₽</td>
                                                </tr>
                                                <tr>
                                                    <td>Сумма заказа</td>
                                                    <td>3 569 ₽</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <button type='button' className='btn-2 mt-4 mt-sm-5' disabled>Оформить заказ за 3 469 ₽</button>
                            </Col>
                        </Row>
                    </form>
                </section>
            </Container>
        </main>
    );
};

export default Checkout;