import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

export default function ProductsMenu(props) {
    return (
        <Swiper
            className='swiper-menu'
            modules={[Navigation, FreeMode]}
            spaceBetween={10}
            slidesPerView={'auto'}
            freeMode={{
                enabled: true,
                sticky: true,
            }}
            navigation
        >
            <SwiperSlide>
                <button className='active'>Сеты</button>
            </SwiperSlide>
            <SwiperSlide>
                <button>Холодные роллы</button>
            </SwiperSlide>
            <SwiperSlide>
                <button>Запечённые роллы</button>
            </SwiperSlide>
            <SwiperSlide>
                <button>Горячие роллы</button>
            </SwiperSlide>
            <SwiperSlide>
                <button>Пицца</button>
            </SwiperSlide>
            <SwiperSlide>
                <button>Специальное предложение</button>
            </SwiperSlide>
            <SwiperSlide>
                <button>Дополнительно</button>
            </SwiperSlide>
            <SwiperSlide>
                <button>Сеты</button>
            </SwiperSlide>
            <SwiperSlide>
                <button>Холодные роллы</button>
            </SwiperSlide>
            <SwiperSlide>
                <button>Запечённые роллы</button>
            </SwiperSlide>
            <SwiperSlide>
                <button>Горячие роллы</button>
            </SwiperSlide>
            <SwiperSlide>
                <button>Пицца</button>
            </SwiperSlide>
            <SwiperSlide>
                <button>Специальное предложение</button>
            </SwiperSlide>
            <SwiperSlide>
                <button>Дополнительно</button>
            </SwiperSlide>
        </Swiper>
    );
}