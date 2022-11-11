import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {favoritesSync, getFavorites} from '../services/RTK/favorite'

const useFavoritesSync = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const isSync = useSelector((state) => state?.favorite?.isSync)
    const favorites = useSelector((state) => state?.favorite?.items)

    useEffect(() => {
        if (isAuth && !isSync) {
            favorites?.length ? dispatch(favoritesSync({products: favorites})) : dispatch(getFavorites())
        }
    }, [isAuth])
}

export default useFavoritesSync
