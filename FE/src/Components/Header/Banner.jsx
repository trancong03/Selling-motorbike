import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { getTop10Product } from '../../../services/apiclient';
import ErrorBoundary from '../../ErrorBoundary';
import ErrorPage from '../Footer/ErrorPage';
import CartItem from '../ui/CartItem';
import Top100Post from '../ui/Top100Post';
export default function Banner() {
  const [collection, setCollection] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // getColection().then(response => {
    //   setCollection(response); // Giả sử API trả về dữ liệu trong `data`
    // }).catch(error => {
    //   console.error("Error fetching products:", error);
    //   setCollection([]); // Xử lý khi có lỗi
    // });
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
            <ErrorBoundary key={product.product_id}>
              <CartItem Product={product} />
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
