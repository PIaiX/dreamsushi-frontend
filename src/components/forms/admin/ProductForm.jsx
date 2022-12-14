import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {getCategories} from '../../../services/admin'
import Button from '../../UI/Button'

const ProductForm = ({onSubmit, product = {}, classNameButton = ''}) => {
    const [categories, setCategories] = useState({
        isLoaded: false,
        error: null,
        items: [],
    })
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        watch,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onSubmit',
        defaultValues: {
            id: product.id ?? 0,
            title: product.title ?? '',
            description: product.description ?? '',
            price: product.price ?? '',
            priceSale: product.priceSale ?? '',
            weight: product.weight ?? '',
            new: product.new ?? false,
            sticks: product.sticks ?? 0,
            categoryId: product.categoryId ?? '',
        },
    })

    useEffect(() => {
        getCategories(1, 200)
            .then(
                (res) =>
                    res &&
                    setCategories((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.categories?.rows,
                    }))
            )
            .catch((error) => error && setCategories((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    return (
        <Form className="profile-edit" onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formFile" className="mb-4">
                        <Form.Label>Изображение товара</Form.Label>
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
                            placeholder="Введите название"
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
                            rows={7}
                            placeholder="Введите описание"
                            {...register('description', {
                                maxLength: {value: 10000, message: 'Максимум 10000 символов'},
                            })}
                        />
                        {errors.description && (
                            <Form.Text className="text-danger">{errors?.description?.message}</Form.Text>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
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
                        <Form.Text className="text-muted">Вес товара в граммах</Form.Text>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Категория</Form.Label>

                        {!categories || !categories.items || categories?.items?.length === 0 ? (
                            <Form.Text className="text-danger">Сначала создайте метку</Form.Text>
                        ) : (
                            <>
                                <Form.Select
                                    {...register('categoryId', {required: 'Обязательное поле'})}
                                    className="form-control"
                                >
                                    <option value="">Не выбрано</option>
                                    {categories.items.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.title}
                                        </option>
                                    ))}
                                </Form.Select>
                                {errors.categoryId && (
                                    <Form.Text className="text-danger">{errors?.categoryId?.message}</Form.Text>
                                )}
                            </>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Кол-во приборов</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="0"
                            {...register('sticks', {
                                required: 'Обязательное поле',
                                max: {value: 500, message: 'Максимум 500 шт'},
                            })}
                        />
                        {errors.weight && <Form.Text className="text-danger">{errors?.weight?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={6} className="d-flex align-items-center">
                    <small>Разница кол-ва приборов будет добавляться в виде товаров при оформлении заказа</small>
                </Col>
                <Col md={6}>
                    <Form.Check className="mb-4">
                        <Form.Check.Input
                            type="checkbox"
                            value={true}
                            id="new"
                            defaultChecked={watch('new') === true}
                            {...register('new')}
                        />
                        <Form.Check.Label htmlFor="new" className="ps-2">
                            Новинка
                        </Form.Check.Label>
                    </Form.Check>
                </Col>
            </Row>
            <Form.Group>
                <Button type="submit" className={'btn-2 ' + classNameButton} disabled={!isValid}>
                    {product.length > 0 ? 'Сохранить изменения' : 'Сохранить'}
                </Button>
            </Form.Group>
        </Form>
    )
}

export default ProductForm
