import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

const Checkout = () => {
    const [delivery, setDelivery] = useState(true)
    const productsCount = 2
    return (
        <main>
            <Container>
                <section className='mb-6'>
                    <div className='d-flex align-items-baseline mb-5'>
                        <h1 className='mb-0'>Оформление заказа</h1>
                        <span className='ms-4'>{productsCount} позиции</span>
                    </div>

                    <form>
                        <Row className='justify-content-between'>
                            <Col xs={12} lg={7} xxl={6}>
                                <label className='fw-6 mb-2'>Номер телефона</label>
                                <input type='text' placeholder='Номер телефона' className='mb-4'/>

                                <label className='fw-6 mb-2'>Тип заказа</label>
                                <div className='toggle-btns mb-4'>
                                    <button type='button' className={(delivery)?'btn active':'btn'} onClick={()=>setDelivery(true)}>Доставка</button>
                                    <button type='button' className={(delivery)?'btn':'btn active'} onClick={()=>setDelivery(false)}>Самовывоз</button>
                                </div>

                                {
                                    (delivery)
                                    ? <fieldset>
                                        <legend>Адрес доставки</legend>

                                    </fieldset>
                                    : <fieldset>
                                        <legend>Адрес ресторана</legend>

                                    </fieldset>
                                }
                                
                            </Col>
                            <Col xs={12} lg={5} xxl={4}></Col>
                            <Col xs={12}>
                                <button type='button' className='btn-2 mt-5' disabled>Оформить заказ за 3 469 ₽</button>
                            </Col>
                        </Row>
                    </form>
                </section>
            </Container>
        </main>
    );
};

export default Checkout;