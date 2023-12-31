import React, {useLayoutEffect} from 'react'
import {Form, Row, Col} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import Button from '../UI/Button'
import {LoadCanvasTemplateNoReload, loadCaptchaEnginge, validateCaptcha} from 'react-simple-captcha'

const PasswordRecoveryForm = ({setActiveModal, onSubmit}) => {
    const {
        formState: {errors, isValid},
        handleSubmit,
        control,
        register,
        getValues,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onSubmit',
        defaultValues: {
            step: 1,
        },
    })

    useLayoutEffect(() => {
        loadCaptchaEnginge(4, 'transparent', '#fff')
    }, [])

    return (
        <>
            <div className="text-center fs-09">Введите номер телефона, мы вышлем на него код для сброса пароля</div>
            <Form className="login-forms" onSubmit={handleSubmit((data) => onSubmit(data, 'recoveryCode'))}>
                <Form.Control
                    type="email"
                    className="my-input"
                    placeholder="Придумайте Email"
                    {...register('email')}
                />
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
                    <Row className="align-items-center">
                        <Col md={8}>
                            <Form.Control
                                maxLength={4}
                                placeholder="Проверочный код"
                                {...register('captcha', {
                                    required: 'Обязательное поле',
                                    validate: (value) =>
                                        (value?.length >= 4 && validateCaptcha(value) === true) ||
                                        'Неверный проверочный код',
                                })}
                            />
                        </Col>
                        <Col md={4}>
                            <LoadCanvasTemplateNoReload />
                        </Col>
                    </Row>
                    {errors.captcha && <Form.Text className="text-danger">{errors.captcha.message}</Form.Text>}
                </Form.Group>
                <Button type="submit" className="btn-2 w-100 mt-4" disabled={!isValid}>
                    Выслать код
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

export default PasswordRecoveryForm
