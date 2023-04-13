import React from 'react'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom'
import {SlLocationPin, SlScreenSmartphone, SlClock} from 'react-icons/sl'
import {FaTelegramPlane, FaVk} from 'react-icons/fa'
import Sign from './utils/Sign'

const Footer = () => {
    return (
        <footer>
            <Container className="h-100 d-lg-flex align-items-center">
                <ul md={4} className="list-unstyled w-100 d-flex justify-content-between">
                    <li>
                        <div className="main-color fs-12">
                            <Link to="/">Sushi Xiao</Link>
                        </div>
                        <Sign className="fs-08 mt-3" />
                        <Link to={'/privacy'} className="mt-3 light-gray fs-08">
                            Политика конфиденциальности
                        </Link>
                    </li>
                    <li>
                        <nav>
                            <ul className="list-unstyled">
                                <li>
                                    <Link to="/delivery">Доставка и оплата</Link>
                                </li>
                                <li className="mt-3">
                                    <Link to="/about">О нас</Link>
                                </li>
                                <li className="mt-3">
                                    <Link to="/sales">Акции</Link>
                                </li>
                                <li className="mt-3">
                                    <Link to="/contacts">Контакты</Link>
                                </li>
                            </ul>
                        </nav>
                    </li>
                    <li>
                        <ul className="list-unstyled">
                            <li>
                                <address>
                                    <SlLocationPin className="fs-14 main-color me-2" />
                                    <span>ул. Гагарина, 91</span>
                                </address>
                            </li>
                            <li className="mt-3">
                                <a href="tel:+79872126076" className="d-flex align-items-center">
                                    <SlScreenSmartphone className="main-color fs-14" />
                                    <span className="ms-2">+7(987)212-60-76</span>
                                </a>
                            </li>
                            <li className="mt-3">
                                <SlClock className="main-color fs-13" />
                                <span className="ms-2">с 10:00 до 22:00</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul className="list-unstyled d-flex align-items-center justify-content-end mb-4">
                            <li className="ms-4">
                                <a className="vk" target="_blank" rel="noreferrer" href="https://vk.com/xiao_sushi">
                                    <FaVk />
                                </a>
                            </li>
                            <li className="ms-4">
                                <a className="telegram" target="_blank" rel="noreferrer" href="https://t.me/kafeSAO">
                                    <FaTelegramPlane />
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </Container>
        </footer>
    )
}

export default Footer
