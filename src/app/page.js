"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Hero from "@/components/Hero";
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        const payload = await response.json();
        if (active) {
          setFeaturedProducts((payload.products || []).slice(0, 6));
        }
      } catch {
        if (active) {
          setFeaturedProducts([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main>
      <Hero />

      <section className="container" style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
          <div>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.2 }}>New Arrivals</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Just dropped. Meticulously crafted for you.</p>
          </div>
          <Link href="/products" className="btn btn-outline">View All Collection</Link>
        </div>

        {loading ? (
          <p>Loading featured products…</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
