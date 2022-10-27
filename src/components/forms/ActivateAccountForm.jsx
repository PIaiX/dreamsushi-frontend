import React, {useEffect} from 'react'
import {Form} from 'react-bootstrap'
import {Controller, useForm} from 'react-hook-form'
import InputMask from 'react-input-mask'

const ActivateAccountForm = ({setActiveModal, onSubmit, login}) => {
    const {
        formState: {errors, isValid},
        handleSubmit,
        control,
        setValue,
    } = useForm({mode: 'onChange', reValidateMode: 'onSubmit'})

    useEffect(() => {
        login && setValue('login', login)
    }, [login])

    return (
        <>
            {login && <div className="text-center fs-09">Введите код высланный на номер {login}</div>}
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
                <button type="submit" className="btn-2 w-100 mt-4" disabled={!isValid}>
                    Активировать
                </button>
                <button
                    type="button"
                    onClick={() => setActiveModal('login')}
                    className="mt-4 d-block text-center fs-09 fw-5 font-faded mx-auto"
                >
                    У меня есть аккаунт
                </button>
            </Form>
        </>
    )
}

export default ActivateAccountForm
