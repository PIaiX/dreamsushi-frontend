import React from 'react'
import {BsHeart, BsHeartFill} from 'react-icons/bs'

const BtnFav = ({isFav, toggleFav}) => {
    return (
        <button type="button" className="btn-fav" onClick={() => toggleFav()}>
            <BsHeart className="icon-stroke" />
            <BsHeartFill className={isFav ? 'icon-fill opacity-1' : 'icon-fill opacity-0'} />
        </button>
    )
}

export default BtnFav
