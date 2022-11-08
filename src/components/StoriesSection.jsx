import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import {Swiper, SwiperSlide} from 'swiper/react'
import {FreeMode, Navigation, Pagination} from 'swiper'
import Story from './Story'
import StoryLarge from './StoryLarge'
import {IoClose} from 'react-icons/io5'

const StoriesSection = ({sales = []}) => {
    const [activeSlide, setActiveSlide] = useState(0)
    const [story, setStory] = useState(false)

    const closeStory = () => setStory(false)
    const showStory = (index) => {
        setStory(true)
        setActiveSlide(index)
    }

    return (
        <>
            <Swiper
                className="swiper-stories mb-6"
                modules={[Navigation, FreeMode]}
                spaceBetween={16}
                slidesPerGroup={4}
                slidesPerView={'auto'}
                freeMode={true}
                navigation
            >
                {sales &&
                    sales.map((item) => (
                        <SwiperSlide key={item?.id}>
                            <Story {...item} onClick={() => showStory(0)} />
                        </SwiperSlide>
                    ))}
            </Swiper>

            <Modal show={story} onHide={closeStory} className="story-modal">
                <Modal.Body className="p-0">
                    <Swiper
                        className="swiper-stories-mobile"
                        modules={[Pagination]}
                        slidesPerView={1}
                        pagination={{clickable: true}}
                        onSwiper={(swiper) => swiper.slideTo(activeSlide, 50)}
                    >
                        {sales &&
                            sales.map((item) => (
                                <SwiperSlide key={item?.id}>
                                    <StoryLarge {...item} />
                                </SwiperSlide>
                            ))}
                    </Swiper>

                    <button className="close" onClick={closeStory}>
                        <IoClose />
                    </button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default StoriesSection
