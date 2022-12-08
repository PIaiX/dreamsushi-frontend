import React from 'react'
import {Link} from 'react-router-dom'
import {getImageURL} from '../helpers/image'
import {customPrice} from '../helpers/product'

const OrderProductItem = (props) => {
    return (
        <div className="product-cart">
            <div className="d-flex align-items-start">
                <Link to={`/product/${props?.id}`}>
                    <img src={getImageURL(props.images)} alt={props.title} />
                </Link>
                <div className="flex-1 ms-3 ms-xl-4">
                    <Link to={`/product/${props?.id}`}>
                        <h5 className="mb-2 fs-09">{props.title}</h5>
                        <p className="font-faded fs-07">{props.description}</p>
                    </Link>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-end ms-sm-4 ms-xl-5 mt-3 mt-sm-0 pe-3">
                <div className="fs-08">{props.count === 0 ? 1 : props.count}&nbsp;шт</div>
                <div className="ms-4 ms-xl-5 fw-7">
                    <span className="main-color fs-08">{customPrice(props.price)}</span>
                </div>
            </div>
        </div>
    )
}

export default OrderProductItem
