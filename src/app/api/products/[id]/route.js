import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/db';

export async function GET(_request, { params }) {
  const id = Number(params.id);

  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ product });
}
