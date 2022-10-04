import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'

import BtnCart from './utils/BtnCart'
import { BsHeartFill, BsFillRecordFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { IoSearch, IoMenuOutline } from "react-icons/io5"
import ProductsMenu from './ProductsMenu'

export default function Header() {
    const [menuVisible, setMenuVisible] = useState(false)
    useEffect(() => {
        function updateView() {
            let box = document.getElementById('menu').getBoundingClientRect()
            let offsetElem=box.top + window.pageYOffset
            let scrollTop = window.pageYOffset
            if (scrollTop > offsetElem) {
                setMenuVisible(true)
            } else {
                setMenuVisible(false)
            }
        }

        window.addEventListener('scroll', updateView);
        updateView();
        return () => window.removeEventListener('scroll', updateView);
    }, [])

    return (
        <>
            <header>
                <Container className='h-100'>
                    <button type='button' className='d-block d-lg-none fs-20'><IoMenuOutline/></button>

                    <div className='fs-12 fw-7 main-color'>DreamSushi</div>

                    <nav className='d-none d-lg-block'>
                        <ul>
                            <li>Доставка и оплата</li>
                            <li>О нас</li>
                        </ul>
                    </nav>

                    <a href='tel:+79061145814' className='d-none d-lg-flex align-items-center'>
                        <BsFillRecordFill className='main-color fs-08'/>
                        <span className='ms-2'>+7 906 114-58-14</span>
                    </a>

                    <button type='button' className='fs-15'>
                        <IoSearch/>
                    </button>

                    <a className='d-none d-lg-flex align-items-center'>
                        <FaUser className='light-gray fs-12 '/>
                        <span className='d-none d-xl-inline ms-2'>Войти</span>
                    </a>

                    <a href='/' className='fav d-none d-lg-block'>
                        <BsHeartFill/>
                        <span>2</span>
                    </a>

                    <BtnCart className='d-none d-lg-flex' count={'6'} />
                </Container>
            </header>

            <header className={(menuVisible)?'h-fixed show':'h-fixed'}>
                <Container className='h-100 d-flex align-items-center'>
                    <ProductsMenu />
                    <BtnCart count={'6'} className='ms-4'/>
                </Container>
            </header>
        </>
    );
}