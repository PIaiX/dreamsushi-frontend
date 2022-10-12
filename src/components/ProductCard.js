import React, {useState} from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard(props) {
    const [picked, setPicked] = useState(false)

    return (
        <div className='product-card'>
            <figure>
                <img src={props.imgLink} alt={props.title}/>
                <figcaption><Link to='product' className='stretched-link'>{props.title}</Link></figcaption>
            </figure>
            <div className='info'>
                <button type='button' className={(picked)?'btn-1 active':'btn-1'} onClick={() => setPicked(true)}>
                    {
                        (picked)
                        ? 'Выбрано'
                        : 'Выбрать'
                    }
                </button>
                <div className='flex-1 d-flex flex-sm-row-reverse align-items-center mb-3 mb-sm-0'>
                    <div className='fw-6'>{props.weight} г</div>
                    <div className='price'>
                        {
                            (props.oldPrice) &&
                            <del>{props.oldPrice} ₽</del>
                        }
                        <strong className='main-color'>{props.price} ₽</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}