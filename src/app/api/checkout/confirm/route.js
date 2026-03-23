import { NextResponse } from 'next/server';
import { findOrderByPaymentReference, createOrder, updateStockByOrderItems } from '@/lib/db';
import { retrieveStripeCheckoutSession } from '@/lib/payment';

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    const existingOrder = await findOrderByPaymentReference(sessionId);
    if (existingOrder) {
      return NextResponse.json({ order: existingOrder, alreadyProcessed: true });
    }

    const session = await retrieveStripeCheckoutSession(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed yet' }, { status: 409 });
    }

    const lineItems = session?.line_items?.data || [];

    const orderItems = lineItems.map((line) => ({
      id: Number(line?.price?.product?.metadata?.productId || 0),
      name: line.description,
      quantity: line.quantity,
      unitPrice: (line.amount_total || 0) / 100 / Math.max(line.quantity || 1, 1),
      selectedSize: line?.price?.product?.metadata?.selectedSize || '',
      selectedColor: line?.price?.product?.metadata?.selectedColor || '',
    }));

    await updateStockByOrderItems(orderItems.map((item) => ({ id: item.id, quantity: item.quantity })));

    const subtotal = (session.amount_total || 0) / 100;

    const dbState = await createOrder({
      customerEmail: session.customer_details?.email || null,
      items: orderItems,
      subtotal,
      currency: session.currency || 'usd',
      paymentProvider: 'stripe',
      paymentReference: session.id,
      status: 'paid',
    });

    const createdOrder = dbState.orders[dbState.orders.length - 1];
    return NextResponse.json({ order: createdOrder });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to confirm order' }, { status: 500 });
  }
}
