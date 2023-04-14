import React, {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import InputMask from 'react-input-mask'
import {Timer} from '../../helpers/timer'
import {authNewKeyActivate} from '../../services/auth'

import Button from '../UI/Button'

const ActivateAccountForm = ({setActiveModal, onSubmit, phone}) => {
    const {
        formState: {errors, isValid},
        handleSubmit,
        control,
        setValue,
    } = useForm({mode: 'onChange', reValidateMode: 'onSubmit'})

    const [endTimer, setEndTimer] = useState(false)

    useEffect(() => {
        phone && setValue('phone', phone)
    }, [phone])

    const onNewKeyActivation = () => {
        setEndTimer(false)
        authNewKeyActivate()
    }

    return (
        <>
            {phone && <div className="text-center fs-09">Введите код высланный на номер {phone}</div>}
            <Form className="login-forms" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Controller
                        name="key"
                        control={control}
                        render={({field}) => (
                            <InputMask
                                mask="9999"
                                placeholder="_ _ _ _"
                                maskChar=""
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e?.target?.value)}
                                className="text-center"
                            />
                        )}
                        rules={{
                            required: 'введите код',
                            minLength: {
                                value: 4,
                                message: 'код должен состоять из 4 символов',
                            },
                            maxLength: {
                                value: 4,
                                message: 'код должен состоять из 4 символов',
                            },
                        }}
                    />
                    {errors.key && <Form.Text className="text-danger">{errors?.key?.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="text-center mt-3">
                    {endTimer ? (
                        <Form.Text className="text-white cursor-pointer">
                            <a onClick={() => onNewKeyActivation()}>Отправить повторно код подтверждения</a>
                        </Form.Text>
                    ) : (
                        <Form.Text>
                            Повторить отправку кода подтверждения через <Timer onEnd={() => setEndTimer(true)} /> сек
                        </Form.Text>
                    )}
                </Form.Group>
                <Button type="submit" className="btn-2 w-100 mt-4" disabled={!isValid}>
                    Активировать
                </Button>
                <Button
                    type="button"
                    onClick={() => setActiveModal('login')}
                    className="mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto"
                >
                    У меня есть аккаунт
                </Button>
            </Form>
        </>
    )
}

export default ActivateAccountForm
