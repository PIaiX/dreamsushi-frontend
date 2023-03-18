import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useLayoutEffect} from 'react'
import {useDispatch} from 'react-redux'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/mousewheel'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './assets/styles/style.css'
import AppRouter from './routes/AppRouter'
import {checkAuth} from './services/RTK/auth'

const App = () => {
    const dispatch = useDispatch()

    // initial auth check
    useLayoutEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])

    return <AppRouter />
}
export default App
