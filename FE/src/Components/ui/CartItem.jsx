import React from 'react';

export default function CartItem({ name, price, images = [] }) {
    console.log(images);

    return (
        <div className='w-[20vw] bg-[#f3f3f3] rounded-2xl ml-3 mb-5'>
            <div className='flex items-center justify-center flex-col'>
                <img src={`image/${images[0]}`} alt=""  className='w-[16.8rem] h-[18rem] mt-3 rounded-xl'/>
                <div>
                    <h3 className='line-clamp-1 m-[5%] font-arial'>{name}</h3>
                    <p className=' text-lg font-bold ml-[5%]'>{price}<span>đ</span></p>
                </div>
                <div className='flex gap-4 m-3'>
                    {
                        images.map((image, index) => (
                           <button>
                                <img className='w-[3rem] h-[3rem] rounded-md' key={index} src={`image/${image}`} alt={name} />
                           </button> 
                        ))
                    }
                </div>
               
            </div>
        </div>
    );
}
