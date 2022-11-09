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
import {cartSync} from './services/cart'
import {dispatchAlert, dispatchApiErrorAlert} from './helpers/alert'
import {apiResponseMessages} from './config/api'
import {resetCart} from './store/reducers/cartSlice'
import {getCart} from './services/RTK/cart'

const App = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const isLoadingRefresh = useSelector((state) => state?.auth?.isLoadingRefresh)
    const reduxCart = useSelector((state) => state?.cart?.items)
    const lsCart = JSON.parse(localStorage.getItem('cart')) || []
    const [isShowCartSyncModal, setIsShowCartSyncModal] = useState(false)

    const onAgreeSync = useCallback(() => {
        cartSync({products: reduxCart})
            .then(() => {
                dispatchAlert('success', apiResponseMessages.CART_EDIT)
                dispatch(resetCart())
            })
            .catch(() => dispatchApiErrorAlert())

        setIsShowCartSyncModal(false)
    }, [reduxCart])

    const onDeclineSync = useCallback(() => {
        dispatch(resetCart())
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
        if (isAuth) {
            dispatch(getCart())
            lsCart?.length && setIsShowCartSyncModal(true)
        }
    }, [isAuth])

    return !isLoadingRefresh ? (
        <>
            <AppRouter />

            <CustomModal
                title="Внимание"
                isShow={isShowCartSyncModal}
                setIsShow={setIsShowCartSyncModal}
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
