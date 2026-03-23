const STRIPE_API_BASE = 'https://api.stripe.com/v1';

function getStripeKey() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable');
  }
  return key;
}

function toFormBody(values) {
  return new URLSearchParams(values).toString();
}

export async function createStripeCheckoutSession({ lineItems, successUrl, cancelUrl }) {
  const stripeSecretKey = getStripeKey();

  const payload = {
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    'payment_method_types[0]': 'card',
  };

  lineItems.forEach((item, index) => {
    payload[`line_items[${index}][quantity]`] = String(item.quantity);
    payload[`line_items[${index}][price_data][currency]`] = 'usd';
    payload[`line_items[${index}][price_data][unit_amount]`] = String(Math.round(item.unitPrice * 100));
    payload[`line_items[${index}][price_data][product_data][name]`] = item.name;
    payload[`line_items[${index}][price_data][product_data][metadata][productId]`] = String(item.id);
    payload[`line_items[${index}][price_data][product_data][metadata][selectedSize]`] = item.selectedSize || '';
    payload[`line_items[${index}][price_data][product_data][metadata][selectedColor]`] = item.selectedColor || '';
  });

  const response = await fetch(`${STRIPE_API_BASE}/checkout/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: toFormBody(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message || 'Stripe checkout session creation failed';
    throw new Error(message);
  }

  return data;
}

export async function retrieveStripeCheckoutSession(sessionId) {
  const stripeSecretKey = getStripeKey();

  const response = await fetch(`${STRIPE_API_BASE}/checkout/sessions/${sessionId}?expand[]=line_items`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message || 'Unable to retrieve checkout session';
    throw new Error(message);
  }

  return data;
}
