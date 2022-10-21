import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BsFillRecordFill } from "react-icons/bs"
import { IoHeart, IoFish, IoPizza, IoRestaurant } from "react-icons/io5"

const About = () => {
    return (
        <main>
            <Container>
                <section className='about mb-6'>
                    <h1 className='main-color text-center'>DreamSushi</h1>
                    <h2 className='text-center mb-5'>Наши точки в Казани</h2>
                    <Row xs={1} md={2} lg={3} className='justify-content-center g-4 mb-5'>
                        <Col>
                            <div className='d-flex'>
                                <div className='me-2 me-sm-4 pt-3'>
                                    <BsFillRecordFill className='main-color fs-15'/>
                                </div>
                                <div className='flex-1'>
                                    <p className='fs-12 mb-3 mb-lg-4'>улица Гагарина, 93 <br/>Московский район, Казань</p>
                                    <p className='font-faded mb-2 mb-lg-3'>Открыты с 10:00 до 22:30</p>
                                    <p className='font-faded mb-2 mb-lg-3'>В воскресенье с 10:00 до 22:00</p>
                                    <div><a className='fs-12 fw-7' href="tel:+79061145814">+7 906 114-58-14</a></div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='d-flex'>
                                <div className='me-2 me-sm-4 pt-3'>
                                    <BsFillRecordFill className='main-color fs-15'/>
                                </div>
                                <div className='flex-1'>
                                    <p className='fs-12 mb-3 mb-lg-4'>улица Юлиуса Фучика, 88А <br/>Советский район, Казань</p>
                                    <p className='font-faded mb-2 mb-lg-3'>Советский район, Казань</p>
                                    <div><a className='fs-12 fw-7' href="tel:+79061145814">+7 906 114-58-14</a></div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='d-flex'>
                                <div className='flex-1 me-2 me-sm-4'>
                                    <p className='fs-15 mb-3 mb-lg-4'>Мы во Вконтакте</p>
                                    <p className='fs-11 mb-2 mb-lg-3'>+ 9 000 участников</p>
                                    <p className='fs-11 mb-2 mb-lg-3'>+ 300 реальных отзывов</p>
                                    <div><a href='https://vk.com/market-157878257' target='_blank' className='font-faded bb-1'>Смотреть отзывы</a></div>
                                </div>
                                <a href='https://vk.com/market-157878257' target='_blank'><img src='imgs/icons/vk.svg' alt='Мы во Вконтакте' className='icon'/></a>
                            </div>
                        </Col>
                    </Row>

                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A7a0a0d8272fe1cc3e5f1dc0d85c1527ad62fac23a41e932974f23a0ba6e6000d&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>

                    <Row className='justify-content-around mt-5'>
                        <Col xs={12} md={6} lg={5} xxl={4} className='mb-4 mb-md-0'>
                            <ul className='list-unstyled'>
                                <li className='d-flex mb-4 mb-sm-5'>
                                    <IoHeart className='fs-20 main-color'/>
                                    <div className='flex-1 ms-3 ms-sm-4'>
                                        <h5 className='fs-15'>Готовим с любовью</h5>
                                        <p className='font-faded mt-2 mt-sm-3'>В DreamSushi каждый ролл приготовлен с заботой о ваших гастрономических предпочтениях</p>
                                    </div>
                                </li>
                                <li className='d-flex mb-4 mb-sm-5'>
                                    <IoFish className='fs-20 main-color'/>
                                    <div className='flex-1 ms-3 ms-sm-4'>
                                        <h5 className='fs-15'>Свежие ингредиенты</h5>
                                        <p className='font-faded mt-2 mt-sm-3'>Используем только охлаждённый, а не замороженный лосось. Так мы сохраняем максимум полезных свойств и ярких вкусовых качеств</p>
                                    </div>
                                </li>
                                <li className='d-flex mb-4 mb-sm-5'>
                                    <IoPizza className='fs-20 main-color'/>
                                    <div className='flex-1 ms-3 ms-sm-4'>
                                        <h5 className='fs-15'>Разнообразие начинок</h5>
                                        <p className='font-faded mt-2 mt-sm-3'>Более + 300 позиций, много начинки, большие порции</p>
                                    </div>
                                </li>
                                <li className='d-flex mb-4 mb-sm-5'>
                                    <IoRestaurant className='fs-20 main-color'/>
                                    <div className='flex-1 ms-3 ms-sm-4'>
                                        <h5 className='fs-15'>Специальное предложение</h5>
                                        <p className='font-faded mt-2 mt-sm-3'>Для самых экономных мы придумали специальное предложение, в котором порции значительно меньше, но всё так же вкусно!</p>
                                    </div>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={12} md={6} lg={5} xxl={4}>
                            <h3 className='fw-6 mb-4'><span className='main-color'>Dream Sushi</span> - мечтай, заказывай, воплощай!</h3>
                            <div className='text'>
                            <p>Разнообразие начинок, всегда свежие ингредиенты в составе роллов полностью оправдают ваши ожидания и вложения</p>
                            <p>Ощутить всю полноту вкусов наших роллов вы сможете только заказав из основного меню.</p>
                            <p>Закажите доставку в самый отдалённый уголок и мы привезём ваш заказ без опозданий.</p>
                            <p>Удобная и простая форма оформления заказов <a className='blue' href='https://vk.com/market-157878257' target='_blank'>ВКонтакте</a> также экономит ваше время.</p>
                            <p>Либо закажите по телефону:</p>
                            <p><a href='tel:+78432406727'>+7 843 240-67-27</a>;</p>
                            <p><a href='tel:+79061145814'>+7 (906) 114–58–14</a>.</p>
                            <p>Нет времени ждать? Приезжайте и забирайте ваш заказ с Гагарина 93 либо Фучика 88А</p>
                            <p>Здесь вас всегда встретит дружелюбный персонал, ответит на все вопросы, а также с радостью поможет с выбором</p>
                            <p>Добро пожаловать в мир качества роллов Dream Sushi!</p>
                            </div>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    );
};

export default About;