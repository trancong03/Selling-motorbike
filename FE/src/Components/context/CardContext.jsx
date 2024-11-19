import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children, personID,User }) => {
    const [cartItems, setCartItems] = useState([]);
    const [likeProducts, setLikeProducts] = useState([]);
    const [address, setAddress] = useState([]);
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
    const addToCart = async (item) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/add_product_to_Cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: item.ProductID,
                    person_id: personID,
                }),
            });
            const result = await response.json();
            if (result.success) {
                setCartItems(prevItems => [...prevItems, item]); // Thêm sản phẩm vào giỏ
                console.log('Product added to cart successfully');
            } else {
                console.log('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };
    const fetchCartItems = async () => {
        if (!personID) return;
        try {
            const response = await fetch('http://localhost:8000/api/get_delivery_address/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ person_id: personID }),
            });
            const result = await response.json();
            if (result.delivery_address) {
                setAddress(result.delivery_address);
            } else {
                console.error('Invalid response format:', result);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };
    useEffect(() => {

        fetchCartItems();
    }, [personID]);

    const create_delivery_address = async (recipient_name, phone_number, delivery_address) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/create_delivery_address/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    person_id: personID,
                    recipient_name: recipient_name,
                    phone_number: phone_number,
                    delivery_address: delivery_address
                }),
            });
            const result = await response.json();
            if (result.success) {
                await fetchCartItems();
                setAddress(prevItems => [...prevItems, {
                    recipient_name: recipient_name,
                    phone_number: phone_number,
                    delivery_address: delivery_address
                }]);
                console.log('Address added to cart successfully');
            } else {
                console.log('Failed to add Address to cart');
            }
        } catch (error) {
            console.error('Error adding Address to cart:', error);
        }
    };

    const likeProduct = async (item) => {
        try {
            const isAlreadyLiked = likeProducts.some(product => product.ProductID === item.ProductID);
            const response = await fetch(isAlreadyLiked
                ? 'http://127.0.0.1:8000/api/remove_product_from_like/'
                : 'http://127.0.0.1:8000/api/add_product_to_like/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: item.ProductID,
                    person_id: personID,
                }),
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

    const removeFromCart = async (itemId) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/remove_product_from_Cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: itemId,
                    person_id: personID,
                }),
            });
            const result = await response.json();
            if (result.success) {
                setCartItems(cartItems.filter(item => item.ProductID !== itemId));
                console.log('Product remove from cart successfully');
            } else {
                console.log('Failed to Product remove from cart');
            }
        } catch (error) {
            console.error('Error Product remove from cart:', error);
        }
    };
    const updateAddress = (newAddress) => {
        setAddress(newAddress);
    };
    const isProductLiked = (productId) => {
        return likeProducts.some(product => product.ProductID === productId);
    };
    return (
        <CartContext.Provider value={{
            personID, User, cartItems, addToCart, removeFromCart,
            likeProduct, likeProducts, isProductLiked, updateAddress,
            address, create_delivery_address
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
