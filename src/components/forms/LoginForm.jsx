import React from 'react'
import {Link} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'

const LoginForm = ({setActiveModal, onSubmit}) => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        control,
        getValues,
    } = useForm({mode: 'onChange', reValidateMode: 'onSubmit'})

    return (
        <Form className="login-forms" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Controller
                    name="login"
                    control={control}
                    render={({field}) => (
                        <PhoneInput
                            inputClass="phone-input"
                            country={'ru'}
                            placeholder="Номер телефона"
                            specialLabel={null}
                            value={getValues('login')}
                            onChange={(phone) => field.onChange(phone)}
                        />
                    )}
                    rules={{
                        required: 'Заполните поле',
                        minLength: {
                            value: 11,
                            message: 'введите номер до конца',
                        },
                    }}
                />
                {errors.login && <Form.Text className="text-danger">{errors.login.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="mt-4">
                <Form.Control
                    type="password"
                    placeholder="Пароль"
                    {...register('password', {required: 'введите пароль'})}
                />
                {errors.password && <Form.Text className="text-danger">{errors?.password?.message}</Form.Text>}
            </Form.Group>
            <button type="submit" className="btn-2 w-100 mt-4" disabled={!isValid}>
                Войти
            </button>
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
        </Form>
    )
}

export default LoginForm
