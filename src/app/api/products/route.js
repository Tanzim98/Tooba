import { NextResponse } from 'next/server';
import { createProduct, listProducts } from '@/lib/db';

export async function GET() {
  const products = await listProducts();
  return NextResponse.json({ products });
}

export async function POST(request) {
  const body = await request.json();

  if (!body?.name || !body?.category || body?.price === undefined) {
    return NextResponse.json(
      { error: 'name, category and price are required' },
      { status: 400 },
    );
  }

  try {
    await createProduct(body);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
