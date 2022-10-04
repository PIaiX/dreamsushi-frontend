import React, {useState} from 'react';

export default function ProductCard(props) {
    const [picked, setPicked] = useState(false)

    return (
        <div className='product-card'>
            <figure>
                <img src={props.imgLink} alt={props.title}/>
                <figcaption>{props.title}</figcaption>
            </figure>
            <div className='info'>
                <button type='button' className={(picked)?'btn-1 active':'btn-1'} onClick={() => setPicked(true)}>
                    {
                        (picked)
                        ? 'Выбрано'
                        : 'Выбрать'
                    }
                </button>
                <div className='d-flex align-items-center'>
                    {
                        (props.oldPrice) &&
                        <del className='fs-08 light-gray fw-6 me-3'>{props.oldPrice} ₽</del>
                    }
                    <strong className='main-color'>{props.price} ₽</strong>
                </div>
                <div className='fw-6'>{props.weight} г</div>
            </div>
        </div>
    );
}