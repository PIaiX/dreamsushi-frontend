import React from 'react'
import { Badge } from 'react-bootstrap'
import { IoChevronForwardOutline } from 'react-icons/io5'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink, Link} from 'react-router-dom'
import {logout} from '../services/RTK/auth'

const AccountMenu = () => {
    const user = useSelector(({auth: {user}}) => user)
    const dispatch = useDispatch()

    return (
        <nav className="account-nav mb-4">
            <ul>
                <li>
                    <NavLink to="/account" end>
                        <span>Личные данные</span>
                        <IoChevronForwardOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="orders">
                        <span>История заказов</span>
                        <IoChevronForwardOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="addresses">
                        <span>Адреса доставок</span>
                        <IoChevronForwardOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="notifications">
                        <span>Уведомления</span>
                        {user.notificationCount > 0 ? <Badge className='fs-07' bg="danger">{user.notificationCount}</Badge> :  <IoChevronForwardOutline />}
                    </NavLink>
                </li>
                {user?.role == 'admin' && (
                    <li>
                        <Link to="/admin">
                            <span>Панель администратора</span>
                            <IoChevronForwardOutline />
                        </Link>
                    </li>
                )}
                <li>
                    <button className="logout" type="button" onClick={() => dispatch(logout())}>
                        <span>Выход</span>
                        <IoChevronForwardOutline />
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default AccountMenu
