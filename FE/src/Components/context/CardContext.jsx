import { createContext, useState, useContext, useEffect } from 'react';
import { getLikeProduct, handleLikeProduct } from '../../../services/apiclient';

const CartContext = createContext();

export const CartProvider = ({ children, User, onLoginClick }) => {
    const personID = User? User.manguoidung :null;
    const [likeProducts, setLikeProducts] = useState([]);
    
    // Inside your CartContext (useCart)
    const fetchLike = async () => {
        try {
            if (personID){
                const result = await getLikeProduct(personID);
                // Kiểm tra result.data trước khi xử lý
                if (result && result.data) {
                    const products = result.data || []; // Đảm bảo cart_items là mảng
                    setLikeProducts(products);
                }
            }
        } catch (error) {
            console.error('Error while fetching cart:', error);
        }
    };

    const isProductLiked = (productId) => {
        const status = likeProducts.some(product => product.mabaiviet === productId);
        return status;
    };
    useEffect(() => {
        if (personID) {
            fetchLike();
        }
    }, [personID]);

    const handleAddLikeProduct = (username, product_id) => {
        if (!username) {
            onLoginClick();
        }else{
            handleLikeProduct(username, product_id)
                .then(() => {
                    fetchLike();
                })
                .catch(error => {
                    console.error("Error add cart item:", error);
                });
        }
       
    };
    const handleShowPhone = (username) => {
        if (!username) {
            onLoginClick();
        } 
    };
    
    return (
        <CartContext.Provider value={{
            personID, User,
            likeProducts, isProductLiked, handleAddLikeProduct, handleShowPhone
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
