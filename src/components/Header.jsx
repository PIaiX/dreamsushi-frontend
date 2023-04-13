import React, {useCallback, useEffect, useState} from 'react'
import {Badge} from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Offcanvas from 'react-bootstrap/Offcanvas'
import {RxAvatar, RxMagnifyingGlass} from 'react-icons/rx'
import {SlLocationPin, SlScreenSmartphone} from 'react-icons/sl'
import {IoClose, IoCloseOutline, IoMenuOutline, IoHeartOutline} from 'react-icons/io5'
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
import Sign from './utils/Sign'
import {setLoginError} from '../store/reducers/authSlice'
import {HiShoppingCart} from 'react-icons/hi2'

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
        console.log(data)
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

                    {isMobile?.mobile === false && (
                        <ul className="list-unstyled d-flex align-items-center">
                            <li>
                                <Link to="/" className="fs-12 fw-7 main-color">
                                    <img src="/logo.png" alt="Sushi Xiao" className="logo" />
                                </Link>
                            </li>
                            <li className="ms-4">
                                <address>
                                    <SlLocationPin className="fs-14 main-color me-2" />
                                    <span>ул. Гагарина, 91</span>
                                </address>
                            </li>
                            <li className="ms-4">
                                <a href="tel:+79872126076" className="d-flex align-items-center">
                                    <SlScreenSmartphone className="main-color fs-14" />
                                    <span className="ms-2">+7(987)212-60-76</span>
                                </a>
                            </li>
                        </ul>
                    )}

                    <nav className="d-none d-lg-block">
                        <ul>
                            <li>
                                <NavLink to="/delivery">Доставка и оплата</NavLink>
                            </li>
                            <li>
                                <NavLink to="/sales">Акции</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contacts">Контакты</NavLink>
                            </li>
                        </ul>
                    </nav>

                    <ul className="list-unstyled d-flex align-items-center">
                        <li>
                            <Link to="/search" className="fs-20 d-flex main-color">
                                <RxMagnifyingGlass />
                            </Link>
                        </li>
                        {isMobile?.mobile ? (
                            <>
                                <li className="ms-4">
                                    <a href="tel:+79872126076" className="d-flex align-items-center">
                                        <SlScreenSmartphone className="main-color fs-17" />
                                        <span className="d-none d-sm-inline ms-2">+7(987)212-60-76</span>
                                    </a>
                                </li>
                                <li className="ms-4">
                                    <Link to="/" className="fs-12 fw-7 main-color">
                                        <img src="/logo.png" alt="Sushi Xiao" className="logo" />
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="ms-4">
                                    <Button
                                        type="button"
                                        onClick={onClickAccount}
                                        className="d-flex align-items-center"
                                    >
                                        <RxAvatar className="main-color fs-20 " />
                                        {auth?.user?.notificationCount > 0 && (
                                            <Badge pill className="ms-2" bg="danger">
                                                {auth.user.notificationCount}
                                            </Badge>
                                        )}
                                    </Button>
                                </li>
                                <li className="ms-4">
                                    <Link to="/favorites" className="fav">
                                        <IoHeartOutline />
                                        {(favorite?.pagination?.allCount > 0 || favorite?.items?.length > 0) && (
                                            <span>{favorite?.pagination?.allCount || favorite?.items?.length}</span>
                                        )}
                                    </Link>
                                </li>
                                <li className="ms-4">
                                    <Link to="/cart">
                                        <HiShoppingCart className="main-color fs-20 " />
                                        {cart?.length > 0 && <span className="cart-count">{cart.length}</span>}
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </Container>
            </header>

            <MobileNav onClickAccount={onClickAccount} />

            <Modal show={activeModal} onHide={closeModal} centered>
                <Modal.Header>
                    {activeModal === 'registration' && (
                        <h2 className="text-center mb-0">
                            Регистрация в <span className="main-color">Sushi Xiao</span>
                        </h2>
                    )}
                    {activeModal === 'activateAccount' && <h2 className="text-center mb-0">Активация аккаунта</h2>}
                    {(activeModal === 'login' || !activeModal) && (
                        <h2 className="text-center mb-0">
                            Вход в <span className="main-color">Sushi Xiao</span>
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
                            login={submittedData.email || submittedData.login || null}
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
                                        <NavLink to="/sales" onClick={() => closeBurgerMenu()}>
                                            Акции
                                        </NavLink>
                                    </li>
                                    <li className="mt-3">
                                        <NavLink to="/about" onClick={() => closeBurgerMenu()}>
                                            О нас
                                        </NavLink>
                                    </li>
                                    <li className="mt-3">
                                        <NavLink to="/delivery" onClick={() => closeBurgerMenu()}>
                                            Доставка и оплата
                                        </NavLink>
                                    </li>
                                    <li className="mt-3">
                                        <NavLink to="/contacts" onClick={() => closeBurgerMenu()}>
                                            Контакты
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                            <ul className="list-unstyled f-11 mt-5">
                                <li>
                                    <address>ул. Гагарина, 91</address>
                                </li>
                                <li className="mt-3">
                                    <a href="tel:+79872126076">+7(987)212-60-76</a>
                                </li>
                                <li className="light-gray fs-09 mt-3">с 10:00 до 22:00</li>
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
