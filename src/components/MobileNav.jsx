import React from 'react'
import {NavLink} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import {useSelector} from 'react-redux'
import {RxAvatar} from 'react-icons/rx'
import {IoHeartOutline} from 'react-icons/io5'
import {HiOutlineReceiptPercent, HiOutlineHome, HiShoppingCart} from 'react-icons/hi2'

const MobileNav = ({onClickAccount}) => {
    const cart = useSelector((state) => state?.cart)

    return (
        <nav className="mobile-nav">
            <Container className="h-100 d-lg-flex align-items-center">
                <ul className="list-unstyled">
                    <li>
                        <NavLink to="/" end>
                            <HiOutlineHome />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorites">
                            <IoHeartOutline />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sales">
                            <HiOutlineReceiptPercent />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart">
                            <HiShoppingCart />
                            {cart?.items?.length > 0 && (
                                <span className="cart-count-mobile">{cart.items.length}</span>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/account" onClick={onClickAccount}>
                            <RxAvatar />
                        </NavLink>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default MobileNav
