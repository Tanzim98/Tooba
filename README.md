# TOOBA Export Zone - Full-Stack E-Commerce

Modern Next.js storefront with an integrated backend API, file-based database management, and Stripe Checkout payment flow.

## What is included

- Product browsing, filtering, and details pages
- Cart management with quantity/variant support
- Backend APIs for products and checkout
- Persistent database file (`src/server/db.json`) with product inventory and order history
- Stripe Checkout session creation + payment confirmation
- Order creation and stock deduction after successful payment

## Stack

- Next.js 16 (App Router)
- React 19
- Node.js route handlers (`src/app/api/*`)
- JSON database management layer (`src/lib/db.js`)
- Stripe REST API integration (`src/lib/payment.js`)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env.local
   ```
3. Set your Stripe test secret key in `.env.local`:
   ```bash
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
4. Run app:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/products` - list all products
- `GET /api/products/:id` - get single product
- `POST /api/checkout` - create Stripe checkout session from cart
- `POST /api/checkout/confirm` - confirm payment and create order

## Payment flow

1. User clicks **Proceed to Checkout**.
2. Frontend posts cart items to `/api/checkout`.
3. Backend validates stock and creates Stripe Checkout session.
4. User pays on Stripe-hosted page.
5. Stripe redirects back to `/checkout/success` with `session_id`.
6. Frontend calls `/api/checkout/confirm` to verify payment.
7. Backend writes order + updates inventory in `src/server/db.json`.

## Notes

- The database file is auto-created and auto-seeded from `src/data/products.js` on first API call.
- Use Stripe **test mode** keys while developing.
- This implementation is production-oriented in architecture, but for high scale you should replace the JSON store with Postgres/MySQL.
