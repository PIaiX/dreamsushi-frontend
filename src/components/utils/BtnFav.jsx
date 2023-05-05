import React from 'react'
import {BsHeart, BsHeartFill} from 'react-icons/bs'
import {useDispatch, useSelector} from 'react-redux'
import {toggleFavorite} from '../../services/RTK/favorite'

const BtnFav = ({product}) => {
    const favorites = useSelector((state) => state?.favorite?.items.find((e) => product.id === e.id))
    const dispatch = useDispatch()

    const onPress = () => {
        if (favorites) {
            dispatch(toggleFavorite({product: {...product, favorites: false}}))
        } else {
            dispatch(toggleFavorite({product: {...product, favorites: true}}))
        }
    }
    return (
        <button type="button" className="btn-fav" onClick={() => onPress()}>
            <BsHeart className="icon-stroke" />
            <BsHeartFill className={favorites ? 'icon-fill opacity-1' : 'icon-fill opacity-0'} />
        </button>
    )
}

export default BtnFav
