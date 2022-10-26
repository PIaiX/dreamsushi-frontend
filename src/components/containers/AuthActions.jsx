import React, {useState} from 'react'
import {FaUser} from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'
import {IoClose} from 'react-icons/io5'
import RegistrationForm from '../forms/RegistrationForm'
import LoginForm from '../forms/LoginForm'
import PasswordRecoveryForm from '../forms/PasswordRecoveryForm'

const AuthActions = () => {
    const [activeModal, setActiveModal] = useState(null)

    const closeModal = () => setActiveModal(null)

    const onSubmitRegistration = (data) => {
        console.log(data)
    }
    const onSubmitLogin = (data) => {
        console.log(data)
    }
    const onSubmitPasswordRecovery = (data) => {
        console.log(data)
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setActiveModal('registration')}
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
                    {activeModal === 'login' && (
                        <h2 className="text-center mb-0">
                            Вход в <span className="main-color">DreamSushi</span>
                        </h2>
                    )}
                    {activeModal === 'passwordRecovery' && <h2 className="text-center mb-0">Восстановление пароля</h2>}
                    <button className="close" onClick={closeModal}>
                        <IoClose />
                    </button>
                </Modal.Header>
                <Modal.Body>
                    {activeModal === 'registration' && (
                        <RegistrationForm setActiveModal={setActiveModal} onSubmit={onSubmitRegistration} />
                    )}
                    {activeModal === 'login' && <LoginForm setActiveModal={setActiveModal} onSubmit={onSubmitLogin} />}
                    {activeModal === 'passwordRecovery' && (
                        <PasswordRecoveryForm setActiveModal={setActiveModal} onSubmit={onSubmitPasswordRecovery} />
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AuthActions
