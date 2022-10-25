import React, {useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, FreeMode, Mousewheel} from 'swiper'
import {Link} from 'react-scroll'

const SwiperMenu = () => {
    const Arr = [
        {text: 'Сеты', to: 'categorie-1'},
        {text: 'Холодные роллы', to: 'categorie-2'},
        {text: 'Запечённые роллы', to: 'categorie-3'},
        {text: 'Горячие роллы', to: 'categorie-4'},
        {text: 'Пицца', to: 'categorie-5'},
        {text: 'Специальное предложение', to: 'categorie-6'},
        {text: 'Дополнительно', to: 'categorie-7'},
    ]
    const offsetT = -160

    const [menuSwiper, setMenuSwiper] = useState(null)
    const updateSlider = (i) => {
        if (menuSwiper) {
            menuSwiper.slideTo(i)
        }
    }

    return (
        <Swiper
            className="swiper-menu"
            loop={true}
            modules={[Navigation, FreeMode, Mousewheel]}
            spaceBetween={0}
            slidesPerView={'auto'}
            freeMode={{
                enabled: true,
                sticky: true,
            }}
            mousewheel={true}
            navigation
            onSwiper={setMenuSwiper}
        >
            {Arr.map((obj, index) => {
                return (
                    <SwiperSlide key={obj.to}>
                        <Link
                            activeClass="active"
                            to={obj.to}
                            spy={true}
                            smooth={true}
                            offset={offsetT}
                            duration={500}
                            onSetActive={() => updateSlider(index)}
                        >
                            {obj.text}
                        </Link>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

export default SwiperMenu
