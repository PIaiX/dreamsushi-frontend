import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import BtnCart from './utils/BtnCart'
import Sign from './utils/Sign'
import { BsHeartFill, BsFillRecordFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { IoSearch, IoMenuOutline, IoCloseOutline, IoClose } from "react-icons/io5"

export default function Header() {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showSearch, setShowSearch] = useState(false)
    const handleCloseSearch = () => setShowSearch(false)
    const handleShowSearch = () => setShowSearch(true)

    return (
        <>
            <header>
                <Container className='h-100'>
                    <button type='button' onClick={(show) ? handleClose : handleShow} className='d-block d-lg-none fs-20'>
                        {
                            (show)
                            ? <IoCloseOutline/>
                            : <IoMenuOutline/>
                        }
                    </button>

                    <div className='fs-12 fw-7 main-color'>
                        <Link to='/'>DreamSushi</Link>
                    </div>

                    <nav className='d-none d-lg-block'>
                        <ul>
                            <li>Доставка и оплата</li>
                            <li>О нас</li>
                        </ul>
                    </nav>

                    <a href='tel:+79061145814' className='d-none d-lg-flex align-items-center'>
                        <BsFillRecordFill className='main-color fs-08'/>
                        <span className='ms-2'>+7 906 114-58-14</span>
                    </a>

                    <button type='button' className='fs-15' onClick={(showSearch) ? handleCloseSearch : handleShowSearch}>
                        <IoSearch/>
                    </button>

                    <a href='/' className='d-none d-lg-flex align-items-center'>
                        <FaUser className='light-gray fs-12 '/>
                        <span className='d-none d-xl-inline ms-2'>Войти</span>
                    </a>

                    <Link to='/favorites' className='fav d-none d-lg-block'>
                        <BsHeartFill/>
                        <span>2</span>
                    </Link>

                    <BtnCart link='/cart' className='d-none d-lg-flex' count={'6'} />
                </Container>
            </header>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Body>
                    <Container className='h-100 d-flex flex-column justify-content-between'>
                        <div>
                            <nav className='mobile-menu-left'>
                                <ul className='list-unstyled'>
                                    <li>
                                        <NavLink to='/login'>Войти</NavLink>
                                    </li>
                                    <li className='mt-3'>
                                        <NavLink to='/favorites'>Избранное</NavLink>
                                    </li>
                                    <li className='mt-3'>
                                        <NavLink to='/delivery'>Доставка и оплата</NavLink>
                                    </li>
                                    <li className='mt-3'>
                                        <NavLink to='/about'>О нас</NavLink>
                                    </li>
                                </ul>
                            </nav>
                            <ul className='list-unstyled f-11 mt-5'>
                                <li>ул. Юлиуса Фучика, 88А</li>
                                <li className='mt-3'>ул. Гагарина, 93 <span className='fs-09 light-gray'>в вс до 22:00</span></li>
                            </ul>
                            <ul className='list-unstyled mt-5'>
                                <li className='fs-11'>
                                    <a href='tel:+79061145814' className='d-flex align-items-center'>
                                        <BsFillRecordFill className='main-color fs-08'/>
                                        <span className='ms-2'>+7 906 114-58-14</span>
                                    </a>
                                </li>
                                <li className='fs-11 mt-3'>
                                    <a href='tel:+79061145814' className='d-flex align-items-center'>
                                        <BsFillRecordFill className='main-color fs-08'/>
                                        <span className='ms-2'>+7 906 114-58-14</span>
                                    </a>
                                </li>
                                <li className='light-gray fs-09 mt-3'>с 10:00 до 22:30</li>
                            </ul>
                        </div>

                        <div className='mt-4 mt-sm-5'>
                            <div className='light-gray fs-09'>
                                <a href='/'>Политика обработки персональных данных</a>
                            </div>
                            <Sign className='fs-09 mt-3' />
                        </div>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas show={showSearch} placement={'top'} onHide={handleCloseSearch}>
                <Offcanvas.Body>
                    <Container>
                        <form className='form-search'>
                            <input type='search' placeholder='Поиск...'/>
                            <button type='sumbit' className='fs-15 ms-2 ms-sm-3 ms-md-4'>
                                <IoSearch/>
                            </button>
                            <button type='reset' className='fs-17 ms-3 ms-sm-4 ms-md-5' onClick={handleCloseSearch}>
                                <IoClose/>
                            </button>
                        </form>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}