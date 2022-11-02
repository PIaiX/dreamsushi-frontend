import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {GrFormNext} from 'react-icons/gr'

const AccountMenu = () => {
    return (
        <nav className="account-nav">
            <ul>
                <li>
                    <NavLink to="/account" end>
                        <span>Личные данные</span>
                        <GrFormNext />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="order">
                        <span>История заказов</span>
                        <GrFormNext />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="address">
                        <span>Адреса доставок</span>
                        <GrFormNext />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="notification">
                        <span>Уведомления</span>
                        <GrFormNext />
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default AccountMenu
