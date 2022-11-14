import React, {useEffect} from 'react'
import {Form} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import InputMask from 'react-input-mask'
import Button from '../UI/Button'

const RecoveryCodeForm = ({setActiveModal, onSubmit, phone}) => {
    const {
        formState: {errors, isValid},
        handleSubmit,
        control,
        setValue,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onSubmit',
        defaultValues: {
            step: 2,
        },
    })

    useEffect(() => {
        phone && setValue('phone', phone)
    }, [phone])

    return (
        <>
            {phone && <div className="text-center fs-09">Введите код высланный на номер {phone}</div>}
            <Form className="login-forms" onSubmit={handleSubmit((data) => onSubmit(data, 'newPassword'))}>
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
                <Button type="submit" className="btn-2 w-100 mt-4" disabled={!isValid}>
                    Cбросить пароль
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

export default RecoveryCodeForm
