import { promises as fs } from 'fs';
import path from 'path';
import { products as seedProducts } from '@/data/products';

const DB_PATH = path.join(process.cwd(), 'src/server/db.json');

let writeQueue = Promise.resolve();

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function uniqueBy(items, key) {
  const seen = new Set();
  return items.filter((item) => {
    const k = item[key];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

const defaultDb = () => ({
  categories: uniqueBy(seedProducts, 'category').map((product, index) => ({
    id: index + 1,
    name: product.category,
    slug: slugify(product.category),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  products: seedProducts.map((product, index) => ({
    ...product,
    id: Number(product.id || index + 1),
    category: slugify(product.category),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  nextProductId: seedProducts.length + 1,
  nextCategoryId: uniqueBy(seedProducts, 'category').length + 1,
  orders: [],
});

function normalizeDb(rawDb) {
  const db = {
    ...defaultDb(),
    ...rawDb,
  };

  db.products = (db.products || []).map((product, index) => ({
    ...product,
    id: Number(product.id || index + 1),
    category: slugify(product.category),
    createdAt: product.createdAt || new Date().toISOString(),
    updatedAt: product.updatedAt || new Date().toISOString(),
  }));

  db.categories = Array.isArray(rawDb?.categories)
    ? rawDb.categories
    : uniqueBy(db.products, 'category').map((product, index) => ({
      id: index + 1,
      name: product.category,
      slug: slugify(product.category),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

  db.categories = db.categories.map((category, index) => ({
    id: Number(category.id || index + 1),
    name: category.name || category.slug,
    slug: slugify(category.slug || category.name),
    createdAt: category.createdAt || new Date().toISOString(),
    updatedAt: category.updatedAt || new Date().toISOString(),
  }));

  db.nextProductId = Math.max(
    db.nextProductId || 1,
    ...db.products.map((product) => product.id + 1),
    1,
  );
  db.nextCategoryId = Math.max(
    db.nextCategoryId || 1,
    ...db.categories.map((category) => category.id + 1),
    1,
  );

  return db;
}

async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(defaultDb(), null, 2), 'utf-8');
  }
}

export async function readDb() {
  await ensureDb();
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  return normalizeDb(JSON.parse(raw));
}

export async function writeDb(updater) {
  writeQueue = writeQueue.then(async () => {
    const current = await readDb();
    const next = await updater(structuredClone(current));
    await fs.writeFile(DB_PATH, JSON.stringify(next, null, 2), 'utf-8');
    return next;
  });

  return writeQueue;
}

export async function listProducts() {
  const db = await readDb();
  return db.products;
}

export async function createProduct(input) {
  return writeDb((db) => {
    const now = new Date().toISOString();
    db.products.push({
      id: db.nextProductId,
      name: input.name,
      category: slugify(input.category),
      subCategory: input.subCategory || 'general',
      price: Number(input.price),
      originalPrice: input.originalPrice ? Number(input.originalPrice) : undefined,
      sizes: input.sizes || [],
      colors: input.colors || [],
      stock: Number(input.stock || 0),
      rating: Number(input.rating || 0),
      image: input.image || '',
      description: input.description || '',
      tag: input.tag || undefined,
      createdAt: now,
      updatedAt: now,
    });

    db.nextProductId += 1;
    return db;
  });
}

export async function getProductById(id) {
  const db = await readDb();
  return db.products.find((product) => product.id === id) ?? null;
}

export async function updateProduct(id, input) {
  return writeDb((db) => {
    const product = db.products.find((item) => item.id === id);
    if (!product) {
      throw new Error('Product not found');
    }

    Object.assign(product, {
      ...input,
      category: input.category ? slugify(input.category) : product.category,
      price: input.price !== undefined ? Number(input.price) : product.price,
      originalPrice: input.originalPrice !== undefined
        ? Number(input.originalPrice)
        : product.originalPrice,
      stock: input.stock !== undefined ? Number(input.stock) : product.stock,
      rating: input.rating !== undefined ? Number(input.rating) : product.rating,
      updatedAt: new Date().toISOString(),
    });

    return db;
  });
}

export async function deleteProduct(id) {
  return writeDb((db) => {
    db.products = db.products.filter((item) => item.id !== id);
    return db;
  });
}

export async function listCategories() {
  const db = await readDb();
  return db.categories;
}

export async function createCategory(input) {
  return writeDb((db) => {
    const slug = slugify(input.slug || input.name || '');
    if (!slug) throw new Error('Category slug is required');
    if (db.categories.some((category) => category.slug === slug)) {
      throw new Error('Category already exists');
    }

    const now = new Date().toISOString();
    db.categories.push({
      id: db.nextCategoryId,
      name: input.name || slug,
      slug,
      createdAt: now,
      updatedAt: now,
    });
    db.nextCategoryId += 1;
    return db;
  });
}

export async function deleteCategory(id) {
  return writeDb((db) => {
    const category = db.categories.find((item) => item.id === id);
    if (!category) throw new Error('Category not found');
    const inUse = db.products.some((product) => product.category === category.slug);
    if (inUse) throw new Error('Cannot delete category with products');

    db.categories = db.categories.filter((item) => item.id !== id);
    return db;
  });
}

export async function createOrder({
  customerEmail,
  items,
  subtotal,
  currency = 'usd',
  paymentProvider,
  paymentReference,
  status,
}) {
  return writeDb((db) => {
    const now = new Date().toISOString();
    const id = db.orders.length + 1;

    const order = {
      id,
      customerEmail,
      items,
      subtotal,
      currency,
      paymentProvider,
      paymentReference,
      status,
      createdAt: now,
      updatedAt: now,
    };

    db.orders.push(order);
    return db;
  });
}

export async function findOrderByPaymentReference(paymentReference) {
  const db = await readDb();
  return db.orders.find((order) => order.paymentReference === paymentReference) ?? null;
}

export async function updateStockByOrderItems(items) {
  return writeDb((db) => {
    for (const item of items) {
      const product = db.products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Product ${item.id} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }
      product.stock -= item.quantity;
      product.updatedAt = new Date().toISOString();
    }

    return db;
  });
}
