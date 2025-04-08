import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (i) => i.productID === item.productID && i.size === item.size
            );
            if (existingItem) {
                return prevItems.map((i) =>
                    i.productID === item.productID && i.size === item.size
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prevItems, item];
        });
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (productID, size) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => !(item.productID === productID && item.size === size))
        );
    };

    // Cập nhật số lượng sản phẩm
    const updateQuantity = (productID, size, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.productID === productID && item.size === size
                    ? { ...item, quantity: quantity > 0 ? quantity : 1 }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);