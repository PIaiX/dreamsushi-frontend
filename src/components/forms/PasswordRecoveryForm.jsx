import React from 'react'

const PasswordRecoveryForm = ({setActiveModal, onSubmit}) => {
    return (
        <>
            <div className="text-center fs-09">Введите номер телефона, мы вышлем на него код для сброса пароля</div>
            <form className="login-forms">
                <input type="tel" placeholder="Номер телефона" />
                <button type="submit" disabled className="btn-2 w-100 mt-4">
                    Выслать код
                </button>
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
                    onClick={() => setActiveModal('login')}
                    className="mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto"
                >
                    Я вспомнил пароль
                </button>
                <button
                    type="button"
                    onClick={() => setActiveModal('registration')}
                    className="mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto"
                >
                    У меня нет аккаунта
                </button>
            </form>
        </>
    )
}

export default PasswordRecoveryForm
