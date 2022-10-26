import React from 'react'
import {Controller, useForm} from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'

const RegistrationForm = ({setActiveModal, onSubmit}) => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        control,
        getValues,
    } = useForm({mode: 'onChange'})

    return (
        <form className="login-forms" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="phone"
                control={control}
                render={({field}) => (
                    <PhoneInput
                        inputClass="phone-input"
                        country={'ru'}
                        placeholder="Номер телефона"
                        specialLabel={null}
                        value={getValues('phone')}
                        onChange={(phone) => field.onChange(phone)}
                    />
                )}
            />

            <input
                type="password"
                className="mt-4"
                placeholder="Придумайте пароль"
                {...register('password', {
                    required: 'введите пароль',
                })}
            />
            <input
                type="password"
                className="mt-4"
                placeholder="Повторите пароль"
                {...register('confirmPassword', {
                    required: 'введите пароль',
                })}
            />
            <button type="submit" className="btn-2 w-100 mt-4" disabled={!isValid}>
                Создать аккаунт
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
                У меня есть аккаунт
            </button>
        </form>
    )
}

export default RegistrationForm
