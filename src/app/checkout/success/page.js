"use client";
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const [state, setState] = useState({ loading: true, message: 'Confirming payment…', orderId: null });

  const sessionId = useMemo(() => searchParams.get('session_id'), [searchParams]);

  useEffect(() => {
    let isMounted = true;

    async function confirmPayment() {
      if (!sessionId) {
        setState({ loading: false, message: 'Missing session ID. Please contact support.', orderId: null });
        return;
      }

      try {
        const response = await fetch('/api/checkout/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || 'Unable to verify payment');
        }

        if (isMounted) {
          clearCart();
          setState({
            loading: false,
            message: payload.alreadyProcessed ? 'Payment was already confirmed.' : 'Payment confirmed! Your order was placed.',
            orderId: payload.order?.id ?? null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({ loading: false, message: error.message, orderId: null });
        }
      }
    }

    confirmPayment();

    return () => {
      isMounted = false;
    };
  }, [sessionId, clearCart]);

  return (
    <main className="container" style={{ paddingTop: '140px', paddingBottom: '4rem', minHeight: '60vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', border: '1px solid var(--glass-border)', borderRadius: 16, padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
        <h1 className="text-gradient" style={{ marginBottom: '1rem' }}>Checkout Success</h1>
        <p style={{ color: '#ddd', marginBottom: '1rem' }}>{state.loading ? 'Please wait while we verify your payment.' : state.message}</p>
        {state.orderId && <p style={{ color: '#aaa', marginBottom: '2rem' }}>Order ID: #{state.orderId}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link className="btn btn-primary" href="/products">Continue Shopping</Link>
          <Link className="btn btn-outline" href="/contact">Need Help?</Link>
        </div>
      </div>
    </main>
  );
}
