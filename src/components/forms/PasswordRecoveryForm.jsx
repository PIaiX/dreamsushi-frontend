import React from 'react'
import {Form} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'

const PasswordRecoveryForm = ({setActiveModal, onSubmit}) => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        control,
        getValues,
    } = useForm({mode: 'onChange', reValidateMode: 'onSubmit'})

    return (
        <>
            <div className="text-center fs-09">Введите номер телефона, мы вышлем на него код для сброса пароля</div>
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
                <button type="submit" className="btn-2 w-100 mt-4" disabled={!isValid}>
                    Выслать код
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

export default PasswordRecoveryForm
