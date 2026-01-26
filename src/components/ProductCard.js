"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation if wrapped in Link
    e.stopPropagation();
    // Add with default/first options for quick add
    addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
  };

  return (
    <div className="glass-card product-card">
      <div className="image-container">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={500}
          className="product-image"
        />
        {product.originalPrice && (
          <span className="discount-tag">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      <div className="details">
        <div className="flex-row">
          <span className="category">{product.category}'s {product.subCategory}</span>
          <div className="rating">
            <Star size={14} fill="#FFD700" stroke="#FFD700" />
            <span>{product.rating}</span>
          </div>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="name">{product.name}</h3>
        </Link>

        <div className="price-row">
          <div className="prices">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button className="add-btn" aria-label="Add to Cart" onClick={handleAddToCart}>
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.4);
        }
        
        .image-container {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: hidden;
          background: #111;
        }
        
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        
        .discount-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          background: var(--brand-accent);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        
        .details {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .flex-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .category {
          text-transform: capitalize;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        
        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .name {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          line-height: 1.4;
          cursor: pointer;
        }
        
        .name:hover {
          color: var(--brand-primary);
        }
        
        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }
        
        .prices {
          display: flex;
          flex-direction: column;
        }
        
        .current-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        
        .original-price {
          font-size: 0.85rem;
          text-decoration: line-through;
          color: var(--text-secondary);
        }
        
        .add-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--brand-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .add-btn:hover {
          background: var(--brand-accent);
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
