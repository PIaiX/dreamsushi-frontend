import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillBagFill } from "react-icons/bs"

export default function BtnCart(props) {
    return (
        <Link to={props.link} className={'btn-cart '+props.className}>
            {
                (props.count===null || props.count===0 || props.count===undefined)
                ? <BsFillBagFill />
                : <div>{props.count}</div>
            }
            <span className='ms-2'>Корзина</span>
        </Link>
    );
}