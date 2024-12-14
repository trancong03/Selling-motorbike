import React from 'react'
import { useCart } from '../Components/context/CardContext';
import CartItem from '../Components/ui/CartItem';
import PostLikeUI from '../Components/ui/postlikeUI';

export default function ProductLike() {
    const { likeProducts } = useCart();
    console.log(likeProducts);  

    return (
        <div className="flex flex-col lg:flex-row p-6 lg:p-12 gap-6 bg-white min-h-screen">
            <div className="flex-1 bg-white shadow-md rounded-lg p-6 h-fit">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Sản Phẩm Yêu Thích</h2>
                <div className="grid grid-cols-3 m-[5%]">
                    {
                        likeProducts.map((product,index) => {
                            return (
                                <PostLikeUI key={index} ProductID={product.mabaiviet}/>
                            );
                        })}
                </div>
            </div>
        </div>
    )
}
