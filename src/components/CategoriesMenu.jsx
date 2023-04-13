import React, {useEffect, useRef, useState} from 'react'
import Container from 'react-bootstrap/Container'
import {HiShoppingCart} from 'react-icons/hi2'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import SwiperMenu from './SwiperMenu'
import BtnCart from './utils/BtnCart'

const CategoriesMenu = ({categories = []}) => {
    const [isShowMenu, setIsShowMenu] = useState(false)
    const cart = useSelector((state) => state?.cart?.items)
    const menuRef = useRef(null)

    useEffect(() => {
        function updateView() {
            const menuNode = menuRef.current

            if (menuNode) {
                const rect = menuNode.getBoundingClientRect()
                const offsetElem = rect.top + window.pageYOffset
                const scrollTop = window.pageYOffset

                if (scrollTop > offsetElem) {
                    setIsShowMenu(true)
                } else {
                    setIsShowMenu(false)
                }
            }
        }
        window.addEventListener('scroll', updateView)
        updateView()
        return () => window.removeEventListener('scroll', updateView)
    }, [])

    return (
        <>
            <div id="menu" ref={menuRef}>
                <SwiperMenu categories={categories} />
            </div>

            <header className={isShowMenu ? 'h-fixed show' : 'h-fixed'}>
                <Container className="h-100 d-flex align-items-center">
                    <SwiperMenu categories={categories} />
                    <Link to="/cart" className="d-none d-lg-flex d-ms-4 align-items-center">
                        <HiShoppingCart className="main-color fs-20 " />
                        {cart?.length > 0 && <span className="cart-count">{cart.length}</span>}
                    </Link>
                </Container>
            </header>
        </>
    )
}

export default CategoriesMenu
