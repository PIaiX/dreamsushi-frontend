import React, {useCallback, useTransition} from 'react'
import {IoClose} from 'react-icons/io5'
import {TiMinus, TiPlus} from 'react-icons/ti'
import {getImageURL} from '../helpers/image'
import {useDispatch} from 'react-redux'
import Loader from './UI/Loader'
import {cartEdit} from '../services/RTK/cart'
import {dispatchAlert} from '../helpers/alert'
import {apiRejectMessages} from '../config/api'
import {customPrice} from '../helpers/product'
import {Link} from 'react-router-dom'

const CartItem = ({product = {}, onDeleteAction}) => {
    const dispatch = useDispatch()
    const count = product?.count || 0
    const productId = product?.id
    const [isPending, startTransition] = useTransition()

    const updateCart = useCallback(
        (mode = 'plus') => {
            startTransition(() => {
                const isCartDelete = count === 1 && mode === 'minus'

                if (isCartDelete) {
                    onDeleteAction(productId)
                } else {
                    dispatch(cartEdit({productId, count: mode === 'plus' ? count + 1 : count - 1}))
                }
            })
        },
        [count, onDeleteAction, productId]
    )

    const inputUpdateCart = useCallback(
        (newCount) => {
            startTransition(() => {
                const isCorrectValue = +newCount >= 1

                if (isCorrectValue) {
                    dispatch(cartEdit({productId, count: +newCount}))
                } else {
                    dispatch(cartEdit({productId, count: 1}))
                    dispatchAlert('danger', apiRejectMessages.CART_NOT_VALID_COUNT)
                }
            })
        },
        [productId]
    )

    return (
        <div className="cart-item">
            <div className="img">
                <Link to={`/product/${product?.id}`}>
                    <img src={getImageURL(product.images)} alt={product.title} />
                </Link>
            </div>
            <div className="text">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <Link to={`/product/${product?.id}`}>
                        <h5>{product.title}</h5>
                    </Link>
                    <button type="button" className="btn-del" onClick={() => onDeleteAction(productId)}>
                        <IoClose />
                    </button>
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
                <div className="input-box">
                    <button type="button" onClick={() => updateCart('minus')}>
                        <TiMinus />
                    </button>

                    <input type="number" value={count} onChange={(e) => inputUpdateCart(e.target.value)} />

                    <button type="button" onClick={() => updateCart()}>
                        <TiPlus />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
