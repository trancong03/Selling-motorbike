import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children, User }) => {
    const personID = User? User.manguoidung :null;
    const [likeProducts, setLikeProducts] = useState([]);
    // Fetch the liked products when personID changes
    useEffect(() => {
        const fetchLikedProducts = async () => {
            if (!personID) return;

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/get-like-post/${personID}/`);
                const result = await response.json();
                if (result.favorites) {
                    setLikeProducts(result.favorites);
                } else {
                    console.error('Invalid response format:', result);
                }
            } catch (error) {
                console.error('Error fetching liked products:', error);
            } 
        };

        fetchLikedProducts();
    }, [personID]);
    
    const isProductLiked = (item) => {
        return likeProducts.some(product => product.mabaiviet === item);
    };

    const likeProduct = async (item) => {
        try {
            const isAlreadyLiked = isProductLiked(item.MABAIVIET); // Check if already liked from state
            const formData = new FormData();
            formData.append('manguoidung', personID);
            formData.append('maBaiViet', item.MABAIVIET);

            const response = await fetch(isAlreadyLiked
                ? 'http://127.0.0.1:8000/api/remove-like-post/'
                : 'http://127.0.0.1:8000/api/like-post/', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

                setLikeProducts(prevItems => {
                    if (isAlreadyLiked) {
                        return prevItems.filter(product => product.ProductID !== item.ProductID); // Remove from liked
                    } else {
                        return [...prevItems, item]; // Add to liked
                    }
                });
                console.log(isAlreadyLiked ? 'Product removed from likes successfully' : 'Product added to likes successfully');
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
