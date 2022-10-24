import React, {useState} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import {IoClose} from "react-icons/io5"
import Order from '../components/Order'

export default function PersonalAccount() {
    const [showEdit, setShowEdit] = useState(false)
    const handleCloseEdit = () => setShowEdit(false)
    const handleShowEdit = () => setShowEdit(true)

    return (
        <>
        <main>
            <Container className='account'>
                <section className='mb-6'>
                    <Row>
                        <Col xs={12} md={9} lg={8} xl={7} xxl={6}>
                            <h1>Мой профиль</h1>
                            <Row xs={1} md={2} className='g-4'>
                                <Col>
                                    <input type='text' placeholder='Имя' value={'МоеИмя'} readOnly/>
                                </Col>
                                <Col>
                                    <input type='tel' placeholder='Номер телефона' value={'+7 965 583-95-63'} readOnly/>
                                </Col>
                                <Col>
                                    <div className='input-group'>
                                        <select readOnly value={'4'} className='col-4'>
                                            <option disabled>день</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                            <option value='6'>6</option>
                                            <option value='7'>7</option>
                                            <option value='8'>8</option>
                                            <option value='9'>9</option>
                                            <option value='10'>10</option>
                                        </select>
                                        <select readOnly value={'май'} className='col-8'>
                                            <option disabled>месяц</option>
                                            <option value='январь'>январь</option>
                                            <option value='февраль'>февраль</option>
                                            <option value='март'>март</option>
                                            <option value='апрель'>апрель</option>
                                            <option value='май'>май</option>
                                            <option value='июнь'>июнь</option>
                                            <option value='июль'>июль</option>
                                            <option value='август'>август</option>
                                            <option value='сентябрь'>сентябрь</option>
                                            <option value='октябрь'>октябрь</option>
                                            <option value='ноябрь'>ноябрь</option>
                                            <option value='декабрь'>декабрь</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col>
                                    <input type='email' placeholder='Электронная почта' value={'mail@mail.ru'} readOnly/>
                                </Col>
                                <Col>
                                    <button type='button' onClick={handleShowEdit} className='btn-1 w-100 mt-4'>Редактировать данные</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </section>

                <section className='mb-6'>
                    <h2>История заказов</h2>
                    <p>Заказов ещё не было</p>
                    <Order orderNum={1234} date={'24.10.2022'} priceSum={5000} status={1} paymentType={0} comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit'/>
                    <Order orderNum={1234} date={'24.10.2022'} priceSum={5000} status={1} paymentType={0} comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit'/>
                </section>

                <section className='mb-6'>
                    <Row>
                        <Col md={3}>
                            <button type='button' className='btn-1 w-100'>Выйти</button>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
        <Modal size="lg" show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header>
                <h2 className='text-center mb-0'>Редактировать личные данные</h2>
                <button className='close' onClick={handleCloseEdit}>
                    <IoClose/>
                </button>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <Row xs={1} lg={2} className='g-4'>
                        <Col>
                            <input type='text' placeholder='Имя'/>
                        </Col>
                        <Col>
                            <input type='tel' placeholder='Номер телефона' value={'+7 965 583-95-63'} readOnly/>
                        </Col>
                        <Col>
                            <div className='input-group'>
                                <select className='col-4'>
                                    <option disabled>день</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </select>
                                <select className='col-8'>
                                    <option disabled>месяц</option>
                                    <option>январь</option>
                                    <option>февраль</option>
                                    <option>март</option>
                                    <option>апрель</option>
                                    <option>май</option>
                                    <option>июнь</option>
                                    <option>июль</option>
                                    <option>август</option>
                                    <option>сентябрь</option>
                                    <option>октябрь</option>
                                    <option>ноябрь</option>
                                    <option>декабрь</option>
                                </select>
                            </div>
                        </Col>
                        <Col>
                            <input type='email' placeholder='Электронная почта'/>
                        </Col>
                        <Col>
                            <button type='reset' onClick={handleCloseEdit} className='btn-1 w-100 mt-3'>Отменить</button>
                        </Col>
                        <Col>
                            <button type='button' className='btn-2 w-100 mt-lg-3'>Редактировать данные</button>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
        </Modal>
        </>
    )
}