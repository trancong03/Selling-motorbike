import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children, User }) => {
    const personID = User? User.manguoidung :null;
    const [likeProducts, setLikeProducts] = useState([]);
    useEffect(() => {
        const fetchCartItems = async () => {
            if (!personID) return; 
           
            try {
                const response = await fetch('http://localhost:8000/api/get_product_on_like/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ person_id: personID }),
                });
                const result = await response.json();
                if (result.product) {
                    setLikeProducts(result.product);
                } else {
                    console.error('Invalid response format:', result);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }

        };
        fetchCartItems();
    }, [personID]);
    
    const likeProduct = async (item) => {
        try {
            const isAlreadyLiked = likeProducts.some(product => product.MABAIVIET === item.MABAIVIET);
            const formData = new FormData();
            formData.append('manguoidung', personID);
            formData.append('maBaiViet', item.MABAIVIET);
            const response = await fetch(isAlreadyLiked
                ? 'http://127.0.0.1:8000/api/remove-like-post/'
                : 'http://127.0.0.1:8000/api/like-post/', {
                method: 'POST',
                body: formData, // Sử dụng FormData
            });
            const result = await response.json();
            if (result.success) {
                if (isAlreadyLiked) {
                    setLikeProducts(prevItems => prevItems.filter(product => product.ProductID !== item.ProductID));
                    console.log('Product removed from likes successfully');
                } else {
                    setLikeProducts(prevItems => [...prevItems, item]);
                    console.log('Product added to likes successfully');
                }
            } else {
                console.log('Failed to update product likes');
            }
        } catch (error) {
            console.error('Error updating product likes:', error);
        }
    };

    const isProductLiked = async (item) => {
        try {
            const isAlreadyLiked = likeProducts.some(product => product.MABAIVIET === item.MABAIVIET);
            const formData = new FormData();
            formData.append('manguoidung', personID);
            formData.append('maBaiViet', item.MABAIVIET);
            const response = await fetch(isAlreadyLiked
                ? 'http://127.0.0.1:8000/api/remove-like-post/'
                : 'http://127.0.0.1:8000/api/like-post/', {
                method: 'POST',
                body: formData, // Sử dụng FormData
            });
            const result = await response.json();
            if (result.success) {
                if (isAlreadyLiked) {
                    setLikeProducts(prevItems => prevItems.filter(product => product.ProductID !== item.ProductID));
                    console.log('Product removed from likes successfully');
                } else {
                    setLikeProducts(prevItems => [...prevItems, item]);
                    console.log('Product added to likes successfully');
                }
            } else {
                console.log('Failed to update product likes');
            }
        } catch (error) {
            console.error('Error updating product likes:', error);
        }
    };
   
   
    return (
        <CartContext.Provider value={{
            personID, User,
            likeProduct, likeProducts, isProductLiked, 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
