import React, {useEffect, useState} from 'react'
import {Col, Dropdown, Form, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import Button from '../UI/Button'
import useDebounce from '../../hooks/useDebounce'
import {getDadataStreets} from '../../services/dadata'
import defineDeliveryZone from '../../helpers/defineDeliveryZone'
import {dispatchAlert} from '../../helpers/alert'

const AddressForm = ({onSubmit, address = {}, classNameButton = ''}) => {
    const [streets, setStreets] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        watch,
        reset,
        getValues,
        setError,
        setValue,
    } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        defaultValues: {
            id: address.id,
            title: address.title ?? '',
            full: address.full ?? '',
            street: address.street ?? '',
            home: address.home ?? '',
            block: address.block ?? '',
            entrance: address.entrance ?? '',
            floor: address.floor ?? '',
            apartment: address.apartment ?? '',
            lat: address.lat ?? '',
            lon: address.lon ?? '',
            affiliate: '',
            comment: address.comment ?? '',
            main: address.main,
        },
    })

    const streetText = useDebounce(watch('full'), 300)

    const clickAddress = (address) => {
        if (address.data.geo_lat && address.data.geo_lon) {
            let geoInfo = defineDeliveryZone({lat: address.data.geo_lat, lon: address.data.geo_lon})
            if (!geoInfo || !geoInfo.status) {
                dispatchAlert('danger', 'По данному адресу доставка не производится')
                setError('affiliate', {type: 'custom', message: 'По данному адресу доставка не производится'})
                return false
            }
            setValue('affiliate', geoInfo.affiliate)
        }

        setValue('full', address.value ?? '')

        setValue('street', address.data.street_with_type ? address.data.street_with_type : address.value ?? '')

        setValue('home', address.data.house ?? '')

        setValue('block', address.data.block ?? '')

        setValue('lat', address.data.geo_lat ?? '')

        setValue('lon', address.data.geo_lon ?? '')

        setShowDropdown(false)
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter' && streets?.length > 0) {
            clickAddress(streets[0])
            setStreets([])
        }
    }

    useEffect(() => {
        if (streetText) {
            getDadataStreets(streetText).then((res) => {
                if (res?.data?.suggestions) {
                    setStreets(res.data.suggestions)
                }
            })
        }
    }, [streetText])

    return (
        <Form className="profile-edit" onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-4 position-relative">
                        <Form.Label>
                            Адрес <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            onKeyDown={(e) => onKeyDown(e)}
                            onClick={() => setShowDropdown(true)}
                            onInput={(e) =>
                                e.target.value.length === 0 ? setShowDropdown(false) : setShowDropdown(true)
                            }
                            autoComplete="off"
                            placeholder="Введите адрес и номер дома"
                            {...register('full', {
                                required: 'Обязательное поле',
                                maxLength: {value: 250, message: 'Максимум 250 символов'},
                            })}
                        />
                        {showDropdown && streets?.length > 0 && (
                            <Dropdown.Menu
                                onClick={() => setShowDropdown(false)}
                                show
                                className="w-100 custom-input-street"
                            >
                                {streets.map(
                                    (item, key) =>
                                        item && (
                                            <Dropdown.Item onClick={() => clickAddress(item)} key={key}>
                                                {item.value}
                                            </Dropdown.Item>
                                        )
                                )}
                            </Dropdown.Menu>
                        )}
                        {errors.street && <Form.Text className="text-danger">{errors?.street?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-4">
                        <Form.Label>
                            Дом <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            onClick={() => setShowDropdownHome(true)}
                            placeholder="Введите дом"
                            autoComplete="off"
                            {...register('home', {
                                required: 'Обязательное поле',
                                maxLength: {value: 8, message: 'Максимум 8 символов'},
                            })}
                        />
                        {errors.home && <Form.Text className="text-danger">{errors?.home?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-4">
                        <Form.Label>Корпус</Form.Label>
                        <Form.Control
                            onClick={() => setShowDropdownHome(true)}
                            placeholder="Введите корпус"
                            autoComplete="off"
                            {...register('block', {
                                maxLength: {value: 8, message: 'Максимум 8 символов'},
                            })}
                        />
                        {errors.block && <Form.Text className="text-danger">{errors?.block?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-4">
                        <Form.Label>
                            Подъезд <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            placeholder="Введите подъезд"
                            {...register('entrance', {
                                required: 'Обязательное поле',
                                maxLength: {value: 8, message: 'Максимум 8 символов'},
                            })}
                        />
                        {errors.entrance && (
                            <Form.Text className="text-danger">{errors?.entrance?.message}</Form.Text>
                        )}
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-4">
                        <Form.Label>
                            Квартира <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            placeholder="Введите квартиру"
                            {...register('apartment', {
                                required: 'Обязательное поле',
                                maxLength: {value: 8, message: 'Максимум 8 символов'},
                            })}
                        />
                        {errors.apartment && (
                            <Form.Text className="text-danger">{errors?.apartment?.message}</Form.Text>
                        )}
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group className="mb-4">
                        <Form.Label>
                            Этаж <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            placeholder="Введите этаж"
                            {...register('floor', {
                                required: 'Обязательное поле',
                                maxLength: {value: 3, message: 'Максимум 3 символов'},
                            })}
                        />
                        {errors.floor && <Form.Text className="text-danger">{errors?.floor?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-4">
                        <Form.Label>Домофон</Form.Label>
                        <Form.Control
                            {...register('code', {
                                maxLength: {value: 12, message: 'Максимум 12 символов'},
                            })}
                        />
                        {errors.code && <Form.Text className="text-danger">{errors?.code?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group className="mb-4">
                        <Form.Label>Название адреса</Form.Label>
                        <Form.Control
                            placeholder="Например, Работа"
                            {...register('title', {maxLength: {value: 250, message: 'Максимум 250 символов'}})}
                        />
                        {errors.title && <Form.Text className="text-danger">{errors?.title?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group className="mb-4">
                        <Form.Label>Комментарий</Form.Label>
                        <Form.Control
                            placeholder="Введите комментарий"
                            as="textarea"
                            {...register('comment', {maxLength: {value: 1500, message: 'Максимум 1500 символов'}})}
                        />
                        {errors.comment && <Form.Text className="text-danger">{errors?.comment?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Check className="mb-4">
                        <Form.Check.Input
                            type="checkbox"
                            name="main"
                            id="main"
                            value={1}
                            defaultChecked={getValues('main')}
                            {...register('main')}
                        />
                        <Form.Check.Label htmlFor="main" className="ms-2">
                            Адрес по умолчанию
                        </Form.Check.Label>
                    </Form.Check>
                </Col>
            </Row>
            <Form.Group>
                <Button type="submit" className={'btn-2 ' + classNameButton} disabled={!isValid}>
                    {address.length > 0 ? 'Сохранить изменения' : 'Сохранить адрес'}
                </Button>
            </Form.Group>
        </Form>
    )
}

export default AddressForm
