import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/db';
import { createStripeCheckoutSession } from '@/lib/payment';

function normalizeCartItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Cart is empty');
  }

  return items.map((item) => ({
    id: Number(item.id),
    quantity: Number(item.quantity),
    selectedSize: typeof item.selectedSize === 'string' ? item.selectedSize : '',
    selectedColor: typeof item.selectedColor === 'string' ? item.selectedColor : '',
  }));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const normalizedItems = normalizeCartItems(body.items);

    const lineItems = [];

    for (const item of normalizedItems) {
      if (!Number.isInteger(item.id) || !Number.isInteger(item.quantity) || item.quantity <= 0) {
        return NextResponse.json({ error: 'Invalid cart item payload' }, { status: 400 });
      }

      const product = await getProductById(item.id);
      if (!product) {
        return NextResponse.json({ error: `Product ${item.id} not found` }, { status: 404 });
      }
      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${product.name}` }, { status: 409 });
      }

      lineItems.push({
        id: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      });
    }

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await createStripeCheckoutSession({
      lineItems,
      successUrl: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}
