import React from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import Button from '../../UI/Button'

const MarkForm = ({onSubmit, mark = {}, classNameButton = ''}) => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onSubmit',
        defaultValues: {
            id: mark.id ?? null,
            name: mark.title ?? '',
            value: mark.value ?? '',
        },
    })

    return (
        <Form className="profile-edit" onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            placeholder="Задайте название"
                            {...register('name', {maxLength: {value: 250, message: 'Максимум 250 символов'}})}
                        />
                        {errors.name && <Form.Text className="text-danger">{errors?.name?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Значение</Form.Label>
                        <Form.Control
                            placeholder="Задайте значение"
                            {...register('value', {maxLength: {value: 250, message: 'Максимум 250 символов'}})}
                        />
                        {errors.value && <Form.Text className="text-danger">{errors?.value?.message}</Form.Text>}
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group>
                <Button type="submit" className={'btn-2 ' + classNameButton} disabled={!isValid}>
                    {mark.length > 0 ? 'Сохранить изменения' : 'Сохранить'}
                </Button>
            </Form.Group>
        </Form>
    )
}

export default MarkForm
