import React, {useEffect} from 'react'
import {Form} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import Button from '../UI/Button'

const NewPasswordForm = ({setActiveModal, onSubmit, phone, recoveryKey}) => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        setValue,
        getValues,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onSubmit',
        defaultValues: {
            step: 3,
        },
    })

    useEffect(() => {
        phone && setValue('phone', phone)
    }, [phone])

    useEffect(() => {
        recoveryKey && setValue('key', recoveryKey)
    }, [recoveryKey])

    return (
        <>
            <div className="text-center fs-09">Придумайте новый пароль</div>
            <Form className="login-forms" onSubmit={handleSubmit((data) => onSubmit(data, 'login'))}>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Новый пароль"
                        {...register('password', {
                            required: 'введите пароль',
                            minLength: {
                                value: 4,
                                message: 'минимальный пароль должен состоять из 4-ех символов',
                            },
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
                            validate: (value) => value === getValues('password') || 'пароли не совпадают',
                            minLength: {
                                value: 4,
                                message: 'минимальный пароль должен состоять из 4-ех символов',
                            },
                        })}
                    />
                    {errors.confirmPassword && (
                        <Form.Text className="text-danger">{errors?.confirmPassword?.message}</Form.Text>
                    )}
                </Form.Group>
                <Button type="submit" className="btn-2 w-100 mt-4" disabled={!isValid}>
                    Отправить
                </Button>
                <Button
                    type="button"
                    onClick={() => setActiveModal('login')}
                    className="mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto"
                >
                    Я вспомнил пароль
                </Button>
                <Button
                    type="button"
                    onClick={() => setActiveModal('registration')}
                    className="mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto"
                >
                    У меня нет аккаунта
                </Button>
            </Form>
        </>
    )
}

export default NewPasswordForm
