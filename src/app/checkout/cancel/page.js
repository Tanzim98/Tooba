import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <main className="container" style={{ paddingTop: '140px', paddingBottom: '4rem', minHeight: '60vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
        <h1 style={{ marginBottom: '1rem' }}>Payment Cancelled</h1>
        <p style={{ color: '#bbb', marginBottom: '2rem' }}>No worries—your cart is still saved. You can continue checkout anytime.</p>
        <Link className="btn btn-primary" href="/products">Return to Products</Link>
      </div>
    </main>
  );
}
