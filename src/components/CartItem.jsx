import React from 'react'
import {IoClose} from 'react-icons/io5'
import {customPrice} from '../helpers/product'
import {Link} from 'react-router-dom'
import {BASE_URL} from '../config/api'
import ButtonCart from './utils/ButtonCart'

const CartItem = ({product = {}, onDeleteAction, checkout}) => {
    const image =
        product?.media && product.media[0]?.media?.mini
            ? BASE_URL + '/products' + product.media[0].media.mini
            : false
    return (
        <div className="cart-item">
            <div className="img">
                <Link to={`/product/${product?.id}`}>
                    <img src={image} alt={product.title} />
                </Link>
            </div>
            <div className="text">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <Link to={`/product/${product?.id}`}>
                        <h5>{product.title}</h5>
                    </Link>
                    {!checkout && (
                        <button type="button" className="btn-del" onClick={() => onDeleteAction(product)}>
                            <IoClose />
                        </button>
                    )}
                </div>
                <p className="font-faded fs-09">{product.description}</p>
            </div>
            <div className="controls">
                <span className="fw-6">{product.weight} г</span>
                <div className="fw-7">
                    <div className="d-flex d-sm-block">
                        <span className="main-color fs-11">{customPrice(product.price)}</span>
                        {product?.priceSale > 0 && (
                            <del className="font-faded ms-3">{customPrice(product.priceSale)}</del>
                        )}
                    </div>
                </div>
                {checkout ? <div>{product.count} шт</div> : <ButtonCart product={product} />}
            </div>
        </div>
    )
}

export default CartItem
