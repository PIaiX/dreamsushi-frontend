import React from 'react'

const ProductCart = (props) => {
    const price = props.price
    const discount = props.discount
    return (
        <div className="product-cart">
            <div className="d-flex align-items-start">
                <img src={props.imgLink} alt={props.title} />
                <div className="flex-1 ms-3 ms-xl-4">
                    <h5 className="mb-2">{props.title}</h5>
                    <p className="font-faded fs-09">{props.ingredients}</p>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-end ms-sm-4 ms-xl-5 mt-3 mt-sm-0">
                <div>{props.count}&nbsp;шт</div>
                <div className="ms-4 ms-xl-5 fw-7">
                    {discount ? (
                        <div className="d-flex d-sm-block">
                            <div className="main-color fs-11">{price * (1 - discount)}&nbsp;₽</div>
                            <del className="font-faded ms-3 ms-sm-0">{price}&nbsp;₽</del>
                        </div>
                    ) : (
                        <span className="main-color fs-11">{price}&nbsp;₽</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCart
