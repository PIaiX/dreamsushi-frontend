import React from 'react'
import Container from 'react-bootstrap/Container'
import {MetaTags} from 'react-meta-tags'

const Delivery = () => {
    return (
        <main>
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — Доставка и оплата заказов</title>
                <meta property="title" content={process.env.REACT_APP_SITE_NAME + ' — Доставка и оплата заказов'} />
                <meta
                    property="og:title"
                    content={process.env.REACT_APP_SITE_NAME + ' — Доставка и оплата заказов'}
                />
            </MetaTags>
            <Container className="delivery">
                <section className="mb-6">
                    <h1 className="mb-4 mb-sm-5">Доставка и оплата заказов</h1>
                    Принятие заказов ежедневно:
                    <br />
                    <ul>
                        <li>Понедельник – Четверг с 10:00 до 21:30</li>
                        <li>Пятница – Воскресенье с 10-00 до 23-30.</li>
                    </ul>
                    <br />
                    При доставке на расстояние менее 3 км:
                    <br />
                    <ul>
                        <li>Минимальный заказ 500 р.</li>
                        <li>Бесплатная доставка при заказе от 700 р.</li>
                        <li>При заказе менее 700 р. стоимость доставки составит 150 р.</li>
                        <li>Время доставки 60 – 90 минут.</li>
                    </ul>
                    <br />
                    При доставке на расстояние 3 – 5 км:
                    <br />
                    <ul>
                        <li>Минимальный заказ 700 р.</li>
                        <li>Бесплатная доставка при заказе от 1000 р.</li>
                        <li>При заказе менее 1000 р. стоимость доставки составит 150 р.</li>
                        <li>Время доставки 60 – 120 минут.</li>
                    </ul>
                    <br />
                    При доставке на расстояние 5 – 9 км:
                    <br />
                    <ul>
                        <li>Минимальный заказ 1000 р.</li>
                        <li>Бесплатная доставка при заказе от 1500 р.</li>
                        <li>При заказе менее 1500 р. стоимость доставки составит 200 р.</li>
                        <li>Время доставки 90 – 180 минут.</li>
                    </ul>
                    <br />
                    При доставке на расстояние более 9 км. время и стоимость доставки уточняйте у администратора
                    заведения по телефону +7(987)212-60-76
                </section>
                {/* <section className="mb-6">
                <h2 className="mb-4 mb-sm-5">Способы оплаты:</h2>

            </section> */}
            </Container>
        </main>
    )
}

export default Delivery
