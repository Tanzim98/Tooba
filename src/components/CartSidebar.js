"use client";
import { useCart } from '@/context/CartContext';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartSidebar() {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        cartTotal
    } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
            <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Shopping Cart ({cart.length})</h2>
                    <button className="close-btn" onClick={() => setIsCartOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty.</p>
                            <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                                <div className="item-image">
                                    <Image src={item.image} alt={item.name} width={80} height={100} objectFit="cover" />
                                </div>
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <div className="item-meta">
                                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                                    </div>
                                    <div className="item-price">${item.price.toFixed(2)}</div>

                                    <div className="item-controls">
                                        <div className="quantity-control">
                                            <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)} disabled={item.quantity <= 1}>
                                                <Minus size={14} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}>
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button className="remove-btn" onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="subtotal">
                            <span>Subtotal</span>
                            <span className="amount">${cartTotal.toFixed(2)}</span>
                        </div>
                        <p className="shipping-text">Shipping and taxes calculated at checkout.</p>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .cart-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                    display: flex;
                    justify-content: flex-end;
                    animation: fadeIn 0.3s ease;
                }

                .cart-sidebar {
                    width: 100%;
                    max-width: 450px;
                    height: 100%;
                    background: var(--bg-secondary); /* Assuming global variable */
                    background-color: #0a0a0a; /* Fallback */
                    border-left: 1px solid var(--glass-border);
                    display: flex;
                    flex-direction: column;
                    animation: slideIn 0.3s ease;
                    box-shadow: -5px 0 30px rgba(0,0,0,0.5);
                }

                .cart-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid var(--glass-border);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .cart-header h2 {
                    font-size: 1.5rem;
                    font-weight: 600;
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: var(--text-secondary); /* Assuming global variable */
                    color: #aaa; /* Fallback */
                    cursor: pointer;
                    transition: color 0.2s;
                }

                .close-btn:hover {
                    color: white;
                }

                .cart-items {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .empty-cart {
                    text-align: center;
                    margin-top: 3rem;
                    color: #888;
                }

                .cart-item {
                    display: flex;
                    gap: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05); /* Subtle divider */
                    padding-bottom: 1.5rem;
                }

                .cart-item:last-child {
                    border-bottom: none;
                }

                .item-image {
                    width: 80px;
                    height: 100px;
                    border-radius: 8px;
                    overflow: hidden;
                    flex-shrink: 0;
                    background: #222;
                }

                .item-details {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .item-details h3 {
                    font-size: 1rem;
                    font-weight: 500;
                    margin-bottom: 0.25rem;
                }

                .item-meta {
                    font-size: 0.85rem;
                    color: #888;
                    display: flex;
                    gap: 0.75rem;
                    margin-bottom: 0.5rem;
                }

                .item-price {
                    font-weight: 600;
                    color: var(--brand-primary); /* Assuming global variable */
                    color: #eab308; /* Fallback (gold) */
                }

                .item-controls {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 0.5rem;
                }

                .quantity-control {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 4px 8px;
                    border-radius: 4px;
                }

                .quantity-control button {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                }

                .quantity-control button:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                .remove-btn {
                    background: none;
                    border: none;
                    color: #ef4444; /* Red */
                    cursor: pointer;
                    padding: 4px;
                    opacity: 0.8;
                    transition: opacity 0.2s;
                }

                .remove-btn:hover {
                    opacity: 1;
                }

                .cart-footer {
                    padding: 1.5rem;
                    border-top: 1px solid var(--glass-border);
                    background: rgba(0, 0, 0, 0.2);
                }

                .subtotal {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .shipping-text {
                    font-size: 0.85rem;
                    color: #888;
                    margin-bottom: 1.5rem;
                }

                .checkout-btn {
                    width: 100%;
                    padding: 1rem;
                    background: var(--brand-primary); /* Assuming global variable */
                    background-color: #eab308; /* Fallback */
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background 0.3s;
                }

                .checkout-btn:hover {
                    filter: brightness(1.1);
                }

                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
