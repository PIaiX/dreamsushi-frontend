import React, {useState, useEffect} from 'react'
import {Form, Row, Col, Dropdown} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import Button from '../UI/Button'
import useDebounce from '../../hooks/useDebounce'
import {getDadataStreets, getDadataAddress} from '../../services/dadata'

const AddressForm = ({onSubmit, address = {}, classNameButton = ''}) => {
    const [streets, setStreets] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        watch,
        getValues,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onSubmit',
        defaultValues: {
            id: address.id,
            title: address.title ?? '',
            street: address.street ?? '',
            home: address.home ?? '',
            entrance: address.entrance ?? '',
            floor: address.floor ?? '',
            apartment: address.apartment ?? '',
        },
    })

    const streetText = useDebounce(watch('street'), 1000)

    const clickAddress = (address) => {
        getDadataAddress(address).then((res) => {
            console.log(res)
            // if (res?.data?.suggestions) {
            //     let info = res.data.suggestions.map(({data}) => ({
            //         value: data.street_with_type,
            //     }))
            //     setStreets(info)
            // }
        })
    }

    useEffect(() => {
        if (streetText) {
            getDadataStreets(streetText).then((res) => {
                if (res?.data?.suggestions) {
                    let info = res.data.suggestions.map(({data}) => ({
                        value: data.street_with_type,
                    }))
                    console.log(info)
                    setStreets(info)
                }
            })
        }
    }, [streetText])

    const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
        <a
            ref={ref}
            onClick={(e) => {
                e.preventDefault()
                onClick(e)
            }}
        >
            {children}
        </a>
    ))

    return (
        <Form className="profile-edit" onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-4">
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            placeholder="Например, Работа"
                            {...register('title', {maxLength: {value: 250, message: 'Максимум 250 символов'}})}
                        />
                        {errors.title && <Form.Text className="text-danger">{errors?.title?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={8}>
                    <Form.Group className="mb-4 position-relative">
                        <Form.Label>
                            Улица <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            onBlurCapture={() => setShowDropdown(false)}
                            onFocus={() => setShowDropdown(true)}
                            type="search"
                            autoComplete="off"
                            list="streets"
                            placeholder="Введите улицу"
                            {...register('street', {
                                required: 'Обязательное поле',
                                maxLength: {value: 250, message: 'Максимум 250 символов'},
                            })}
                        />
                        {showDropdown && (
                            <Dropdown.Menu show className="w-100 custom-input-street">
                                {streets?.length > 0 ? (
                                    streets.map((item, key) => (
                                        <Dropdown.Item onClick={() => clickAddress(item.value)} key={key}>
                                            {item.value}
                                        </Dropdown.Item>
                                    ))
                                ) : (
                                    <Dropdown.Item key="noFound">Ничего не найдено</Dropdown.Item>
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
                            placeholder="Введите дом"
                            {...register('home', {
                                required: 'Обязательное поле',
                                maxLength: {value: 8, message: 'Максимум 8 символов'},
                            })}
                        />
                        {errors.home && <Form.Text className="text-danger">{errors?.home?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
                    <Form.Group className="mb-4">
                        <Form.Label>Код двери</Form.Label>
                        <Form.Control
                            placeholder="Введите код двери"
                            {...register('code', {
                                maxLength: {value: 12, message: 'Максимум 12 символов'},
                            })}
                        />
                        {errors.code && <Form.Text className="text-danger">{errors?.code?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Check className="mb-4">
                        <Form.Check.Input
                            type="checkbox"
                            name="main"
                            id="main"
                            value={1}
                            defaultChecked={getValues('sex')}
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
