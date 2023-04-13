import React from "react";
import { FreeMode, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Banner from "./Banner";

const BannerSection = ({ sales = [] }) => {
  return (
    <>
      <Swiper
        className="swiper-sale mb-6"
        modules={[Navigation, FreeMode, Autoplay]}
        spaceBetween={30}
        slidesPerView={"auto"}
        freeMode={true}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        speed={1000}
        navigation
      >
        {sales &&
          sales.map((item) => (
            <SwiperSlide key={item?.id}>
              <Banner {...item} />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* <Modal show={story} onHide={closeStory} className="story-modal">
        <Modal.Body className="p-0">
          <Swiper
            className="swiper-stories-mobile"
            modules={[Pagination]}
            slidesPerView={1}
            pagination={{ clickable: true }}
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
      </Modal> */}
    </>
  );
};

export default BannerSection;
