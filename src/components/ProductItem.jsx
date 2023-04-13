import React from 'react'
import {Link} from 'react-router-dom'
import BtnFav from './utils/BtnFav'
import {customPrice} from '../helpers/product'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import {BASE_URL} from '../config/api'
import ButtonCart from './utils/ButtonCart'

const ProductItem = ({product = {}}) => {
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
                <figcaption className="d-flex align-items-top justify-content-between">
                    <Link to={`/product/${product?.id}`} className="stretched-link pe-2 fs-09 fw-6">
                        {product?.title}
                    </Link>
                    <div className="fw-6">{product?.weight} г</div>
                </figcaption>
                <div className="fs-07 product-desc">{product?.description}</div>
                <BtnFav product={product} />
            </figure>
            <div className="info d-flex gap-2">
                <ButtonCart product={product} />
                <div className="flex-1 d-flex align-items-center mb-3 mb-sm-0">
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
