"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('tooba-cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart data", e);
            }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('tooba-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
        setCart(prevCart => {
            // Check if item already exists with same ID, size, and color
            const existingItemIndex = prevCart.findIndex(item =>
                item.id === product.id &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
            );

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                return [...prevCart, { ...product, quantity, selectedSize, selectedColor }];
            }
        });
        setIsCartOpen(true); // Open cart sidebar when item is added
    };

    const removeFromCart = (itemId, selectedSize, selectedColor) => {
        setCart(prevCart => prevCart.filter(item =>
            !(item.id === itemId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
        ));
    };

    const updateQuantity = (itemId, selectedSize, selectedColor, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prevCart => prevCart.map(item => {
            if (item.id === itemId && item.selectedSize === selectedSize && item.selectedColor === selectedColor) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCart([]);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isCartOpen,
            setIsCartOpen,
            toggleCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};
