import {useLayoutEffect} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import {LoadCanvasTemplateNoReload, loadCaptchaEnginge, validateCaptcha} from 'react-simple-captcha'
import Button from '../UI/Button'

const RegistrationForm = ({setActiveModal, onSubmit}) => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        watch,
        setError,
        control,
        getValues,
    } = useForm({mode: 'all', reValidateMode: 'onChange'})

    useLayoutEffect(() => {
        loadCaptchaEnginge(4, 'transparent', '#fff')
    }, [])

    return (
        <Form className="login-forms" onSubmit={handleSubmit(onSubmit)}>
            <Form.Control type="email" className="my-input" placeholder="Придумайте Email" {...register('email')} />
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
                            message: 'Введите номер до конца',
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
                        required: 'Введите пароль',
                        minLength: {
                            value: 4,
                            message: 'Минимальный пароль должен состоять из 4-х символов',
                        },
                    })}
                />
                {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="mt-4">
                <Form.Control
                    type="password"
                    placeholder="Повторите пароль"
                    {...register('passwordConfirm', {
                        required: 'Повторите пароль',
                        validate: (value) => value === watch('password') || 'Пароли не совпадают',
                        minLength: {
                            value: 4,
                            message: 'Минимальный пароль должен состоять из 4-х символов',
                        },
                    })}
                />
                {errors.passwordConfirm && (
                    <Form.Text className="text-danger">{errors.passwordConfirm.message}</Form.Text>
                )}
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
                Создать аккаунт
            </Button>
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
            <Button
                type="button"
                onClick={() => setActiveModal('login')}
                className="mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto"
            >
                У меня есть аккаунт
            </Button>
        </Form>
    )
}

export default RegistrationForm
