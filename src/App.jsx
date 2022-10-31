import React, {useEffect} from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import 'swiper/css/mousewheel'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/style.css'
import AppRouter from './routes/AppRouter'
import {useDispatch} from 'react-redux'
import {checkAuth} from './store/reducers/authSlice'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])

    return <AppRouter />
}
export default App
