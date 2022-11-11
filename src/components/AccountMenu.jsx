import React from 'react'
import {GrFormNext} from 'react-icons/gr'
import {useDispatch, useSelector} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../services/RTK/auth'
import {resetCart} from '../store/reducers/cartSlice'

const AccountMenu = () => {
    const user = useSelector(({auth: {user}}) => user)
    console.log(user)
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
                {user?.role == 'admin' && (
                    <li>
                        <Link to="/admin">
                            <span>Панель администратора</span>
                            <GrFormNext />
                        </Link>
                    </li>
                )}
                <li>
                    <Link
                        onClick={() => {
                            dispatch(logout())
                            dispatch(resetCart())
                        }}
                    >
                        <span>Выход</span>
                        <GrFormNext />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default AccountMenu
