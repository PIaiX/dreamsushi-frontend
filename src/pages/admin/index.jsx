import React, {useCallback, useEffect, useState} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {MetaTags} from 'react-meta-tags'
import Button from '../../components/UI/Button'
import {apiResponseMessages} from '../../config/api'
import {dispatchAlert, dispatchApiErrorAlert} from '../../helpers/alert'
import {getEprProducts, getSite, getStatistic, updateSite} from '../../services/admin'

const Admin = () => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        setValue,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onSubmit',
        defaultValues: {
            deliveryText: '',
        },
    })

    const [products, setProducts] = useState({
        isLoaded: true,
        error: null,
        count: 0,
    })
    const [statistic, setStatistic] = useState({
        users: 0,
        products: 0,
        categories: 0,
        orders: 0,
        addresses: 0,
    })

    useEffect(() => {
        getSite().then(
            (res) => res?.site && setValue('deliveryText', res.site.find((e) => e.name === 'deliveryText')?.value)
        )
        getStatistic().then((res) => res && setStatistic(res))
    }, [])

    const clickGetErpProducts = useCallback(() => {
        setProducts({...products, isLoaded: false})
        getEprProducts()
            .then(
                (res) =>
                    res &&
                    setProducts((prev) => ({
                        ...prev,
                        isLoaded: true,
                        count: res.count,
                    }))
            )
            .finally(() => setProducts((prev) => ({...prev, isLoaded: true})))
    }, [])

    const onUpdateSite = useCallback((data) => {
        updateSite(data)
            .then((res) => {
                if (res.type == 'SUCCESS') {
                    dispatchAlert('success', apiResponseMessages.ADMIN_SITE_UPDATE)
                }
            })
            .catch((error) => {
                dispatchApiErrorAlert(error)
            })
    }, [])

    return (
        <section className="profile">
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} ??? ???????????? ????????????????????????????</title>
            </MetaTags>
            <h1>???????????? ????????????????????????????</h1>
            <Row className="row admin-home">
                <Col md={6}>
                    <div className="box mb-4">
                        <h4 className="mb-3 mb-sm-4">
                            ??????????????????{' '}
                            <b className="text-success">
                                {products.count > 0 ? products.count : statistic.products}
                            </b>{' '}
                            ??????????????
                        </h4>
                        <Button
                            isLoading={!products.isLoaded}
                            disabled={!products.isLoaded}
                            className="btn-2"
                            onClick={() => clickGetErpProducts()}
                        >
                            ??????????????????
                        </Button>
                    </div>
                    <div className="box mb-4">
                        <h4 className="mb-3 mb-sm-4">????????????????</h4>
                        <Form onSubmit={handleSubmit(onUpdateSite)}>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                className="mb-3"
                                placeholder="?????????????? ??????????"
                                {...register('deliveryText', {
                                    maxLength: {value: 1500, message: '???????????????? 1500 ????????????????'},
                                })}
                            />
                            <Button type="submit" className="btn-2">
                                ??????????????????
                            </Button>
                        </Form>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="box">
                        <h4 className="mb-3 mb-sm-4">????????????????????</h4>
                        <p>
                            ????????????????: <b className="text-success">{statistic.users ?? 0}</b>
                        </p>
                        <p>
                            ??????????????: <b className="text-success">{statistic.orders ?? 0}</b>
                        </p>
                        <p>
                            ??????????????????: <b className="text-success">{statistic.categories ?? 0}</b>
                        </p>
                        <p>
                            ??????????????: <b className="text-success">{statistic.products ?? 0}</b>
                        </p>
                        <p>
                            ??????????????: <b className="text-success">{statistic.addresses ?? 0}</b>
                        </p>
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default Admin
