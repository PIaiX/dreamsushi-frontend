import React from 'react'
import {BASE_URL} from '../config/api'
import {customPrice} from '../helpers/product'

const Story = (props) => {
    const image = props?.media[0]?.media?.full ? BASE_URL + '/sale' + props.media[0].media.full : false

    return (
        <figure className="story" onClick={props.onClick}>
            <img src={image} alt={props.title} />
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
