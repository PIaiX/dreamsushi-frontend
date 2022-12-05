import React from 'react'
import {NavLink} from 'react-router-dom'
import {MdHomeFilled, MdMenuBook} from 'react-icons/md'
import {HiShoppingCart, HiUserCircle} from 'react-icons/hi'
import Container from 'react-bootstrap/Container'
import {useSelector} from 'react-redux'

const MobileNav = ({onClickAccount}) => {
    const cart = useSelector((state) => state?.cart)

    return (
        <nav className="mobile-nav">
            <Container className="h-100 d-lg-flex align-items-center">
                <ul className="list-unstyled">
                    <li>
                        <NavLink to="/" end>
                            <MdHomeFilled />
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
                        <NavLink to="/delivery">
                            <MdMenuBook />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/account" onClick={onClickAccount}>
                            <HiUserCircle />
                        </NavLink>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default MobileNav
