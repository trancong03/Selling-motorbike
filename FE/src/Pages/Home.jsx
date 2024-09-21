import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import CartItem from "../Components/ui/cartItem";


export default function Home() {
  const [listProduct, setlistProduct] = useState([]);

  useEffect(() => {
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => setlistProduct(data));
  }, []);
  
  return (
    <div className=" bg-white">
      <Banner />
      <div className="grid grid-cols-4 m-[5%]">
        {listProduct.map((product) => {
          return (
            
            <CartItem 
            
              key={product.id}
              name={product.name}
              price={product.price}
              images={product.images || []}
            />
          );
        })}
      </div>

    </div>
  );
}
