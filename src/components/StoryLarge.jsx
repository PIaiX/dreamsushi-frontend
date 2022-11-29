import React from 'react'
import {Link} from 'react-router-dom'
import {getImageURL} from '../helpers/image'
import {customPrice} from '../helpers/product'

const StoryLarge = (props) => {
    return (
        <figure className="story-large" onClick={props.onClick}>
            <img src={getImageURL(props.images, 'full')} alt={props.title} />
            <figcaption>
                <div className="content">
                    <div className="info">
                        <div className="d-flex align-items-baseline mb-3">
                            <div className="main-color fs-16 fw-7">{customPrice(props.price)}</div>
                            {props.weight && <div className="ms-4 fs-12 fw-7">{props.weight} г</div>}
                        </div>
                        <h2 className="h1 fw-6 mt-lg-2">{props.title}</h2>
                    </div>

                    <div className="ingredients">
                        <p className="font-faded fs-09">{props.desc}</p>
                    </div>
                    {props.link && (
                        <div className="g-btn">
                            <Link to={props.link} className="btn-2">
                                Подробнее
                            </Link>
                        </div>
                    )}
                </div>
            </figcaption>
        </figure>
    )
}

export default StoryLarge
