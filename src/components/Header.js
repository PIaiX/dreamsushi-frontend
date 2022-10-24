import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Modal from 'react-bootstrap/Modal'
import BtnCart from './utils/BtnCart'
import Sign from './utils/Sign'
import { BsHeartFill, BsFillRecordFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { IoSearch, IoMenuOutline, IoCloseOutline, IoClose } from "react-icons/io5"

export default function Header() {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => {
        setShowSearch(false)
        setShowLogin(false)
        setShowPassword(false)
        setShowRegistration(false)
        setShow(true)
    }

    const [showSearch, setShowSearch] = useState(false)
    const handleCloseSearch = () => setShowSearch(false)
    const handleShowSearch = () => {
        setShow(false)
        setShowLogin(false)
        setShowPassword(false)
        setShowRegistration(false)
        setShowSearch(true)
    }

    const [showRegistration, setShowRegistration] = useState(false)
    const handleCloseReg = () => setShowRegistration(false)
    const handleShowReg = () => {
        setShow(false)
        setShowSearch(false)
        setShowLogin(false)
        setShowPassword(false)
        setShowRegistration(true)
    }

    const [showLogin, setShowLogin] = useState(false)
    const handleCloseLogin = () => setShowLogin(false)
    const handleShowLogin = () => {
        setShow(false)
        setShowSearch(false)
        setShowRegistration(false)
        setShowPassword(false)
        setShowLogin(true)
    }

    const [showPassword, setShowPassword] = useState(false)
    const handleClosePassword = () => setShowPassword(false)
    const handleShowPassword = () => {
        setShow(false)
        setShowSearch(false)
        setShowLogin(false)
        setShowRegistration(false)
        setShowPassword(true)
    }

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
                            <li><Link to='/delivery'>Доставка и оплата</Link></li>
                            <li><Link to='/about'>О нас</Link></li>
                        </ul>
                    </nav>

                    <a href='tel:+79061145814' className='d-none d-lg-flex align-items-center'>
                        <BsFillRecordFill className='main-color fs-08'/>
                        <span className='ms-2'>+7 906 114-58-14</span>
                    </a>

                    <button type='button' className='fs-15' onClick={(showSearch) ? handleCloseSearch : handleShowSearch}>
                        <IoSearch/>
                    </button>

                    <button type='button' onClick={handleShowReg} className='d-none d-lg-flex align-items-center'>
                        <FaUser className='light-gray fs-12 '/>
                        <span className='d-none d-xl-inline ms-2'>Войти</span>
                    </button>

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
                                        <button type='button' onClick={handleShowReg}>Войти</button>
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

            <Modal show={showRegistration} onHide={handleCloseReg}>
                <Modal.Header>
                    <h2 className='text-center mb-0'>Регистрация в <span className='main-color'>DreamSushi</span></h2>
                    <button className='close' onClick={handleCloseReg}>
                        <IoClose/>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <form className='login-forms'>
                        <input type='tel' placeholder='Номер телефона'/>
                        <input type='password' className='mt-4' placeholder='Придумайте пароль'/>
                        <input type='password' className='mt-4' placeholder='Повторите пароль'/>
                        <button type='submit' disabled className='btn-2 w-100 mt-4'>Создать аккаунт</button>
                        <label className='align-items-center mt-4'>
                            <input type='checkbox' />
                            <span className='font-faded fs-08 ms-3'>Я согласен с <a href='/' className='font-color'>политикой обработки персональных данных</a></span>
                        </label>
                        <button type='button' onClick={handleShowLogin} className='mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto'>У меня есть аккаунт</button>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header>
                    <h2 className='text-center mb-0'>Вход в <span className='main-color'>DreamSushi</span></h2>
                    <button className='close' onClick={handleCloseLogin}>
                        <IoClose/>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <form className='login-forms'>
                        <input type='tel' placeholder='Номер телефона'/>
                        <input type='password' className='mt-4' placeholder='Пароль'/>
                        <Link to='/personal-account' className='btn-2 w-100 mt-4'>Войти</Link>
                        <label className='align-items-center mt-4'>
                            <input type='checkbox' />
                            <span className='font-faded fs-08 ms-3'>Я согласен с <a href='/' className='font-color'>политикой обработки персональных данных</a></span>
                        </label>
                        <button type='button' onClick={handleShowPassword} className='mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto'>Я забыл пароль</button>
                        <button type='button' onClick={handleShowReg} className='mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto'>У меня нет аккаунта</button>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={showPassword} onHide={handleClosePassword}>
                <Modal.Header>
                    <h2 className='text-center mb-0'>Восстановление пароля</h2>
                    <button className='close' onClick={handleClosePassword}>
                        <IoClose/>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center fs-09'>Введите номер телефона, мы вышлем на него код для сброса пароля</div>
                    <form className='login-forms'>
                        <input type='tel' placeholder='Номер телефона'/>
                        <button type='submit' disabled className='btn-2 w-100 mt-4'>Выслать код</button>
                        <label className='align-items-center mt-4'>
                            <input type='checkbox' />
                            <span className='font-faded fs-08 ms-3'>Я согласен с <a href='/' className='font-color'>политикой обработки персональных данных</a></span>
                        </label>
                        <button type='button' onClick={handleShowLogin} className='mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto'>Я вспомнил пароль</button>
                        <button type='button' onClick={handleShowReg} className='mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto'>У меня нет аккаунта</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}