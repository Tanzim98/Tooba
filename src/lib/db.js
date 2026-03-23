import { promises as fs } from 'fs';
import path from 'path';
import { products as seedProducts } from '@/data/products';

const DB_PATH = path.join(process.cwd(), 'src/server/db.json');

let writeQueue = Promise.resolve();

const defaultDb = () => ({
  products: seedProducts.map((product) => ({
    ...product,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  orders: [],
});

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
  return JSON.parse(raw);
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

export async function getProductById(id) {
  const db = await readDb();
  return db.products.find((product) => product.id === id) ?? null;
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
