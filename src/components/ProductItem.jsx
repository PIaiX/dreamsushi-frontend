import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import BtnFav from './utils/BtnFav'
import {getImageURL} from '../helpers/image'

const ProductItem = ({product = {}}) => {
    const [picked, setPicked] = useState(false)

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
                <button
                    type="button"
                    className={picked ? 'btn-2' : 'btn-1'}
                    onClick={() => setPicked(picked ? false : true)}
                >
                    {picked ? 'Выбрано' : 'Выбрать'}
                </button>
                <div className="flex-1 d-flex flex-sm-row-reverse align-items-center mb-3 mb-sm-0">
                    <div className="fw-6">{product?.weight} г</div>
                    <div className="price">
                        {product?.priceSale && <del>{product?.priceSale} ₽</del>}
                        <strong className="main-color">{product?.price} ₽</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
