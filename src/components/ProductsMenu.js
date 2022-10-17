import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import SwiperMenu from './SwiperMenu';
import BtnCart from './utils/BtnCart'

export default function ProductsMenu(props) {
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
            <div id='menu'>
                <SwiperMenu />
            </div>
            
            <header className={(menuVisible)?'h-fixed show':'h-fixed'}>
                <Container className='h-100 d-flex align-items-center'>
                    <SwiperMenu />
                    <BtnCart link='/cart' count={0} className='d-none d-lg-flex d-ms-4'/>
                </Container>
            </header>
        </>
    );
}