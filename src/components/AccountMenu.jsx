import React, {useState} from 'react'
import {Badge} from 'react-bootstrap'
import {IoChevronForwardOutline} from 'react-icons/io5'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink, Link} from 'react-router-dom'
import {logout} from '../services/RTK/auth'
import Button from './UI/Button'
import CustomModal from './utils/CustomModal'

const AccountMenu = () => {
    const user = useSelector(({auth: {user}}) => user)
    const dispatch = useDispatch()
    const [isShowLogout, setIsShowLogout] = useState(false)
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
                        {user.notificationCount > 0 ? (
                            <Badge className="fs-07" bg="danger">
                                {user.notificationCount}
                            </Badge>
                        ) : (
                            <IoChevronForwardOutline />
                        )}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="complaints">
                        <span>Предложения и жалобы</span>
                        <IoChevronForwardOutline />
                    </NavLink>
                </li>
                {user?.role == 'admin' && (
                    <li>
                        <Link to="/admin" className="active">
                            <span>Панель администратора</span>
                            <IoChevronForwardOutline />
                        </Link>
                    </li>
                )}
                <li>
                    <button className="logout" type="button" onClick={() => setIsShowLogout(!isShowLogout)}>
                        <span>Выход из профиля</span>
                    </button>
                </li>
                <CustomModal
                    isShow={isShowLogout}
                    setIsShow={setIsShowLogout}
                    title="Подтвердите действие"
                    footer={
                        <>
                            <Button type="button" className="btn-1" onClick={() => setIsShowLogout(!isShowLogout)}>
                                Отмена
                            </Button>
                            <Button type="button" className="btn-2" onClick={() => dispatch(logout())}>
                                Выйти
                            </Button>
                        </>
                    }
                >
                    Вы точно хотите выйти?
                </CustomModal>
            </ul>
        </nav>
    )
}

export default AccountMenu
