import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import Story from '../components/Story';
import { BiChevronRight } from "react-icons/bi";
import ProductCard from '../components/ProductCard';
import ProductsMenu from '../components/ProductsMenu';

export default function Home() {
    return (
        <main>
            <Container>
                <Swiper
                    className='swiper-stories mb-6'
                    modules={[Navigation, FreeMode]}
                    spaceBetween={16}
                    slidesPerGroup={4}
                    slidesPerView={'auto'}
                    freeMode={true}
                    navigation
                    >
                    <SwiperSlide>
                        <Story imgLink={'imgs/products/set-rendezvous.jpg'} title={'Сет Рандеву'} label={'акция'} price={'1 100'}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Story imgLink={'imgs/products/Set-Monaco.jpg'} title={'Сет Монако'} label={'хит'} price={'1 100'}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Story imgLink={'imgs/products/Set-Prestige.jpg'} title={'Сет Престиж'} label={'новинка'} price={'1 100'}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Story imgLink={'imgs/products/Set-Velvet.jpg'} title={'Сет Вельвет'} label={'акция'} price={'1 100'}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Story imgLink={'imgs/products/set-rendezvous.jpg'} title={'Сет Рандеву'} label={'акция'} price={'1 100'}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Story imgLink={'imgs/products/Set-Monaco.jpg'} title={'Сет Монако'} label={'хит'} price={'1 100'}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Story imgLink={'imgs/products/Set-Prestige.jpg'} title={'Сет Престиж'} label={'новинка'} price={'1 100'}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Story imgLink={'imgs/products/Set-Velvet.jpg'} title={'Сет Вельвет'} label={'акция'} price={'1 100'}/>
                    </SwiperSlide>
                </Swiper>
            </Container>

            <Container className='px-mobile-0'>
                <section id='menu' className='mb-6'>
                    <h2 className='d-none d-md-block'>Меню</h2>
                    <ProductsMenu />
                </section>
            </Container>

            <Container>
                <section id="categorie-1" className='mb-6'>
                    <h3>Сеты</h3>
                    <Row xs={2} md={3} lg={4} className='gx-3 gx-sm-4 gy-5'>
                        <Col>
                            <ProductCard title={'Рандеву (Филадельфия, Будапешт, Дели)'} imgLink={'imgs/products/prod1.jpg'} price={'1100 '} oldPrice={'1300'} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'} imgLink={'imgs/products/prod2.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Сашими (6 шт)'} imgLink={'imgs/products/prod3.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'} imgLink={'imgs/products/prod4.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Суши Вельвет'} imgLink={'imgs/products/prod5.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Рандеву (Филадельфия, Будапешт, Дели)'} imgLink={'imgs/products/prod1.jpg'} price={'1100 '} oldPrice={'1300'} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'} imgLink={'imgs/products/prod2.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Сашими (6 шт)'} imgLink={'imgs/products/prod3.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                    </Row>
                </section>
                <section id="categorie-2" className='mb-6'>
                    <h3>Холодные роллы</h3>
                    <Row xs={2} md={3} lg={4} className='gx-4 gy-5'>
                        <Col>
                            <ProductCard title={'Рандеву (Филадельфия, Будапешт, Дели)'} imgLink={'imgs/products/prod1.jpg'} price={'1100 '} oldPrice={'1300'} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'} imgLink={'imgs/products/prod2.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Сашими (6 шт)'} imgLink={'imgs/products/prod3.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'} imgLink={'imgs/products/prod4.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Суши Вельвет'} imgLink={'imgs/products/prod5.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Рандеву (Филадельфия, Будапешт, Дели)'} imgLink={'imgs/products/prod1.jpg'} price={'1100 '} oldPrice={'1300'} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'} imgLink={'imgs/products/prod2.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Сашими (6 шт)'} imgLink={'imgs/products/prod3.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'} imgLink={'imgs/products/prod4.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Суши Вельвет'} imgLink={'imgs/products/prod5.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                    </Row>
                </section>
                <section id="categorie-3" className='mb-6'>
                    <h3>Запечённые роллы</h3>
                    <Row xs={2} md={3} lg={4} className='gx-4 gy-5'>
                        <Col>
                            <ProductCard title={'Рандеву (Филадельфия, Будапешт, Дели)'} imgLink={'imgs/products/prod1.jpg'} price={'1100 '} oldPrice={'1300'} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'} imgLink={'imgs/products/prod2.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Сашими (6 шт)'} imgLink={'imgs/products/prod3.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'} imgLink={'imgs/products/prod4.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Суши Вельвет'} imgLink={'imgs/products/prod5.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Рандеву (Филадельфия, Будапешт, Дели)'} imgLink={'imgs/products/prod1.jpg'} price={'1100 '} oldPrice={'1300'} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'} imgLink={'imgs/products/prod2.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Сашими (6 шт)'} imgLink={'imgs/products/prod3.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'} imgLink={'imgs/products/prod4.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Суши Вельвет'} imgLink={'imgs/products/prod5.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                    </Row>
                </section>
                <section id="categorie-4" className='mb-6'>
                    <h3>Горячие роллы</h3>
                    <Row xs={2} md={3} lg={4} className='gx-4 gy-5'>
                        <Col>
                            <ProductCard title={'Рандеву (Филадельфия, Будапешт, Дели)'} imgLink={'imgs/products/prod1.jpg'} price={'1100 '} oldPrice={'1300'} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'} imgLink={'imgs/products/prod2.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Сашими (6 шт)'} imgLink={'imgs/products/prod3.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'} imgLink={'imgs/products/prod4.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                    </Row>
                </section>
                <section id="categorie-5" className='mb-6'>
                    <h3>Пицца</h3>
                    <Row xs={2} md={3} lg={4} className='gx-4 gy-5'>
                        <Col>
                            <ProductCard title={'Рандеву (Филадельфия, Будапешт, Дели)'} imgLink={'imgs/products/prod1.jpg'} price={'1100 '} oldPrice={'1300'} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'} imgLink={'imgs/products/prod2.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Сашими (6 шт)'} imgLink={'imgs/products/prod3.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'} imgLink={'imgs/products/prod4.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                    </Row>
                </section>
                <section id="categorie-6" className='mb-6'>
                    <h3>Специальное предложение</h3>
                    <Row xs={2} md={3} lg={4} className='gx-4 gy-5'>
                        <Col>
                            <ProductCard title={'Рандеву (Филадельфия, Будапешт, Дели)'} imgLink={'imgs/products/prod1.jpg'} price={'1100 '} oldPrice={'1300'} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'} imgLink={'imgs/products/prod2.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Сашими (6 шт)'} imgLink={'imgs/products/prod3.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'} imgLink={'imgs/products/prod4.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                    </Row>
                </section>
                <section id="categorie-7" className='mb-6'>
                    <h3>Дополнительно</h3>
                    <Row xs={2} md={3} lg={4} className='gx-4 gy-5'>
                        <Col>
                            <ProductCard title={'Рандеву (Филадельфия, Будапешт, Дели)'} imgLink={'imgs/products/prod1.jpg'} price={'1100 '} oldPrice={'1300'} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Горячий сет (Нью-Йорк, Юта, Биг Чикен)'} imgLink={'imgs/products/prod2.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Сашими (6 шт)'} imgLink={'imgs/products/prod3.jpg'} price={'900'} oldPrice={''} weight={'1000'}/>
                        </Col>
                        <Col>
                            <ProductCard title={'Престиж (Филадельфия, Сакура, Острые маки с креветкой, Монреаль'} imgLink={'imgs/products/prod4.jpg'} price={'1100 '} oldPrice={''} weight={'1000'}/>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    );
}