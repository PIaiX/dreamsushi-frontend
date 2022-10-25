import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import Story from './Story'
import StoryLarge from './StoryLarge'
import { IoClose } from "react-icons/io5"

const StoriesSection = () => {
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
                className='swiper-stories mb-6'
                modules={[Navigation, FreeMode]}
                spaceBetween={16}
                slidesPerGroup={4}
                slidesPerView={'auto'}
                freeMode={true}
                navigation
                >
                <SwiperSlide>
                    <Story onClick={()=>showStory(0)} imgLink={'imgs/products/set-rendezvous.jpg'} title={'Сет Рандеву'} label={'акция'} price={'1 100'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <Story onClick={()=>showStory(1)} imgLink={'imgs/products/Set-Monaco.jpg'} title={'Сет Монако'} label={'хит'} price={'1 100'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <Story onClick={()=>showStory(2)} imgLink={'imgs/products/Set-Prestige.jpg'} title={'Сет Престиж'} label={'новинка'} price={'1 100'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <Story onClick={()=>showStory(3)} imgLink={'imgs/products/Set-Velvet.jpg'} title={'Сет Вельвет'} label={'акция'} price={'1 100'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <Story onClick={()=>showStory(4)} imgLink={'imgs/products/set-rendezvous.jpg'} title={'Сет Рандеву'} label={'акция'} price={'1 100'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <Story onClick={()=>showStory(5)} imgLink={'imgs/products/Set-Monaco.jpg'} title={'Сет Монако'} label={'хит'} price={'1 100'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <Story onClick={()=>showStory(6)} imgLink={'imgs/products/Set-Prestige.jpg'} title={'Сет Престиж'} label={'новинка'} price={'1 100'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <Story onClick={()=>showStory(7)} imgLink={'imgs/products/Set-Velvet.jpg'} title={'Сет Вельвет'} label={'акция'} price={'1 100'}/>
                </SwiperSlide>
            </Swiper>

            <Modal show={story} onHide={closeStory} className='story-modal'>
                <Modal.Body className='p-0'>
                    <Swiper
                        className='swiper-stories-mobile'
                        modules={[Pagination]}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        onSwiper={(swiper) => swiper.slideTo(activeSlide, 50)}
                        >
                        <SwiperSlide>
                            <StoryLarge imgLink={'imgs/products/set-rendezvous.jpg'} title={'Сет Рандеву'} label={'акция'} price={'1 100'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <StoryLarge imgLink={'imgs/products/Set-Monaco.jpg'} title={'Сет Монако'} label={'хит'} price={'1 100'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <StoryLarge imgLink={'imgs/products/Set-Prestige.jpg'} title={'Сет Престиж'} label={'новинка'} price={'1 100'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <StoryLarge imgLink={'imgs/products/Set-Velvet.jpg'} title={'Сет Вельвет'} label={'акция'} price={'1 100'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <StoryLarge imgLink={'imgs/products/set-rendezvous.jpg'} title={'Сет Рандеву'} label={'акция'} price={'1 100'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <StoryLarge imgLink={'imgs/products/Set-Monaco.jpg'} title={'Сет Монако'} label={'хит'} price={'1 100'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <StoryLarge imgLink={'imgs/products/Set-Prestige.jpg'} title={'Сет Престиж'} label={'новинка'} price={'1 100'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <StoryLarge imgLink={'imgs/products/Set-Velvet.jpg'} title={'Сет Вельвет'} label={'акция'} price={'1 100'}/>
                        </SwiperSlide>
                    </Swiper>

                    <button className='close' onClick={closeStory}>
                        <IoClose/>
                    </button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default StoriesSection;