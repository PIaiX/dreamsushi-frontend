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
import {getAddressPickup} from './services/address'
import {getOptions} from './services/option'
import {checkAuth} from './services/RTK/auth'
import {getFavorites} from './services/RTK/favorite'
import {updateAddressesPickup} from './store/reducers/addressPickupSlice'
import {resetAddresses, updateAddresses} from './store/reducers/addressSlice'
import {setAuth, setUser} from './store/reducers/authSlice'
import {cartReset} from './store/reducers/cartSlice'
import {resetCheckout} from './store/reducers/checkoutSlice'
import {resetFavorite} from './store/reducers/favoriteSlice'
import {updateOptions} from './store/reducers/settingsSlice'

const App = () => {
    // return (
    //     <Info>
    //         В данный момент на сайте идут технические работы, вы можете оформить заказ в нашей группе вк{' '}
    //         <a href="https://vk.com/clubdreamsushi">https://vk.com/clubdreamsushi</a> или по телефону{' '}
    //         <a href="tel:+7(906)114-58-14">+7(906)114-58-14</a>
    //     </Info>
    // )
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    // initial auth check
    useLayoutEffect(() => {
        let version = localStorage.getItem('version')
        if (!version) {
            localStorage.setItem('version', process.env.REACT_APP_VERSION)
        } else if (version && version != process.env.REACT_APP_VERSION) {
            localStorage.setItem('version', process.env.REACT_APP_VERSION)
            dispatch(resetCheckout())
            dispatch(resetAddresses())
            dispatch(cartReset())
            dispatch(resetFavorite())

            return window.location.reload(true)
        }

        getOptions().then((res) => dispatch(updateOptions(res.options)))
        getAddressPickup().then((res) => res?.addresses && dispatch(updateAddressesPickup(res.addresses)))
        if (localStorage.getItem('accessToken')) {
            checkAuth()
                .then(({data}) => {
                    data.user && dispatch(setUser(data.user))
                    data.user && dispatch(setAuth(true))
                    data.addresses && dispatch(updateAddresses(data.addresses))
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
