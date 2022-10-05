import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import { Link } from "react-scroll";


export default function ProductsMenu(props) {
    return (
        <Swiper
            className='swiper-menu'
            modules={[Navigation, FreeMode]}
            spaceBetween={0}
            slidesPerView={'auto'}
            freeMode={{
                enabled: true,
                sticky: true,
            }}
            navigation
        >
            <SwiperSlide>
                <Link activeClass="active" to="categorie-1" spy={true} smooth={true} offset={-160} duration={500} >
                    Сеты
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link activeClass="active" to="categorie-2" spy={true} smooth={true} offset={-160} duration={500}>
                Холодные роллы
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link activeClass="active" to="categorie-3" spy={true} smooth={true} offset={-160} duration={500}>Запечённые роллы</Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link activeClass="active" to="categorie-4" spy={true} smooth={true} offset={-160} duration={500}>Горячие роллы</Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link activeClass="active" to="categorie-5" spy={true} smooth={true} offset={-160} duration={500}>Пицца</Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link activeClass="active" to="categorie-6" spy={true} smooth={true} offset={-160} duration={500}>Специальное предложение</Link>
            </SwiperSlide>
            <SwiperSlide>
                <Link activeClass="active" to="categorie-7" spy={true} smooth={true} offset={-160} duration={500}>Дополнительно</Link>
            </SwiperSlide>
        </Swiper>
    );
}