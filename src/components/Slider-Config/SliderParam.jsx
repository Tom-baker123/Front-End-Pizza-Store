import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SliderParam = ({children}) => {
  return (
    <div className="no-select">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation 
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
      >
        {/* -[Carousel Image]-------------------------------------------------------- */}
        <SwiperSlide> {children} </SwiperSlide>
        
        {/* -[Carousel Image - End]-------------------------------------------------- */}

      </Swiper >
    </div >
  );
}

export default SliderParam;