import React from 'react'
import {IoClose} from 'react-icons/io5'
import {TiPlus, TiMinus} from 'react-icons/ti'

const CartItem = (props) => {
    const price = props.price
    const discount = props.discount

    return (
        <div className="cart-item">
            <div className="img">
                <img src={props.imgLink} alt={props.title} />
            </div>
            <div className="text">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5>{props.title}</h5>
                    <button type="button" className="btn-del">
                        <IoClose />
                    </button>
                </div>
                <p className="font-faded fs-09">{props.ingredients}</p>
            </div>
            <div className="controls">
                <span className="fw-6">{props.weight}&nbsp;г</span>
                <div className="fw-7">
                    {discount ? (
                        <>
                            <span className="main-color fs-11">{price * (1 - discount)}&nbsp;₽</span>
                            <del className="font-faded ms-3">{price}&nbsp;₽</del>
                        </>
                    ) : (
                        <span className="main-color fs-11">{price}&nbsp;₽</span>
                    )}
                </div>
                <div className="input-box">
                    <button type="button">
                        <TiMinus />
                    </button>
                    <input type="number" placeholder="1" />
                    <button type="button">
                        <TiPlus />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
