import Hero from "@/components/Hero";
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const featuredProducts = products.slice(0, 3); // Show top 3 products

  return (
    <main>
      <Hero />

      {/* Featured Section */}
      <section className="container" style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
          <div>
            <h2 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.2 }}>New Arrivals</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Just dropped. Meticulously crafted for you.</p>
          </div>
          <a href="/products" className="btn btn-outline">View All Collection</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
