import {useCallback, useEffect, useState} from 'react'
import {cartSync, getCart} from '../services/RTK/cart'
import {setSync} from '../store/reducers/cartSlice'
import {useDispatch, useSelector} from 'react-redux'

const useCartSync = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const isSync = useSelector((state) => state?.cart?.isSync)
    const cart = useSelector((state) => state?.cart?.items) || []
    const [isShowCartSyncModal, setIsShowCartSyncModal] = useState(false)

    const onAgreeSync = useCallback(() => {
        dispatch(cartSync({products: cart}))
        setIsShowCartSyncModal(false)
    }, [cart])

    const onDeclineSync = useCallback(() => {
        dispatch(setSync())
        dispatch(getCart())
        setIsShowCartSyncModal(false)
    }, [])

    useEffect(() => {
        if (isAuth && !isSync) {
            cart?.length ? setIsShowCartSyncModal(true) : dispatch(getCart())
        }
    }, [isAuth, isSync])

    return {isShowCartSyncModal, onAgreeSync, onDeclineSync}
}

export default useCartSync
