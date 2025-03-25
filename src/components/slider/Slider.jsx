import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";


const Slider = () => {
  return (
    <div className="no-select flex justify-center w-full mt-3">
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Navigation, Pagination]}
      >
        {/* -[Carousel Image]-------------------------------------------------------- */}
        <SwiperSlide style={{
          display: "flex", justifyContent: "center"
        }}>
          <img className="rounded-2xl h-auto max-w-full" src="images/Content-Carousel/Carousel_1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide style={{
          display: "flex", justifyContent: "center"
        }}>
          <img className="rounded-2xl h-auto max-w-full" src="images/Content-Carousel/Carousel_1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide style={{
          display: "flex", justifyContent: "center"
        }}>
          <img className="rounded-2xl h-auto max-w-full" src="images/Content-Carousel/Carousel_1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide style={{
          display: "flex", justifyContent: "center"
        }}>
          <img className="rounded-2xl h-auto max-w-full" src="images/Content-Carousel/Carousel_1.png" alt="" />
        </SwiperSlide>
        {/* -[Carousel Image - End]-------------------------------------------------- */}

      </Swiper >
    </div >
  );
}

export default Slider;