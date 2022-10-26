import React from 'react'
import {Link} from 'react-router-dom'

const LoginForm = ({setActiveModal, onSubmit}) => {
    return (
        <form className="login-forms">
            <input type="tel" placeholder="Номер телефона" />
            <input type="password" className="mt-4" placeholder="Пароль" />
            <Link to="/personal-account" className="btn-2 w-100 mt-4">
                Войти
            </Link>
            <label className="align-items-center mt-4">
                <input type="checkbox" />
                <span className="font-faded fs-08 ms-3">
                    Я согласен с{' '}
                    <a href="/" className="font-color">
                        политикой обработки персональных данных
                    </a>
                </span>
            </label>
            <button
                type="button"
                onClick={() => setActiveModal('passwordRecovery')}
                className="mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto"
            >
                Я забыл пароль
            </button>
            <button
                type="button"
                onClick={() => setActiveModal('registration')}
                className="mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto"
            >
                У меня нет аккаунта
            </button>
        </form>
    )
}

export default LoginForm
