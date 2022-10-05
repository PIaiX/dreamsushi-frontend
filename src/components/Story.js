import React from 'react';

export default function Story(props) {
    return (
        <>
            <figure>
                <img src={props.imgLink} alt={props.title}/>
                <figcaption>
                    <div className='d-none d-lg-block main-color fw-7 text-end'>{props.label}</div>
                    <div>
                        <div className='d-none d-lg-block main-color fw-7'>{props.price} ₽</div>
                        <h4 className='mt-lg-2'><a href='/' className='stretched-link'>{props.title}</a></h4>
                    </div>
                </figcaption>
            </figure>
        </>
    );
}