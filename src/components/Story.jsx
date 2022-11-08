import React from 'react'
import {getImageURL} from '../helpers/image'
import {customPrice} from '../helpers/product'

const Story = (props) => {
    return (
        <figure className="story" onClick={props.onClick}>
            <img src={getImageURL(props.image)} alt={props.title} />
            <figcaption>
                <div className="d-none d-lg-block main-color fw-7 text-end">{props.desc}</div>
                <div>
                    <div className="d-none d-lg-block main-color fw-7">{customPrice(props.price)}</div>
                    <h3 className="mt-lg-2">{props.title}</h3>
                </div>
            </figcaption>
        </figure>
    )
}

export default Story
