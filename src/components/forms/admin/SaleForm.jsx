import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {getCategories} from '../../../services/admin'
import Button from '../../UI/Button'

const SaleForm = ({onSubmit, sale = {}, classNameButton = ''}) => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onSubmit',
        defaultValues: {
            id: sale.id ?? 0,
            title: sale.title ?? '',
            desc: sale.desc ?? '',
            // price: sale.price ?? '',
            // priceSale: sale.priceSale ?? '',
            // weight: sale.weight ?? '',
        },
    })

    return (
        <Form className="profile-edit" onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formFile" className="mb-4">
                        <Form.Label>Изображение акции</Form.Label>
                        <Form.Control type="file" {...register('images')} />
                    </Form.Group>
                </Col>
                <Col md={6} className="d-flex align-items-center">
                    <small>Изображения в форматах png, jpg, jpeg и не более 5 мб</small>
                </Col>
                <Col md={12}>
                    <Form.Group className="mb-4">
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            placeholder="Ведите название"
                            {...register('title', {maxLength: {value: 250, message: 'Максимум 250 символов'}})}
                        />
                        {errors.title && <Form.Text className="text-danger">{errors?.title?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group className="mb-4">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Ведите описание"
                            {...register('desc', {
                                maxLength: {value: 10000, message: 'Максимум 10000 символов'},
                            })}
                        />
                        {errors.desc && (
                            <Form.Text className="text-danger">{errors?.desc?.message}</Form.Text>
                        )}
                    </Form.Group>
                </Col>
                {/* <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="0"
                            {...register('price', {max: {value: 99999, message: 'Максимум 99999 руб'}})}
                        />
                        {errors.price && <Form.Text className="text-danger">{errors?.price?.message}</Form.Text>}
                        <Form.Text className="text-muted">Цена с учетом скидки</Form.Text>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Скидка</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="0"
                            {...register('priceSale', {max: {value: 99999, message: 'Максимум 99999 руб'}})}
                        />
                        {errors.priceSale && (
                            <Form.Text className="text-danger">{errors?.priceSale?.message}</Form.Text>
                        )}
                        <Form.Text className="text-muted">Цена без учета скидки</Form.Text>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Вес (гр)</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="0"
                            {...register('weight', {max: {value: 99999, message: 'Максимум 99999 гр'}})}
                        />
                        {errors.weight && <Form.Text className="text-danger">{errors?.weight?.message}</Form.Text>}
                        <Form.Text className="text-muted">Вес товара 1000 гр = 1 кг</Form.Text>
                    </Form.Group>
                </Col> */}
            </Row>
            <Form.Group>
                <Button type="submit" className={'btn-2 ' + classNameButton} disabled={!isValid}>
                    {sale.length > 0 ? 'Сохранить изменения' : 'Сохранить'}
                </Button>
            </Form.Group>
        </Form>
    )
}

export default SaleForm
