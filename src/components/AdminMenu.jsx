import React, {useState} from 'react'
import {
    IoChevronForwardOutline,
    IoCubeOutline,
    IoFlashOutline,
    IoHomeOutline,
    IoLayersOutline,
    IoLogOutOutline,
    IoMailOutline,
    IoNotificationsOutline,
    IoPeopleOutline,
    IoPricetagsOutline,
    IoReceiptOutline,
} from 'react-icons/io5'
import {useDispatch} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../services/RTK/auth'
import {resetCart} from '../store/reducers/cartSlice'
import Button from './UI/Button'
import CustomModal from './utils/CustomModal'

const AdminMenu = () => {
    const dispatch = useDispatch()
    const [isShowLogout, setIsShowLogout] = useState(false)
    return (
        <nav className="account-nav mb-4">
            <ul>
                <li>
                    <NavLink to="/admin" end>
                        <span className="d-flex flex-row align-items-center">
                            <IoHomeOutline className="d-inline me-3" size={24} /> Главная
                        </span>
                        <IoChevronForwardOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="orders">
                        <span className="d-flex flex-row align-items-center">
                            <IoReceiptOutline className="d-inline me-3" size={24} /> Заказы
                        </span>
                        <IoChevronForwardOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="categories">
                        <span className="d-flex flex-row align-items-center">
                            <IoLayersOutline className="d-inline me-3" size={24} /> Категории
                        </span>
                        <IoChevronForwardOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="products">
                        <span className="d-flex flex-row align-items-center">
                            <IoCubeOutline className="d-inline me-3" size={24} /> Товары
                        </span>
                        <IoChevronForwardOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="notifications">
                        <span className="d-flex flex-row align-items-center">
                            <IoNotificationsOutline className="d-inline me-3" size={24} /> Уведомления
                        </span>
                        <IoChevronForwardOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="users">
                        <span className="d-flex flex-row align-items-center">
                            <IoPeopleOutline className="d-inline me-3" size={24} /> Клиенты
                        </span>
                        <IoChevronForwardOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="sales">
                        <span className="d-flex flex-row align-items-center">
                            <IoFlashOutline className="d-inline me-3" size={24} /> Акции
                        </span>
                        <IoChevronForwardOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="marks">
                        <span className="d-flex flex-row align-items-center">
                            <IoPricetagsOutline className="d-inline me-3" size={24} /> Метки клиентов
                        </span>
                        <IoChevronForwardOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="complaints">
                        <span className="d-flex flex-row align-items-center">
                            <IoMailOutline className="d-inline me-3" size={24} /> Жалобы
                        </span>
                        <IoChevronForwardOutline />
                    </NavLink>
                </li>
                <li>
                    <Link onClick={() => setIsShowLogout(!isShowLogout)}>
                        <span className="d-flex flex-row align-items-center">
                            <IoLogOutOutline className="d-inline me-3" size={24} /> Выход
                        </span>
                    </Link>
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
                            <Button
                                type="button"
                                className="btn-2"
                                onClick={() => {
                                    dispatch(logout())
                                    dispatch(resetCart())
                                }}
                            >
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

export default AdminMenu
