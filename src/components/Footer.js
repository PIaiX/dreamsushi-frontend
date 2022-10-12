import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsFillRecordFill } from "react-icons/bs";
import Sign from './utils/Sign';
import { MdHomeFilled, MdLocalDining, MdMenuBook } from "react-icons/md";
import { HiUserCircle, HiShoppingCart } from "react-icons/hi";

export default function Footer() {
    return (
        <footer>
            <Container className='h-100 d-lg-flex align-items-center'>
                <Row md={5} className='w-100 d-none d-lg-flex'>
                    <Col>
                        <div className='main-color fs-12'>DreamSushi</div>
                        <Sign className='fs-08 mt-3' />
                    </Col>
                    <Col>
                        <nav>
                            <ul className='list-unstyled'>
                                <li>Доставка и оплата</li>
                                <li className='mt-3'>О нас</li>
                                <li className='mt-4 light-gray fs-08'>Политика обработки персональных данных</li>
                            </ul>
                        </nav>
                    </Col>
                    <Col>
                        <ul className='list-unstyled'>
                            <li>
                                <a href='tel:+79061145814' className='d-flex align-items-center'>
                                    <BsFillRecordFill className='main-color fs-08'/>
                                    <span className='ms-2'>+7 906 114-58-14</span>
                                </a>
                            </li>
                            <li className='mt-3'>
                                <a href='tel:+79061145814' className='d-flex align-items-center'>
                                    <BsFillRecordFill className='main-color fs-08'/>
                                    <span className='ms-2'>+7 906 114-58-14</span>
                                </a>
                            </li>
                            <li className='light-gray fs-09 mt-3'>с 10:00 до 22:30</li>
                        </ul>
                    </Col>
                    <Col>
                        <ul className='list-unstyled'>
                            <li>ул. Юлиуса Фучика, 88А</li>
                            <li className='mt-3'>ул. Гагарина, 93 <span className='fs-08 light-gray'>в вс до 22:00</span></li>
                        </ul>
                    </Col>
                    <Col>
                        <a href='/' className='d-flex align-items-center justify-content-end'>
                            <img src='imgs/icons/vk.svg' alt='Мы во Вконтакте'/>
                            <div className='ms-2'>
                                <div className='fw-5'>Мы во Вконтакте</div>
                                <div className='light-gray fs-08'>+&nbsp;<span className='fw-6 font-color'>9 000</span> участников</div>
                            </div>
                        </a>
                        <div className='text-end mt-4'>
                            <a href='/' className='dev'>Создано в <span className='color'>PlaiX</span></a>
                        </div>
                    </Col>
                </Row>
                <nav className='mobile'>
                    <ul className='list-unstyled'>
                        <li>
                            <a href='/' className='active'>
                                <MdHomeFilled/>
                            </a>
                        </li>
                        <li>
                            <a href='/'>
                                <MdLocalDining/>
                            </a>
                        </li>
                        <li>
                            <a href='/'>
                                <HiShoppingCart/>
                            </a>
                        </li>
                        <li>
                            <a href='/'>
                                <MdMenuBook/>
                            </a>
                        </li>
                        <li>
                            <a href='/'>
                                <HiUserCircle/>
                            </a>
                        </li>
                    </ul>
                </nav>
            </Container>
        </footer>
    );
}