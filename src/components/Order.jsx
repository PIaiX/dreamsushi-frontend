import React, {useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {IoCart, IoCaretDown, IoCaretUp} from "react-icons/io5"

const Order = (props) => {
    const [extended, setExtended] = useState(false)

    const statusArr = [
        {id: 0, name: 'Новый'}, 
        {id: 1, name: 'Получен клиентом'}, 
        {id: 2, name: 'Отменен'},
    ]
    const paymentArr = [
        {id: 0, name: 'Онлайн'}, 
        {id: 1, name: 'Картой курьеру'}, 
        {id: 2, name: 'Наличными'},
    ]

    return (
        <div className='order'>
            <div className='main'>
                <div className='title'>№{props.orderNum}</div>
                <div className='date'>{props.date}</div>
                <div className='sum'>{props.priceSum} ₽</div>
                <div className='status'>{statusArr.find(item => item.id === props.status).name}</div>
                <div className='btns'>
                    <button type='button' onClick={() => setExtended((extended) ? false : true)}>
                        <span className='d-none d-lg-inline fs-08 me-1'>подробнее</span>
                        {
                            (extended)
                            ?<IoCaretUp className='fs-17'/>
                            :<IoCaretDown className='fs-17'/>
                        }
                    </button>
                    <button type='button' className='ms-2 ms-md-4'>
                        <span className='d-none d-lg-inline fs-08 me-1'>повторить</span>
                        <IoCart className='fs-17'/>
                    </button>
                </div>
            </div>
            {
                (extended)&&
                <div className='extended'>
                    <Row className='justify-content-between gx-5'>
                        <Col xs={12} md={6} xxl={5}>
                            <div className='product-short'>
                                <div className='name'>Пицца Итальяно</div>
                                <div className='ms-3'>2 шт.</div>
                                <div className='ms-3'>1500 ₽</div>
                            </div>
                            <div className='product-short'>
                                <div className='name'>Посейдон Фарерский лосось Брокколи</div>
                                <div className='ms-3'>1 шт.</div>
                                <div className='ms-3'>1500 ₽</div>
                            </div>
                            <div className='product-short'>
                                <div className='name'>Посейдон Фарерский лосось Брокколи</div>
                                <div className='ms-3'>2 шт.</div>
                                <div className='ms-3'>2000 ₽</div>
                            </div>
                        </Col>
                        <Col xs={12} md={6} xxl={5} className='mt-3 mt-md-0'>
                            <table className='simple'>
                                <tbody>
                                    <tr className='d-sm-none'>
                                        <td>Общая сумма:</td>
                                        <td><span className='fs-12 fw-7'>{props.priceSum} ₽</span></td>
                                    </tr>
                                    <tr className='d-sm-none'>
                                        <td>Статус заказа:</td>
                                        <td>{statusArr.find(item => item.id === props.status).name}</td>
                                    </tr>
                                    <tr>
                                        <td>Способ оплаты:</td>
                                        <td>{paymentArr.find(item => item.id === props.paymentType).name}</td>
                                    </tr>
                                    <tr>
                                        <td>Адрес доставки:</td>
                                        <td>Фучика 78, офис 2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                    <p className='mt-4'><span className='main-color fw-6'>Комментарий к заказу:</span> {props.comment}</p>
                </div>
            }
        </div>
    );
};

export default Order;