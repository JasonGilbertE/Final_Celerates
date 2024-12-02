import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const BannerBwh = () => {
  return (
    <section className="p-8 w-full overflow-hidden rounded-lg">
      <Swiper modules={[Pagination, Autoplay]} spaceBetween={10} slidesPerView={1} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} pagination={{ clickable: true }} className="rounded-lg">
        {/* Slide pertama */}
        <SwiperSlide>
          <img src="public/assets/images/bwhbanner.jpeg" alt="Temple in Central Java" className="w-full h-[400px] block rounded-2xl" />
        </SwiperSlide>

        {/* Slide kedua */}
        <SwiperSlide>
          <img src="public/assets/images/bwhbanner2.jpg" alt="Another beautiful view" className="w-full h-[400px] block rounded-2xl" />
        </SwiperSlide>

        {/* Slide ketiga */}
        <SwiperSlide>
          <img src="public/assets/images/bwhbanner3.jpg" alt="Cultural depiction" className="w-full h-[400px] block rounded-2xl" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default BannerBwh;
