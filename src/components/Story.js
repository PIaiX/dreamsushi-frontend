import React from 'react';

export default function Story(props) {
    return (
        <figure>
            <img src={props.imgLink} alt={props.title}/>
            <figcaption>
                <div className='main-color fw-7 text-end'>{props.label}</div>
                <div>
                    <div className='main-color fw-7'>{props.price} ₽</div>
                    <h4 className='mt-2'><a href='/' className='stretched-link'>{props.title}</a></h4>
                </div>
            </figcaption>
        </figure>
    );
}