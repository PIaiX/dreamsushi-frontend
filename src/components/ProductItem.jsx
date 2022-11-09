import React, {useCallback, useMemo} from 'react'
import {Link} from 'react-router-dom'
import BtnFav from './utils/BtnFav'
import {getImageURL} from '../helpers/image'
import {useDispatch, useSelector} from 'react-redux'
import {createProduct, deleteProduct} from '../store/reducers/cartSlice'
// import {cartCreate, cartEdit} from '../services/cart'
import {dispatchAlert, dispatchApiErrorAlert} from '../helpers/alert'
import {apiResponseMessages} from '../config/api'
import {cartCreate, cartDelete} from '../services/RTK/cart'

const ProductItem = ({product = {}}) => {
    const dispatch = useDispatch()
    // const isAuth = useSelector((state) => state?.auth?.isAuth)
    // const userId = useSelector((state) => state?.auth?.user?.id)
    const cart = useSelector((state) => state?.cart?.items)
    const cartItem = useMemo(() => {
        return cart.find((item) => item?.id === product?.id)
    }, [cart, product])

    const onSelectProduct = useCallback(() => {
        if (cartItem) {
            dispatch(cartCreate({productId: product?.id}))
        } else {
            dispatch(cartDelete({productId: product?.id}))
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
                        {product?.priceSale && <del>{product?.priceSale} ₽</del>}
                        <strong className="main-color">{product?.price} ₽</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
