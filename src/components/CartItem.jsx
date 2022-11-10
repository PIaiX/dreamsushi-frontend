import React, {useCallback, useTransition} from 'react'
import {IoClose} from 'react-icons/io5'
import {TiMinus, TiPlus} from 'react-icons/ti'
import {getImageURL} from '../helpers/image'
import {useDispatch} from 'react-redux'
import Loader from './UI/Loader'
import {cartEdit} from '../services/RTK/cart'

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
                    dispatch(
                        cartEdit({
                            productId,
                            count: mode === 'plus' ? count + 1 : count - 1,
                        })
                    )
                }
            })
        },
        [count, onDeleteAction, productId]
    )

    return (
        <div className="cart-item">
            <div className="img">
                <img src={getImageURL(product.images)} alt={product.title} />
            </div>
            <div className="text">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5>{product.title}</h5>
                    <button type="button" className="btn-del" onClick={() => onDeleteAction(productId)}>
                        <IoClose />
                    </button>
                </div>
                <p className="font-faded fs-09">{product.description}</p>
            </div>
            <div className="controls">
                <span className="fw-6">{product.weight}&nbsp;г</span>
                <div className="fw-7">
                    {product.price ? (
                        <>
                            <span className="main-color fs-11">{product.price}&nbsp;₽</span>
                            <del className="font-faded ms-3">{product.priceSale}&nbsp;₽</del>
                        </>
                    ) : (
                        <span className="main-color fs-11">{product.priceSale}&nbsp;₽</span>
                    )}
                </div>
                <div className="input-box">
                    <button type="button" onClick={() => updateCart('minus')}>
                        <TiMinus />
                    </button>
                    {isPending ? (
                        <span className="d-flex justify-content-center align-items-center">
                            <Loader size={30} />
                        </span>
                    ) : (
                        <input type="number" placeholder={count} />
                    )}
                    <button type="button" onClick={() => updateCart()}>
                        <TiPlus />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
