import React, {useCallback, useMemo} from 'react'
import {Link} from 'react-router-dom'
import BtnFav from './utils/BtnFav'
import {useDispatch, useSelector} from 'react-redux'
import {toggleFavorite} from '../services/RTK/favorite'
import {customPrice} from '../helpers/product'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import {BASE_URL} from '../config/api'
import ButtonCart from './utils/ButtonCart'

const ProductItem = ({product = {}}) => {
    const dispatch = useDispatch()
    const price =
        product?.productParams?.length && Array.isArray(product.productParams)
            ? product.productParams.sort((a, b) => a.price - b.price)[0].price
            : product.price

    const image =
        product?.media && product.media[0]?.media?.mini
            ? BASE_URL + '/products' + product.media[0].media.mini
            : false

    return (
        <div className="product-item">
            <figure>
                <div className="img">
                    <LazyLoadImage src={image} alt={product?.title} />
                </div>
                <figcaption>
                    <Link to={`/product/${product?.id}`} className="stretched-link">
                        {product?.title}
                    </Link>
                </figcaption>
                <BtnFav product={product} />
            </figure>
            <div className="info">
                <ButtonCart product={product} />
                <div className="flex-1 d-flex flex-sm-row-reverse align-items-center mb-3 mb-sm-0">
                    <div className="fw-6">{product?.weight} г</div>
                    <div className="price">
                        <div className="d-flex d-sm-block">
                            <div className="main-color fs-11">{customPrice(price)}</div>
                            {product?.priceSale > 0 && (
                                <del className="font-faded ms-3 ms-sm-0">{customPrice(product.priceSale)}</del>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
