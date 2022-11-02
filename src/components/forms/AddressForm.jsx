import React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Form} from 'react-bootstrap'
import PhoneInput from 'react-phone-input-2'

const AddressForm = ({setActiveModal, onSubmit}) => {
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
                    rules={{
                        required: 'Заполните поле',
                        minLength: {
                            value: 11,
                            message: 'введите номер до конца',
                        },
                    }}
                />
                {errors.phone && <Form.Text className="text-danger">{errors.phone.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="mt-4">
                <Form.Control
                    type="password"
                    placeholder="Придумайте пароль"
                    {...register('password', {
                        required: 'введите пароль',
                    })}
                />
                {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="mt-4">
                <Form.Control
                    type="password"
                    placeholder="Повторите пароль"
                    {...register('confirmPassword', {
                        required: 'введите пароль',
                        validate: (value) => value === getValues('password') || 'пароли не совпадают',
                    })}
                />
                {errors.confirmPassword && (
                    <Form.Text className="text-danger">{errors.confirmPassword.message}</Form.Text>
                )}
            </Form.Group>
            <button type="submit" className="btn-2 w-100 mt-4" disabled={!isValid}>
                Создать аккаунт
            </button>
            <Form.Group className="mt-4">
                <Form.Label className="align-items-center">
                    <Form.Control type="checkbox" {...register('politicyAgreement', {required: true})} />
                    <span className="font-faded fs-08 ms-3">
                        Я согласен с{' '}
                        <a href="/" className="font-color">
                            политикой обработки персональных данных
                        </a>
                    </span>
                </Form.Label>
            </Form.Group>
            <button
                type="button"
                onClick={() => setActiveModal('login')}
                className="mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto"
            >
                У меня есть аккаунт
            </button>
        </Form>
    )
}

export default AddressForm
