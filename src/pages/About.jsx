import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {IoFish, IoHeart, IoPizza, IoRestaurant} from 'react-icons/io5'
import {MetaTags} from 'react-meta-tags'

const About = () => {
    return (
        <main>
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — О нас</title>
                <meta property="title" content={process.env.REACT_APP_SITE_NAME + ' — О нас'} />
                <meta
                    property="description"
                    content={`В ${process.env.REACT_APP_SITENAME} каждый ролл приготовлен с заботой о ваших гастрономических предпочтениях`}
                />
                <meta property="og:title" content={process.env.REACT_APP_SITE_NAME + ' — О нас'} />
            </MetaTags>
            <Container>
                <section className="about mb-6">
                    <h1 className="main-color text-center">Sushi Xiao</h1>

                    <Row className="justify-content-around mt-5">
                        <Col xs={12} md={6} lg={5} xxl={4} className="mb-4 mb-md-0">
                            <ul className="list-unstyled">
                                <li className="d-flex mb-4 mb-sm-5">
                                    <IoHeart className="fs-20 main-color" />
                                    <div className="flex-1 ms-3 ms-sm-4">
                                        <h5 className="fs-15">Готовим с любовью</h5>
                                        <p className="font-faded mt-2 mt-sm-3">
                                            В Sushi Xiao каждый ролл приготовлен с заботой о ваших гастрономических
                                            предпочтениях
                                        </p>
                                    </div>
                                </li>
                                <li className="d-flex mb-4 mb-sm-5">
                                    <IoFish className="fs-20 main-color" />
                                    <div className="flex-1 ms-3 ms-sm-4">
                                        <h5 className="fs-15">Свежие ингредиенты</h5>
                                        <p className="font-faded mt-2 mt-sm-3">
                                            Используем только охлаждённый, а не замороженный лосось. Так мы сохраняем
                                            максимум полезных свойств и ярких вкусовых качеств
                                        </p>
                                    </div>
                                </li>
                                <li className="d-flex mb-4 mb-sm-5">
                                    <IoPizza className="fs-20 main-color" />
                                    <div className="flex-1 ms-3 ms-sm-4">
                                        <h5 className="fs-15">Разнообразие начинок</h5>
                                        <p className="font-faded mt-2 mt-sm-3">
                                            Более + 300 позиций, много начинки, большие порции
                                        </p>
                                    </div>
                                </li>
                                <li className="d-flex mb-4 mb-sm-5">
                                    <IoRestaurant className="fs-20 main-color" />
                                    <div className="flex-1 ms-3 ms-sm-4">
                                        <h5 className="fs-15">Специальное предложение</h5>
                                        <p className="font-faded mt-2 mt-sm-3">
                                            Для самых экономных мы придумали специальное предложение, в котором
                                            порции значительно меньше, но всё так же вкусно!
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={12} md={6} lg={5} xxl={4}>
                            <h3 className="fw-6 mb-4">
                                <span className="main-color">Sushi Xiao</span> - мечтай, заказывай, воплощай!
                            </h3>
                            <div className="text">
                                <p>
                                    Разнообразие начинок, всегда свежие ингредиенты в составе роллов полностью
                                    оправдают ваши ожидания и вложения
                                </p>
                                <p>
                                    Ощутить всю полноту вкусов наших роллов вы сможете только заказав из основного
                                    меню.
                                </p>
                                <p>
                                    Закажите доставку в самый отдалённый уголок и мы привезём ваш заказ
                                    без опозданий.
                                </p>
                                <p>
                                    Удобная и простая форма оформления заказов{' '}
                                    <a
                                        className="blue"
                                        href="https://vk.com/market-157878257"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        ВКонтакте
                                    </a>{' '}
                                    также экономит ваше время.
                                </p>
                                <p>Либо закажите по телефону:</p>
                                <p>
                                    <a href="tel:+79872126076">+7(987)212-60-76</a>;
                                </p>
                                <p>Нет времени ждать? Приезжайте и забирайте ваш заказ с Гагарина 91</p>
                                <p>
                                    Здесь вас всегда встретит дружелюбный персонал, ответит на все вопросы, а также
                                    с радостью поможет с выбором
                                </p>
                                <p>Добро пожаловать в мир качества роллов Sushi Xiao!</p>
                            </div>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default About
