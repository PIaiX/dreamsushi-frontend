import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import CustomDataTable from '../../../components/CustomDataTable'
import {getUsers} from '../../../services/admin'
import Button from '../../UI/Button'

const NotificationForm = ({onSubmit, classNameButton = ''}) => {
    const [isModalUsers, setIsModalUsers] = useState(false)
    const [users, setUsers] = useState({
        isLoaded: false,
        error: null,
        items: [],
        pagination: false,
    })
    const userColumns = [
        {
            name: 'Ф.И.О',
            selector: 'firstName',
            cell: (row) => (row.firstName ?? '') + ' ' + (row.lastName ?? '') + ' ' + (row.patronymic ?? ''),
        },
        {
            name: 'День рождения',
            selector: 'birthday',
            sortable: true,
            cell: (row) => (row.birthday ? moment(row.birthday).format('DD.MM.YYYY kk:mm') : 'Не указано'),
        },
        {
            name: 'Номер телефона',
            selector: 'phone',
        },
        {
            name: 'Email',
            selector: 'email',
        },
    ]
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        setValue,
        watch,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onSubmit',
        defaultValues: {
            title: '',
            desc: '',
            all: true,
            usersIds: [],
        },
    })

    useEffect(() => {
        getUsers(1, 200)
            .then(
                (res) =>
                    res &&
                    setUsers((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.users?.rows,
                        pagination: res?.pagination,
                    }))
            )
            .catch((error) => error && setUsers((prev) => ({...prev, isLoaded: true, error})))
    }, [])

    return (
        <Form className="profile-edit" onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col md={12}>
                    <Form.Group className="mb-4">
                        <Form.Label>Заголовок</Form.Label>
                        <Form.Control
                            placeholder="Ведите заголовок"
                            {...register('title', {maxLength: {value: 250, message: 'Максимум 250 символов'}})}
                        />
                        {errors.title && <Form.Text className="text-danger">{errors?.title?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group className="mb-4">
                        <Form.Label>Текст</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Ведите текст"
                            {...register('desc', {
                                maxLength: {value: 10000, message: 'Максимум 10000 символов'},
                            })}
                        />
                        {errors.desc && <Form.Text className="text-danger">{errors?.desc?.message}</Form.Text>}
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group className="mb-4">
                        <Form.Check className="mb-4">
                            <Form.Check.Input
                                type="checkbox"
                                name="all"
                                id="all"
                                value={true}
                                {...register('all')}
                            />
                            <Form.Check.Label htmlFor="all" className="ms-2">
                                Отправить всем
                            </Form.Check.Label>
                        </Form.Check>
                        {!watch('all') && (
                            <a className="btn-1" onClick={() => setIsModalUsers(!isModalUsers)}>
                                {isModalUsers ? 'Скрыть список' : 'Выбрать получателей'}
                            </a>
                        )}
                    </Form.Group>
                    {!watch('all') && isModalUsers && (
                        <Form.Group className="mb-4">
                            <CustomDataTable
                                selectableRows
                                onSelectedRowsChange={(e) =>
                                    setValue(
                                        'usersIds',
                                        e.selectedRows.map((item) => item.id)
                                    )
                                }
                                columns={userColumns}
                                data={users.items}
                                pagination={users.pagination}
                            />
                        </Form.Group>
                    )}
                </Col>
            </Row>
            <Form.Group>
                <Button type="submit" className={'btn-2 ' + classNameButton} disabled={!isValid}>
                    Отправить
                </Button>
            </Form.Group>
        </Form>
    )
}

export default NotificationForm
