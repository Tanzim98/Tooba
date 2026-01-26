"use client";
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories, subCategories } from '@/data/products';
import ProductCard from '@/components/ProductCard';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchSubCategory = selectedSubCategory === 'all' || product.subCategory === selectedSubCategory;
      return matchCategory && matchSubCategory;
    });
  }, [selectedCategory, selectedSubCategory]);

  return (
    <>
      <header className="page-header animate-fade-in">
        <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Our Collection
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px' }}>
          Discover the latest trends in men's and kids' fashion. Curated for style and comfort.
        </p>
      </header>

      {/* Filters */}
      <div className="filters animate-fade-in delay-100">
        <div className="filter-group">
          <span className="filter-label">Category:</span>
          <div className="filter-options">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Type:</span>
          <div className="filter-options">
            {subCategories.map(sub => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCategory(sub.id)}
                className={`filter-btn ${selectedSubCategory === sub.id ? 'active' : ''}`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-grid animate-fade-in delay-200">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-results">
            <p>No products found matching your criteria.</p>
            <button
              className="btn btn-outline"
              onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        .page-header {
          margin-bottom: 3rem;
          text-align: center;
        }
        
        .filters {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 3rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          padding: 1.5rem;
          border-radius: var(--radius-md);
        }
        
        .filter-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .filter-label {
          font-weight: 600;
          color: var(--text-secondary);
          min-width: 80px;
        }
        
        .filter-options {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .filter-btn {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }
        
        .filter-btn.active {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          color: white;
        }
        
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem;
          color: var(--text-secondary);
        }
        
        .no-results p {
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        
        @media (min-width: 768px) {
          .filters {
            flex-direction: row;
            justify-content: center;
          }
          
          .page-header {
            text-align: left;
          }
        }
      `}</style>
    </>
  );
}

export default function ProductsPage() {
  return (
    <main className="container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsContent />
      </Suspense>
    </main>
  );
}
