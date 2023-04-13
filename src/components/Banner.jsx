import React from 'react'
import {getImageURL} from '../helpers/image'

const Banner = (props) => {
    return (
        <div className="offer" onClick={props.onClick}>
            <img src={getImageURL(props.media, 'full', 'sale')} alt={props.title} />
        </div>
    )
}

export default Banner
