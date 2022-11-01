import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'
import {IoClose} from 'react-icons/io5'
import RegistrationForm from '../forms/RegistrationForm'
import LoginForm from '../forms/LoginForm'
import PasswordRecoveryForm from '../forms/PasswordRecoveryForm'
import RecoveryCodeForm from '../forms/RecoveryCodeForm'
import NewPasswordForm from '../forms/NewPasswordForm'
import ActivateAccountForm from '../forms/ActivateAccountForm'
import {authRegister} from '../../services/auth'
import {useDispatch, useSelector} from 'react-redux'
import {setAlert} from '../../store/reducers/alertSlice'
import {login} from '../../store/reducers/authSlice'

const AuthActions = () => {
    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const [activeModal, setActiveModal] = useState(null)
    const [submittedData, setSubmittedData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const closeModal = () => {
        setActiveModal(null)
        setSubmittedData({})
    }

    const onSubmitRegistration = (data) => {
        authRegister(data)
            .then((res) => {
                if (res.status === 200) {
                    setActiveModal('activateAccount')
                    setSubmittedData(data)
                }
            })
            .catch((error) => console.log(error))
    }

    const onSubmitActivateAccount = (data) => {
        setSubmittedData(data)
        console.log('acc', data)

        dispatch(setAlert({variant: 'danger', message: 'Вы успешно активировали свой аккаунт'}))
    }

    const onSubmitLogin = (data) => {
        setSubmittedData(data)

        dispatch(login(data))
    }

    // step 1
    const onSubmitPasswordRecovery = (data) => {
        setActiveModal('recoveryCode')
        setSubmittedData(data)
    }

    // step 2
    const onSubmitRecoveryCode = (data) => {
        setActiveModal('newPassword')
        setSubmittedData(data)
    }

    // step 3
    const onSubmitNewPassword = (data) => {
        console.log('ddd', data)
    }

    useEffect(() => {
        isAuth && closeModal()
    }, [isAuth])

    return (
        <>
            <button
                type="button"
                onClick={() => (isAuth ? navigate('/account') : setActiveModal('login'))}
                className="d-none d-lg-flex align-items-center"
            >
                <FaUser className="light-gray fs-12 " />
                <span className="d-none d-xl-inline ms-2">Войти</span>
            </button>

            <Modal show={activeModal} onHide={closeModal}>
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
                        activeModal === 'newPassword') && <h2 className="text-center mb-0">Восстановление пароля</h2>}
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
                    {activeModal === 'login' && <LoginForm setActiveModal={setActiveModal} onSubmit={onSubmitLogin} />}

                    {activeModal === 'passwordRecovery' && (
                        <PasswordRecoveryForm setActiveModal={setActiveModal} onSubmit={onSubmitPasswordRecovery} />
                    )}
                    {activeModal === 'recoveryCode' && (
                        <RecoveryCodeForm
                            setActiveModal={setActiveModal}
                            onSubmit={onSubmitRecoveryCode}
                            phone={submittedData.phone ? submittedData.phone : null}
                        />
                    )}
                    {activeModal === 'newPassword' && (
                        <NewPasswordForm
                            setActiveModal={setActiveModal}
                            onSubmit={onSubmitNewPassword}
                            phone={submittedData.phone ? submittedData.phone : null}
                            recoveryKey={submittedData.key ? submittedData.key : null}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AuthActions
