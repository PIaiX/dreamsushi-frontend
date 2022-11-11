import React from 'react'
import {GrFormNext} from 'react-icons/gr'
import {useDispatch} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../services/RTK/auth'
import {resetCart} from '../store/reducers/cartSlice'
import {resetFavorite} from '../store/reducers/favoriteSlice'

const AccountMenu = () => {
    const dispatch = useDispatch()

    return (
        <nav className="account-nav mb-4">
            <ul>
                <li>
                    <NavLink to="/account" end>
                        <span>Личные данные</span>
                        <GrFormNext />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="orders">
                        <span>История заказов</span>
                        <GrFormNext />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="addresses">
                        <span>Адреса доставок</span>
                        <GrFormNext />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="notifications">
                        <span>Уведомления</span>
                        <GrFormNext />
                    </NavLink>
                </li>
                <li>
                    <button
                        className="logout"
                        type="button"
                        onClick={() => {
                            dispatch(logout())
                            dispatch(resetCart())
                            dispatch(resetFavorite())
                        }}
                    >
                        <span>Выход</span>
                        <GrFormNext />
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default AccountMenu
