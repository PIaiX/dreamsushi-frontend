import React, {useCallback, useEffect, useState} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import BtnCart from './utils/BtnCart'
import Sign from './utils/Sign'
import {BsFillRecordFill, BsHeartFill} from 'react-icons/bs'
import {IoClose, IoCloseOutline, IoMenuOutline, IoSearch} from 'react-icons/io5'
import MobileNav from './MobileNav'
import {useDispatch, useSelector} from 'react-redux'
import {authActivate, authPasswordRecovery, authRegister} from '../services/auth'
import {FaUser} from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'
import RegistrationForm from './forms/RegistrationForm'
import ActivateAccountForm from './forms/ActivateAccountForm'
import LoginForm from './forms/LoginForm'
import PasswordRecoveryForm from './forms/PasswordRecoveryForm'
import RecoveryCodeForm from './forms/RecoveryCodeForm'
import NewPasswordForm from './forms/NewPasswordForm'
import {apiResponseMessages} from '../config/api'
import {login} from '../services/RTK/auth'
import {dispatchAlert, dispatchApiErrorAlert} from '../helpers/alert'

const Header = () => {
    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const cart = useSelector((state) => state?.cart?.items)
    const favorite = useSelector((state) => state?.favorite)
    const [isShowBurgerMenu, setIsShowBurgerMenu] = useState(false)
    const [activeModal, setActiveModal] = useState(null)
    const [submittedData, setSubmittedData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const closeModal = useCallback(() => {
        setActiveModal(null)
        setSubmittedData({})
    }, [])

    const closeBurgerMenu = useCallback(() => setIsShowBurgerMenu(false), [])

    const onSubmitRegistration = useCallback((data) => {
        authRegister(data)
            .then(() => {
                setActiveModal('activateAccount')
                setSubmittedData(data)
            })
            .catch((error) => dispatchApiErrorAlert(error))
    }, [])

    const onSubmitActivateAccount = useCallback((data) => {
        authActivate(data)
            .then(() => {
                dispatchAlert('success', apiResponseMessages.REGISTRATION)
                setActiveModal('login')
            })
            .catch((error) => dispatchApiErrorAlert(error))
    }, [])

    const onSubmitLogin = useCallback((data) => {
        setSubmittedData(data)
        dispatch(login(data))
    }, [])

    const onSubmitPasswordRecovery = useCallback((data, nextStep) => {
        authPasswordRecovery(data)
            .then(() => {
                setActiveModal(nextStep)
                setSubmittedData(data)

                if (data.step === 3) dispatchAlert('success', apiResponseMessages.RECOVERY)
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    const onClickAccount = useCallback(() => {
        isAuth ? navigate('/account') : setActiveModal('login')
    }, [isAuth])

    useEffect(() => {
        isAuth && closeModal()
    }, [isAuth])

    return (
        <>
            <header>
                <Container className="h-100">
                    <button
                        type="button"
                        onClick={() => setIsShowBurgerMenu((prev) => !prev)}
                        className="d-block d-lg-none fs-20"
                    >
                        {isShowBurgerMenu ? <IoCloseOutline /> : <IoMenuOutline />}
                    </button>

                    <div className="fs-12 fw-7 main-color">
                        <Link to="/">DreamSushi</Link>
                    </div>

                    <nav className="d-none d-lg-block">
                        <ul>
                            <li>
                                <Link to="/delivery">Доставка и оплата</Link>
                            </li>
                            <li>
                                <Link to="/about">О нас</Link>
                            </li>
                        </ul>
                    </nav>

                    <a href="tel:+79061145814" className="d-none d-lg-flex align-items-center">
                        <BsFillRecordFill className="main-color fs-08" />
                        <span className="ms-2">+7 906 114-58-14</span>
                    </a>

                    <Link to="/search" className="fs-15">
                        <IoSearch />
                    </Link>

                    <button type="button" onClick={onClickAccount} className="d-none d-lg-flex align-items-center">
                        <FaUser className="light-gray fs-12 " />
                        <span className="d-none d-xl-inline ms-2">{isAuth ? 'Профиль' : 'Войти'}</span>
                    </button>

                    <Link to="/favorites" className="fav d-none d-lg-block">
                        <BsHeartFill />
                        {(favorite?.pagination?.allCount > 0 || favorite?.items?.length > 0) && (
                            <span>{favorite?.pagination?.allCount || favorite?.items?.length}</span>
                        )}
                    </Link>

                    <BtnCart link="/cart" className="d-none d-lg-flex" count={cart.length} />
                </Container>
            </header>

            <MobileNav onClickAccount={onClickAccount} />

            <Modal show={activeModal} onHide={closeModal} centered>
                <Modal.Header>
                    {activeModal === 'registration' && (
                        <h2 className="text-center mb-0">
                            Регистрация в <span className="main-color">DreamSushi</span>
                        </h2>
                    )}
                    {activeModal === 'activateAccount' && <h2 className="text-center mb-0">Активация аккаунта</h2>}
                    {activeModal === 'login' && (
                        <h2 className="text-center mb-0">
                            Вход в <span className="main-color">DreamSushi</span>
                        </h2>
                    )}
                    {(activeModal === 'passwordRecovery' ||
                        activeModal === 'recoveryCode' ||
                        activeModal === 'newPassword') && (
                        <h2 className="text-center mb-0">Восстановление пароля</h2>
                    )}
                    <button className="close" onClick={closeModal}>
                        <IoClose />
                    </button>
                </Modal.Header>
                <Modal.Body>
                    {activeModal === 'registration' && (
                        <RegistrationForm setActiveModal={setActiveModal} onSubmit={onSubmitRegistration} />
                    )}
                    {activeModal === 'activateAccount' && (
                        <ActivateAccountForm
                            setActiveModal={setActiveModal}
                            onSubmit={onSubmitActivateAccount}
                            login={submittedData.phone ? submittedData.phone : null}
                        />
                    )}
                    {activeModal === 'login' && (
                        <LoginForm setActiveModal={setActiveModal} onSubmit={onSubmitLogin} />
                    )}

                    {activeModal === 'passwordRecovery' && (
                        <PasswordRecoveryForm setActiveModal={setActiveModal} onSubmit={onSubmitPasswordRecovery} />
                    )}
                    {activeModal === 'recoveryCode' && (
                        <RecoveryCodeForm
                            setActiveModal={setActiveModal}
                            onSubmit={onSubmitPasswordRecovery}
                            phone={submittedData.phone ? submittedData.phone : null}
                        />
                    )}
                    {activeModal === 'newPassword' && (
                        <NewPasswordForm
                            setActiveModal={setActiveModal}
                            onSubmit={onSubmitPasswordRecovery}
                            phone={submittedData.phone ? submittedData.phone : null}
                            recoveryKey={submittedData.key ? submittedData.key : null}
                        />
                    )}
                </Modal.Body>
            </Modal>

            <Offcanvas show={isShowBurgerMenu} onHide={closeBurgerMenu}>
                <Offcanvas.Body>
                    <Container className="h-100 d-flex flex-column justify-content-between">
                        <div>
                            <nav className="mobile-menu-left">
                                <ul className="list-unstyled">
                                    {!isAuth && (
                                        <li>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveModal('login')
                                                    closeBurgerMenu()
                                                }}
                                            >
                                                Войти
                                            </button>
                                        </li>
                                    )}
                                    <li className="mt-3">
                                        <NavLink to="/favorites">Избранное</NavLink>
                                    </li>
                                    <li className="mt-3">
                                        <NavLink to="/delivery">Доставка и оплата</NavLink>
                                    </li>
                                    <li className="mt-3">
                                        <NavLink to="/about">О нас</NavLink>
                                    </li>
                                </ul>
                            </nav>
                            <ul className="list-unstyled f-11 mt-5">
                                <li>ул. Юлиуса Фучика, 88А</li>
                                <li className="mt-3">
                                    ул. Гагарина, 93 <span className="fs-09 light-gray">в вс до 22:00</span>
                                </li>
                            </ul>
                            <ul className="list-unstyled mt-5">
                                <li className="fs-11">
                                    <a href="tel:+79061145814" className="d-flex align-items-center">
                                        <BsFillRecordFill className="main-color fs-08" />
                                        <span className="ms-2">+7 906 114-58-14</span>
                                    </a>
                                </li>
                                <li className="fs-11 mt-3">
                                    <a href="tel:+79061145814" className="d-flex align-items-center">
                                        <BsFillRecordFill className="main-color fs-08" />
                                        <span className="ms-2">+7 906 114-58-14</span>
                                    </a>
                                </li>
                                <li className="light-gray fs-09 mt-3">с 10:00 до 22:30</li>
                            </ul>
                        </div>

                        <div className="mt-4 mt-sm-5">
                            <div className="light-gray fs-09">
                                <a href="/">Политика обработки персональных данных</a>
                            </div>
                            <Sign className="fs-09 mt-3" />
                        </div>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Header
