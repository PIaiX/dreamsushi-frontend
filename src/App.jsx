import React, {useEffect} from 'react'
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

const App = () => {
    const isLoadingRefresh = useSelector((state) => state?.auth?.isLoadingRefresh)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        } else {
            dispatch(setLoadingRefresh(false))
        }
    }, [])

    return !isLoadingRefresh ? <AppRouter /> : null
}
export default App
