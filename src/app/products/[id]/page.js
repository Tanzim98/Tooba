"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/data/products'; // Assuming export const products = [...]
import { useCart } from '@/context/CartContext';
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';

export default function ProductDetailsPage() {
    const params = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // params.id is a string, products.id is a number
        const foundProduct = products.find(p => p.id === parseInt(params.id));
        if (foundProduct) {
            setProduct(foundProduct);
            if (foundProduct.sizes && foundProduct.sizes.length > 0) setSelectedSize(foundProduct.sizes[0]);
            if (foundProduct.colors && foundProduct.colors.length > 0) setSelectedColor(foundProduct.colors[0]);
        }
        setLoading(false);
    }, [params.id]);

    const handleQuantityChange = (type) => {
        if (type === 'inc') {
            if (quantity < product.stock) setQuantity(prev => prev + 1);
        } else {
            if (quantity > 1) setQuantity(prev => prev - 1);
        }
    };

    if (loading) return <div className="container" style={{ paddingTop: '120px', minHeight: '60vh' }}>Loading...</div>;
    if (!product) return <div className="container" style={{ paddingTop: '120px', minHeight: '60vh' }}>Product not found</div>;

    return (
        <main className="container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
            <div className="product-details-grid">
                {/* Image Section */}
                <div className="image-section animate-fade-in">
                    <div className="main-image-container">
                        <Image
                            src={product.image}
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                            className="product-image"
                        />
                        {product.originalPrice && (
                            <span className="discount-badge">
                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                            </span>
                        )}
                    </div>
                </div>

                {/* Info Section */}
                <div className="info-section animate-fade-in delay-100">
                    <span className="breadcrumb">Home / {product.category} / {product.name}</span>
                    <h1 className="product-title">{product.name}</h1>

                    <div className="rating-row">
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map(star => (
                                <Star
                                    key={star}
                                    size={16}
                                    fill={star <= Math.round(product.rating) ? "#FFD700" : "none"}
                                    stroke={star <= Math.round(product.rating) ? "#FFD700" : "#666"}
                                />
                            ))}
                        </div>
                        <span className="rating-text">{product.rating} (120 reviews)</span>
                    </div>

                    <div className="price-row">
                        <span className="current-price">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                        )}
                    </div>

                    <p className="description">{product.description}</p>

                    <div className="selectors">
                        {/* Size Selector */}
                        {product.sizes && (
                            <div className="selector-group">
                                <label>Select Size</label>
                                <div className="options">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            className={`option-btn ${selectedSize === size ? 'active' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Color Selector */}
                        {product.colors && (
                            <div className="selector-group">
                                <label>Select Color</label>
                                <div className="options">
                                    {product.colors.map(color => (
                                        <button
                                            key={color}
                                            className={`option-btn ${selectedColor === color ? 'active' : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="actions-row">
                        <div className="quantity-selector">
                            <button onClick={() => handleQuantityChange('dec')} disabled={quantity <= 1}><Minus size={16} /></button>
                            <span>{quantity}</span>
                            <button onClick={() => handleQuantityChange('inc')} disabled={quantity >= product.stock}><Plus size={16} /></button>
                        </div>

                        <button
                            className="btn btn-primary add-to-cart-btn"
                            onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                        >
                            <ShoppingCart size={20} style={{ marginRight: '8px' }} />
                            Add to Cart
                        </button>
                    </div>

                    <div className="features">
                        <div className="feature-item">
                            ✅ 100% Original Product
                        </div>
                        <div className="feature-item">
                            🚚 Free Delivery on Orders Above $50
                        </div>
                        <div className="feature-item">
                            🔄 Easy 30 Days Return
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .product-details-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 3rem;
                }

                @media (min-width: 900px) {
                    .product-details-grid {
                        grid-template-columns: 1fr 1fr;
                        align-items: start;
                    }
                }

                .main-image-container {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 4/5;
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    background: #111;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }

                .discount-badge {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    background: var(--brand-accent);
                    color: white;
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-weight: 700;
                    z-index: 2;
                }

                .breadcrumb {
                    display: block;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    text-transform: capitalize;
                }

                .product-title {
                    font-size: 2.5rem; /* Larger title */
                    font-weight: 800;
                    margin-bottom: 1rem;
                    line-height: 1.1;
                }

                .rating-row {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .stars {
                    display: flex;
                    gap: 4px;
                }

                .rating-text {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }

                .price-row {
                    display: flex;
                    align-items: baseline;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .current-price {
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--brand-primary);
                }

                .original-price {
                    font-size: 1.25rem;
                    color: var(--text-secondary);
                    text-decoration: line-through;
                }

                .description {
                    font-size: 1.1rem;
                    color: #ccc;
                    line-height: 1.6;
                    margin-bottom: 2.5rem;
                }

                .selectors {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                    background: rgba(255, 255, 255, 0.03);
                    padding: 1.5rem;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--glass-border);
                }

                .selector-group label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 0.75rem;
                    color: var(--text-primary);
                }

                .options {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                }

                .option-btn {
                    padding: 8px 16px;
                    border: 1px solid var(--glass-border);
                    background: transparent; /* Default bg */
                    color: var(--text-secondary);
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .option-btn:hover {
                    border-color: var(--brand-primary);
                    color: white;
                }

                .option-btn.active {
                    background: var(--brand-primary);
                    border-color: var(--brand-primary);
                    color: white;
                    font-weight: 600;
                }

                .actions-row {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                    flex-wrap: wrap; /* Handle mobile */
                }

                .quantity-selector {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0 1rem;
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-md);
                    height: 50px;
                }

                .quantity-selector button {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    opacity: 0.7;
                }

                .quantity-selector button:hover {
                     opacity: 1;
                }
                
                .quantity-selector button:disabled {
                    opacity: 0.2;
                    cursor: not-allowed;
                }

                .add-to-cart-btn {
                    flex: 1;
                    height: 50px;
                    font-size: 1.1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .features {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    font-size: 0.95rem;
                    color: var(--text-secondary);
                    border-top: 1px solid var(--glass-border);
                    padding-top: 2rem;
                }
            `}</style>
        </main>
    );
}
