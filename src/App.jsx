import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useLayoutEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/mousewheel'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './assets/styles/style.css'
import Loader from './components/UI/Loader'
import AppRouter from './routes/AppRouter'
import {checkAuth} from './services/RTK/auth'
import {getFavorites} from './services/RTK/favorite'
import {updateAddressesPickup} from './store/reducers/addressPickupSlice'
import {updateAddresses} from './store/reducers/addressSlice'
import {setAuth, setUser} from './store/reducers/authSlice'

const App = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    // initial auth check
    useLayoutEffect(() => {
        if (localStorage.getItem('accessToken')) {
            checkAuth()
                .then(({data}) => {
                    data.user && dispatch(setUser(data.user))
                    data.user && dispatch(setAuth(true))
                    data.addresses && dispatch(updateAddresses(data.addresses))
                    data.addressesPickup && dispatch(updateAddressesPickup(data.addressesPickup))
                    dispatch(getFavorites())
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [])

    if (loading) {
        return <Loader full />
    }

    return <AppRouter />
}
export default App
