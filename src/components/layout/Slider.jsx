import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../layout/Slider.css"
import {slider} from "../../../public/Images/FakeData";


const Slider = () => {
  return (
    <div className="select-none flex justify-center">
      <Swiper
        style={{'--swiper-pagination-color': '#fff'}}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
      >
        {/* -[Carousel Image]-------------------------------------------------------- */}
        {slider.map((slider) => (
          <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
            <img src={slider.url} alt={slider.id} width={1000} height={400}
              className="rounded-2xl object-contain w-full 
              md:h-[400px] md:object-cover" 
              />
          </SwiperSlide>
        ))}
        {/* -[Carousel Image - End]-------------------------------------------------- */}

      </Swiper >
    </div >
  );
}

export default Slider;