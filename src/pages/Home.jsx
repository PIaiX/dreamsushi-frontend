import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductCard from '../components/ProductCard'
import ProductsMenu from '../components/ProductsMenu'
import StoriesSection from '../components/StoriesSection'

const Home = () => {
    return (
        <main>
            <Container>
                <StoriesSection />
            </Container>

            <Container className="px-mobile-0">
                <section className="mb-6">
                    <h1 className="d-none d-md-block">Меню</h1>
                    <ProductsMenu />
                </section>
            </Container>

            <Container>
                <section id="categorie-1" className="mb-6">
                    <h2>Сеты</h2>
                    <Row xs={2} md={3} lg={4} className="gx-3 gx-sm-4 gy-5">
                        <Col>
                            <ProductCard
                                title={'Рандеву (Филадельфия, Будапешт, Дели)'}
                                imgLink={'images/products/prod1.jpg'}
                                price={'1100 '}
                                oldPrice={'1300'}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'}
                                imgLink={'images/products/prod2.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Сашими (6 шт)'}
                                imgLink={'images/products/prod3.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'}
                                imgLink={'images/products/prod4.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Суши Вельвет'}
                                imgLink={'images/products/prod5.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Рандеву (Филадельфия, Будапешт, Дели)'}
                                imgLink={'images/products/prod1.jpg'}
                                price={'1100 '}
                                oldPrice={'1300'}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'}
                                imgLink={'images/products/prod2.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Сашими (6 шт)'}
                                imgLink={'images/products/prod3.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                    </Row>
                </section>
                <section id="categorie-2" className="mb-6">
                    <h2>Холодные роллы</h2>
                    <Row xs={2} md={3} lg={4} className="gx-4 gy-5">
                        <Col>
                            <ProductCard
                                title={'Рандеву (Филадельфия, Будапешт, Дели)'}
                                imgLink={'images/products/prod1.jpg'}
                                price={'1100 '}
                                oldPrice={'1300'}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'}
                                imgLink={'images/products/prod2.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Сашими (6 шт)'}
                                imgLink={'images/products/prod3.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'}
                                imgLink={'images/products/prod4.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Суши Вельвет'}
                                imgLink={'images/products/prod5.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Рандеву (Филадельфия, Будапешт, Дели)'}
                                imgLink={'images/products/prod1.jpg'}
                                price={'1100 '}
                                oldPrice={'1300'}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'}
                                imgLink={'images/products/prod2.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Сашими (6 шт)'}
                                imgLink={'images/products/prod3.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'}
                                imgLink={'images/products/prod4.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Суши Вельвет'}
                                imgLink={'images/products/prod5.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                    </Row>
                </section>
                <section id="categorie-3" className="mb-6">
                    <h2>Запечённые роллы</h2>
                    <Row xs={2} md={3} lg={4} className="gx-4 gy-5">
                        <Col>
                            <ProductCard
                                title={'Рандеву (Филадельфия, Будапешт, Дели)'}
                                imgLink={'images/products/prod1.jpg'}
                                price={'1100 '}
                                oldPrice={'1300'}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'}
                                imgLink={'images/products/prod2.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Сашими (6 шт)'}
                                imgLink={'images/products/prod3.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'}
                                imgLink={'images/products/prod4.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Суши Вельвет'}
                                imgLink={'images/products/prod5.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Рандеву (Филадельфия, Будапешт, Дели)'}
                                imgLink={'images/products/prod1.jpg'}
                                price={'1100 '}
                                oldPrice={'1300'}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'}
                                imgLink={'images/products/prod2.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Сашими (6 шт)'}
                                imgLink={'images/products/prod3.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'}
                                imgLink={'images/products/prod4.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Суши Вельвет'}
                                imgLink={'images/products/prod5.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                    </Row>
                </section>
                <section id="categorie-4" className="mb-6">
                    <h2>Горячие роллы</h2>
                    <Row xs={2} md={3} lg={4} className="gx-4 gy-5">
                        <Col>
                            <ProductCard
                                title={'Рандеву (Филадельфия, Будапешт, Дели)'}
                                imgLink={'images/products/prod1.jpg'}
                                price={'1100 '}
                                oldPrice={'1300'}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'}
                                imgLink={'images/products/prod2.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Сашими (6 шт)'}
                                imgLink={'images/products/prod3.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'}
                                imgLink={'images/products/prod4.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                    </Row>
                </section>
                <section id="categorie-5" className="mb-6">
                    <h2>Пицца</h2>
                    <Row xs={2} md={3} lg={4} className="gx-4 gy-5">
                        <Col>
                            <ProductCard
                                title={'Рандеву (Филадельфия, Будапешт, Дели)'}
                                imgLink={'images/products/prod1.jpg'}
                                price={'1100 '}
                                oldPrice={'1300'}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'}
                                imgLink={'images/products/prod2.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Сашими (6 шт)'}
                                imgLink={'images/products/prod3.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'}
                                imgLink={'images/products/prod4.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                    </Row>
                </section>
                <section id="categorie-6" className="mb-6">
                    <h2>Специальное предложение</h2>
                    <Row xs={2} md={3} lg={4} className="gx-4 gy-5">
                        <Col>
                            <ProductCard
                                title={'Рандеву (Филадельфия, Будапешт, Дели)'}
                                imgLink={'images/products/prod1.jpg'}
                                price={'1100 '}
                                oldPrice={'1300'}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'}
                                imgLink={'images/products/prod2.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Сашими (6 шт)'}
                                imgLink={'images/products/prod3.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'}
                                imgLink={'images/products/prod4.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                    </Row>
                </section>
                <section id="categorie-7" className="mb-6">
                    <h2>Дополнительно</h2>
                    <Row xs={2} md={3} lg={4} className="gx-4 gy-5">
                        <Col>
                            <ProductCard
                                title={'Рандеву (Филадельфия, Будапешт, Дели)'}
                                imgLink={'images/products/prod1.jpg'}
                                price={'1100 '}
                                oldPrice={'1300'}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'}
                                imgLink={'images/products/prod2.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Сашими (6 шт)'}
                                imgLink={'images/products/prod3.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                        <Col>
                            <ProductCard
                                title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'}
                                imgLink={'images/products/prod4.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                            />
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default Home
