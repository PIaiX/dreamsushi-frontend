import React, {useCallback, useMemo} from 'react'
import {Link} from 'react-router-dom'
import BtnFav from './utils/BtnFav'
import {getImageURL} from '../helpers/image'
import {useDispatch, useSelector} from 'react-redux'
import {cartCreate, cartDelete} from '../services/RTK/cart'

const ProductItem = ({product = {}}) => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state?.cart?.items)
    const cartItem = useMemo(() => {
        return cart?.length && cart.find((item) => item?.id === product?.id)
    }, [cart, product])

    const onSelectProduct = useCallback(() => {
        if (cartItem) {
            dispatch(cartDelete({productId: product?.id}))
        } else {
            dispatch(cartCreate({product}))
        }
    }, [cartItem, dispatch, product?.id])

    return (
        <div className="product-item">
            <figure>
                <img src={getImageURL(product?.images)} alt={product?.title} />
                <figcaption>
                    <Link to={`/product/${product?.id}`} className="stretched-link">
                        {product?.title}
                    </Link>
                </figcaption>
                <BtnFav favState={product?.fav} />
            </figure>
            <div className="info">
                <button type="button" className={cartItem ? 'btn-2' : 'btn-1'} onClick={onSelectProduct}>
                    {cartItem ? 'Выбрано' : 'Выбрать'}
                </button>
                <div className="flex-1 d-flex flex-sm-row-reverse align-items-center mb-3 mb-sm-0">
                    <div className="fw-6">{product?.weight} г</div>
                    <div className="price">
                        {product?.price ? (
                            <div className="d-flex d-sm-block">
                                <div className="main-color fs-11">{product?.price}&nbsp;₽</div>
                                <del className="font-faded ms-3 ms-sm-0">{product?.priceSale}&nbsp;₽</del>
                            </div>
                        ) : (
                            <span className="main-color fs-11">{product?.priceSale}&nbsp;₽</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
