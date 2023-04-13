import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useGetSalesQuery} from '../services/RTK/home'
import {getImageURL} from '../helpers/image'

const Sales = () => {
    const sales = useGetSalesQuery()

    return (
        <main>
            <Container>
                <Row className="justify-content-center">
                    <Col md={9}>
                        <h1 className="text-center">Акции</h1>
                        <ul className="list-unstyled">
                            {!sales?.data?.error &&
                                sales?.data?.sales?.length > 0 &&
                                sales.data.sales.map((item) => (
                                    <li className="mb-4 mb-md-5" key={'sales-banner-' + item.id}>
                                        <h2>{item.title}</h2>
                                        <div className="offer" onClick={item.onClick}>
                                            <img
                                                src={getImageURL(item.media, 'full', 'sale')}
                                                alt={item.title}
                                                className="h-auto"
                                            />
                                        </div>
                                        <h3 className="mt-2">{item.desc}</h3>
                                    </li>
                                ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default Sales
