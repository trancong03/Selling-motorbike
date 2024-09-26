import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
export default function Banner() {
  return (
    <div>
      <div className='h-[60vh] w-full'>
        <Swiper pagination={true} modules={[Pagination, Autoplay]} className="mySwiper h-full w-full"
          autoplay={{
            delay: 3000, // Thời gian trễ giữa các slide
            disableOnInteraction: false,
          }}>
          <SwiperSlide className="flex justify-center items-center h-full w-full">
            <img src="image/slide1.jpg" className='max-w-full max-h-full object-contain' alt="" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center h-full w-full">
            <img src="image/slide2.jpg" className='max-w-full max-h-full object-contain' alt="" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center h-full w-full">
            <img src="image/slide3.png" className='max-w-full max-h-full object-contain' alt="" />
          </SwiperSlide>
        </Swiper>
      </div>

      <h1 className="text-3xl font-bold text-center mt-[3rem] mb-[3rem]">Sản phẩm nổi bật</h1>

          <Swiper
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                  clickable: true,
              }}
              modules={[FreeMode, Pagination]}
        className="mySwiper bg-slate-50 h-[20rem]"
          >
        <SwiperSlide><img src="image/vario160.png" className='w-[15rem] h-[20rem]   ' alt="" /></SwiperSlide>
        <SwiperSlide><img src="image/Janus-standard.webp" className='w-[15rem] h-[20rem] ' alt="" /></SwiperSlide>
        <SwiperSlide><img src="image/EXCITER155.webp" className='w-[15rem] h-[20rem]  ' alt="" /></SwiperSlide>
        <SwiperSlide><img src="image/vario160.png" className='w-[15rem] h-[20rem]   ' alt="" /></SwiperSlide>
        <SwiperSlide><img src="image/vario125.png" className='w-[15rem] h-[20rem] ' alt="" /></SwiperSlide>
        <SwiperSlide><img src="image/EXCITER155.webp" className='w-[15rem] h-[20rem]  ' alt="" /></SwiperSlide>
     
          </Swiper>
    </div>
  )
}
