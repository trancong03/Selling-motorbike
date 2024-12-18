import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { getTop10Product } from '../../../services/apiclient';
import ErrorBoundary from '../../ErrorBoundary';
import ErrorPage from '../Footer/ErrorPage';
import CartItem from '../ui/CartItem';
import Top100Post from '../ui/Top100Post';
import { Heart } from 'lucide-react';
export default function Banner() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getTop10Product().then(respone => {
      setProducts(respone);
    }).catch(error => {
      console.error("Error fetching products:", error);
      setProducts([]); // Xử lý khi có lỗi
    });
  }, []);
  return (
    <div>
      <div className='h-[60vh] w-full'>
        <Swiper pagination={true} modules={[Pagination, Autoplay]} className="mySwiper h-full w-full"
          autoplay={{
            delay: 3000, // Thời gian trễ giữa các slide
            disableOnInteraction: false,
          }}>
          <SwiperSlide className="flex justify-center items-center h-full w-full">
            <img src="http://127.0.0.1:8000//media/images/slide1.jpg" className='max-w-full max-h-full object-contain' alt="" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center h-full w-full">
            <img src="http://127.0.0.1:8000//media/images/slide2.jpg" className='max-w-full max-h-full object-contain' alt="" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center h-full w-full">
            <img src="http://127.0.0.1:8000//media/images/slide3.png" className='max-w-full max-h-full object-contain' alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <Top100Post />
      <h1 className="text-3xl font-bold text-center mt-[3rem] mb-[3rem]">Tin được yêu thích nhiều nhất</h1>
      <div className="grid grid-cols-5 mr-[3%] ml-[3%] mb-[1%] ">
        {/* Kiểm tra nếu products là mảng hợp lệ */}
        {Array.isArray(products.data) ? (
          products.data.map((product) => (
            <ErrorBoundary key={product.mabaiviet}>
               <div className="relative">
                                          <p className="absolute top-2 z-10 right-8 bg-gradient-to-r text-black text-sm font-extrabold rounded-full px-3 py-1 shadow-lg flex items-center space-x-2 transform scale-110 hover:scale-125 transition duration-300">
                                              <p className="flex items-center justify-center text-lg">
                                                  <Heart/>
                                                <h1>{product.favorite_count}</h1>
                                              </p>
                                             
                                          </p>
                                      <CartItem Product={product} />
                                      </div>
              
            </ErrorBoundary>
          ))
        ) : (
          <div className="w-[80vw]">
            <p className="text-center   text-gray-500">Không tìm thấy sản phẩm nào phù hợp .</p>
            <ErrorPage />
          </div>
        )}
      </div>
    </div>
  )
}
