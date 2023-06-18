import React, {useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {FreeMode, Mousewheel, Navigation} from 'swiper'
import {Link} from 'react-scroll'

const SwiperMenu = ({categories = []}) => {
    const [menuSwiper, setMenuSwiper] = useState(null)

    const swiperItems = categories.map((item, index) => ({
        text: item.title,
        to: `categorie-${index}`,
    }))

    const offsetT = -160

    const updateSlider = (i) => {
        if (menuSwiper) {
            menuSwiper.slideTo(i)
        }
    }

    return (
        <Swiper
            className="swiper-menu"
            loop={false}
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
            {swiperItems.map((item, index) => {
                return (
                    <SwiperSlide key={item.to}>
                        <Link
                            activeClass="active"
                            to={item.to}
                            spy={true}
                            smooth={true}
                            offset={offsetT}
                            duration={500}
                            onSetActive={() => updateSlider(index)}
                        >
                            {item.text}
                        </Link>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

export default SwiperMenu
