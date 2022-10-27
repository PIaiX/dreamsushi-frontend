import React, {useEffect} from 'react'
import {Form} from 'react-bootstrap'
import {useForm} from 'react-hook-form'

const NewPasswordForm = ({setActiveModal, onSubmit, phone, recoveryKey}) => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        setValue,
    } = useForm({mode: 'onChange', reValidateMode: 'onSubmit'})

    useEffect(() => {
        phone && setValue('phone', phone)
    }, [phone])

    useEffect(() => {
        recoveryKey && setValue('key', recoveryKey)
    }, [recoveryKey])

    return (
        <>
            <div className="text-center fs-09">Придумайте новый пароль</div>
            <Form className="login-forms" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Новый пароль"
                        {...register('password', {
                            required: 'введите пароль',
                        })}
                    />
                    {errors.password && <Form.Text className="text-danger">{errors?.password?.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="mt-4">
                    <Form.Control
                        type="password"
                        placeholder="Новый пароль"
                        {...register('confirmPassword', {
                            required: 'введите пароль',
                        })}
                    />
                    {errors.confirmPassword && (
                        <Form.Text className="text-danger">{errors?.confirmPassword?.message}</Form.Text>
                    )}
                </Form.Group>
                <button type="submit" className="btn-2 w-100 mt-4" disabled={!isValid}>
                    Отправить
                </button>
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
            </Form>
        </>
    )
}

export default NewPasswordForm
