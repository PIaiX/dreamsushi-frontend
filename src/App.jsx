import React, {useCallback, useEffect, useState} from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import 'swiper/css/mousewheel'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.css'
import AppRouter from './routes/AppRouter'
import {useDispatch, useSelector} from 'react-redux'
import {setLoadingRefresh} from './store/reducers/authSlice'
import {checkAuth} from './services/RTK/auth'
import Button from './components/UI/Button'
import CustomModal from './components/utils/CustomModal'
import {cartSync, getCart} from './services/RTK/cart'
import {setSync} from './store/reducers/cartSlice'

const App = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const isSync = useSelector((state) => state?.cart?.isSync)
    const isLoadingRefresh = useSelector((state) => state?.auth?.isLoadingRefresh)
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
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        } else {
            dispatch(setLoadingRefresh(false))
        }
    }, [])

    useEffect(() => {
        if (isAuth && !isSync) {
            cart?.length ? setIsShowCartSyncModal(true) : dispatch(getCart())
        }
    }, [isAuth, isSync])

    return !isLoadingRefresh ? (
        <>
            <AppRouter />

            <CustomModal
                title="Внимание"
                isShow={isShowCartSyncModal}
                setIsShow={() => onDeclineSync()}
                footer={
                    <>
                        <Button className="btn-1 me-3" onClick={() => onDeclineSync()}>
                            Нет
                        </Button>
                        <Button className="btn-2" onClick={() => onAgreeSync()}>
                            Да
                        </Button>
                    </>
                }
            >
                У вас имеются товары не добавленные в корзину. Вы хотите добавить их?
            </CustomModal>
        </>
    ) : null
}
export default App
