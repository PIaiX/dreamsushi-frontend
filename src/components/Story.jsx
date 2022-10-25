import React from 'react'

const Story = (props) => {
    return (
        <figure className="story" onClick={props.onClick}>
            <img src={props.imgLink} alt={props.title} />
            <figcaption>
                <div className="d-none d-lg-block main-color fw-7 text-end">{props.label}</div>
                <div>
                    <div className="d-none d-lg-block main-color fw-7">{props.price} ₽</div>
                    <h3 className="mt-lg-2">{props.title}</h3>
                </div>
            </figcaption>
        </figure>
    )
}

export default Story
