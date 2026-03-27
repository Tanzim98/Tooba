import { NextResponse } from 'next/server';
import { createCategory, listCategories } from '@/lib/db';

export async function GET() {
  const categories = await listCategories();
  return NextResponse.json({ categories });
}

export async function POST(request) {
  const body = await request.json();

  if (!body?.name && !body?.slug) {
    return NextResponse.json({ error: 'name or slug is required' }, { status: 400 });
  }

  try {
    await createCategory(body);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
