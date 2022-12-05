import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/mousewheel'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './assets/styles/style.css'
import Button from './components/UI/Button'
import CustomModal from './components/utils/CustomModal'
import useCartSync from './hooks/cartSync'
import useFavoritesSync from './hooks/favoritesSync'
import AppRouter from './routes/AppRouter'
import {checkAuth} from './services/RTK/auth'
import {setLoadingRefresh} from './store/reducers/authSlice'

const App = () => {
    const dispatch = useDispatch()

    // sync
    const {isShowCartSyncModal, onAgreeSync, onDeclineSync} = useCartSync()
    useFavoritesSync()

    // initial auth check
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        } else {
            dispatch(setLoadingRefresh(false))
        }
    }, [])

    return (
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
    )
}
export default App
