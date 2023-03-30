import React, {useCallback, useEffect, useState} from 'react'
import {Badge} from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Offcanvas from 'react-bootstrap/Offcanvas'
import {BsFillRecordFill, BsHeartFill} from 'react-icons/bs'
import {FaUser} from 'react-icons/fa'
import {IoClose, IoCloseOutline, IoMenuOutline, IoSearch} from 'react-icons/io5'
import {useDispatch, useSelector} from 'react-redux'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {apiResponseMessages} from '../config/api'
import {dispatchAlert, dispatchApiErrorAlert} from '../helpers/alert'
import useIsMobile from '../hooks/isMobile'
import {authActivate, authPasswordRecovery, authRegister} from '../services/auth'
import {login} from '../services/RTK/auth'
import ActivateAccountForm from './forms/ActivateAccountForm'
import LoginForm from './forms/LoginForm'
import NewPasswordForm from './forms/NewPasswordForm'
import PasswordRecoveryForm from './forms/PasswordRecoveryForm'
import RecoveryCodeForm from './forms/RecoveryCodeForm'
import RegistrationForm from './forms/RegistrationForm'
import MobileNav from './MobileNav'
import Button from './UI/Button'
import BtnCart from './utils/BtnCart'
import Sign from './utils/Sign'
import {setLoginError} from '../store/reducers/authSlice'

const Header = () => {
    const isMobile = useIsMobile()
    const auth = useSelector((state) => state?.auth)
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
        auth.isAuth ? navigate('/account') : setActiveModal('login')
    }, [auth.isAuth])

    useEffect(() => {
        auth.isAuth && closeModal()
    }, [auth.isAuth])

    useEffect(() => {
        if (activeModal === null) dispatch(setLoginError(null))
    }, [activeModal])

    useEffect(() => {
        const loginError = auth?.loginError

        if (loginError?.response?.data?.message?.type == 'USER_NOT_ACTIVATED') {
            setActiveModal('activateAccount')
        }
    }, [auth?.loginError])

    return (
        <>
            <header>
                <Container className="h-100">
                    <Button
                        type="button"
                        onClick={() => setIsShowBurgerMenu((prev) => !prev)}
                        className="d-block d-lg-none fs-20"
                    >
                        {isShowBurgerMenu ? <IoCloseOutline /> : <IoMenuOutline />}
                    </Button>

                    <div className="fs-12 fw-7 main-color">
                        <Link to="/">
                            <img src="/logo.png" alt="Dream Sushi" height={isMobile?.mobile ? 40 : 55} />
                        </Link>
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

                    <Button type="button" onClick={onClickAccount} className="d-none d-lg-flex align-items-center">
                        <FaUser className="light-gray fs-12 " />
                        <span className="d-none d-xl-inline ms-2">{auth.isAuth ? 'Профиль' : 'Войти'}</span>
                        {auth?.user?.notificationCount > 0 && (
                            <Badge pill className="ms-2" bg="danger">
                                {auth.user.notificationCount}
                            </Badge>
                        )}
                    </Button>

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
                    {(activeModal === 'login' || !activeModal) && (
                        <h2 className="text-center mb-0">
                            Вход в <span className="main-color">Dream Sushi</span>
                        </h2>
                    )}
                    {(activeModal === 'passwordRecovery' ||
                        activeModal === 'recoveryCode' ||
                        activeModal === 'newPassword') && (
                        <h2 className="text-center mb-0">Восстановление пароля</h2>
                    )}
                    <Button className="close" onClick={closeModal}>
                        <IoClose />
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    {activeModal === 'registration' && (
                        <RegistrationForm setActiveModal={setActiveModal} onSubmit={onSubmitRegistration} />
                    )}
                    {activeModal === 'activateAccount' && (
                        <ActivateAccountForm
                            setActiveModal={setActiveModal}
                            onSubmit={onSubmitActivateAccount}
                            phone={submittedData.phone || null}
                        />
                    )}
                    {(activeModal === 'login' || !activeModal) && (
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
                                    {!auth.isAuth && (
                                        <li>
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    setActiveModal('login')
                                                    closeBurgerMenu()
                                                }}
                                            >
                                                Войти
                                            </Button>
                                        </li>
                                    )}
                                    <li className="mt-3">
                                        <NavLink to="/favorites" onClick={() => closeBurgerMenu()}>
                                            Избранное
                                        </NavLink>
                                    </li>
                                    <li className="mt-3">
                                        <NavLink to="/delivery" onClick={() => closeBurgerMenu()}>
                                            Доставка и оплата
                                        </NavLink>
                                    </li>
                                    <li className="mt-3">
                                        <NavLink to="/about" onClick={() => closeBurgerMenu()}>
                                            О нас
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                            <ul className="list-unstyled f-11 mt-5">
                                <li>ул. Юлиуса Фучика, 88А</li>
                                <li className="mt-3">ул. Гагарина, 93</li>
                            </ul>
                            <ul className="list-unstyled mt-5">
                                <li className="fs-11">
                                    <a href="tel:+79061145814" className="d-flex align-items-center">
                                        <BsFillRecordFill className="main-color fs-08" />
                                        <span className="ms-2">+7 906 114-58-14</span>
                                    </a>
                                </li>
                                <li className="fs-11 mt-3">
                                    <a href="tel:+79662406727" className="d-flex align-items-center">
                                        <BsFillRecordFill className="main-color fs-08" />
                                        <span className="ms-2">+7 966 240-67-27</span>
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
