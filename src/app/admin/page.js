"use client";

import { useEffect, useMemo, useState } from 'react';

const emptyProduct = {
  name: '',
  category: '',
  subCategory: '',
  price: '',
  originalPrice: '',
  stock: '',
  image: '',
  description: '',
};

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [productForm, setProductForm] = useState(emptyProduct);
  const [error, setError] = useState('');

  const categoryOptions = useMemo(() => categories.map((item) => item.slug), [categories]);

  useEffect(() => {
    let active = true;

    async function loadData() {
      const [categoryRes, productRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products'),
      ]);

      const categoryPayload = await categoryRes.json();
      const productPayload = await productRes.json();

      if (active) {
        setCategories(categoryPayload.categories || []);
        setProducts(productPayload.products || []);
      }
    }

    loadData().catch(() => {
      if (active) {
        setError('Failed to load admin data.');
      }
    });

    return () => {
      active = false;
    };
  }, []);

  async function reloadData() {
    const [categoryRes, productRes] = await Promise.all([
      fetch('/api/categories'),
      fetch('/api/products'),
    ]);
    const categoryPayload = await categoryRes.json();
    const productPayload = await productRes.json();
    setCategories(categoryPayload.categories || []);
    setProducts(productPayload.products || []);
  }

  async function addCategory(event) {
    event.preventDefault();
    setError('');

    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryName }),
    });

    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || 'Could not create category.');
      return;
    }

    setCategoryName('');
    await reloadData();
  }

  async function addProduct(event) {
    event.preventDefault();
    setError('');

    const payload = {
      ...productForm,
      price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
      stock: Number(productForm.stock),
      sizes: [],
      colors: [],
    };

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      setError(result.error || 'Could not create product.');
      return;
    }

    setProductForm(emptyProduct);
    await reloadData();
  }

  async function removeProduct(id) {
    const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (response.ok) {
      await reloadData();
    }
  }

  async function removeCategory(id) {
    const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || 'Could not delete category.');
      return;
    }
    await reloadData();
  }

  return (
    <main className="container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
      <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Admin Panel</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Create categories and products from this panel. No static category list is required in the storefront.
      </p>

      {error ? <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p> : null}

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '.75rem' }}>Create Category</h2>
        <form onSubmit={addCategory} style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
          <input
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            placeholder="Category name"
            required
            className="admin-input"
          />
          <button type="submit" className="btn btn-primary">Add Category</button>
        </form>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '.75rem' }}>Create Product</h2>
        <form onSubmit={addProduct} style={{ display: 'grid', gap: '.75rem', maxWidth: '720px' }}>
          <input className="admin-input" placeholder="Product name" value={productForm.name} onChange={(e) => setProductForm((s) => ({ ...s, name: e.target.value }))} required />
          <select className="admin-input" value={productForm.category} onChange={(e) => setProductForm((s) => ({ ...s, category: e.target.value }))} required>
            <option value="">Select category</option>
            {categoryOptions.map((slug) => <option key={slug} value={slug}>{slug}</option>)}
          </select>
          <input className="admin-input" placeholder="Sub-category" value={productForm.subCategory} onChange={(e) => setProductForm((s) => ({ ...s, subCategory: e.target.value }))} required />
          <input className="admin-input" type="number" min="0" step="0.01" placeholder="Price" value={productForm.price} onChange={(e) => setProductForm((s) => ({ ...s, price: e.target.value }))} required />
          <input className="admin-input" type="number" min="0" step="0.01" placeholder="Original price (optional)" value={productForm.originalPrice} onChange={(e) => setProductForm((s) => ({ ...s, originalPrice: e.target.value }))} />
          <input className="admin-input" type="number" min="0" step="1" placeholder="Stock" value={productForm.stock} onChange={(e) => setProductForm((s) => ({ ...s, stock: e.target.value }))} required />
          <input className="admin-input" placeholder="Image URL" value={productForm.image} onChange={(e) => setProductForm((s) => ({ ...s, image: e.target.value }))} required />
          <textarea className="admin-input" placeholder="Description" value={productForm.description} onChange={(e) => setProductForm((s) => ({ ...s, description: e.target.value }))} rows={4} required />
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '.75rem' }}>Categories</h2>
        <ul style={{ display: 'grid', gap: '.5rem', padding: 0, listStyle: 'none' }}>
          {categories.map((category) => (
            <li key={category.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', border: '1px solid var(--glass-border)', padding: '.75rem', borderRadius: '8px' }}>
              <span>{category.name} ({category.slug})</span>
              <button className="btn btn-outline" onClick={() => removeCategory(category.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 style={{ marginBottom: '.75rem' }}>Products</h2>
        <ul style={{ display: 'grid', gap: '.5rem', padding: 0, listStyle: 'none' }}>
          {products.map((product) => (
            <li key={product.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', border: '1px solid var(--glass-border)', padding: '.75rem', borderRadius: '8px' }}>
              <span>#{product.id} {product.name} - {product.category}</span>
              <button className="btn btn-outline" onClick={() => removeProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <style jsx>{`
        .admin-input {
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          padding: .75rem;
        }
      `}</style>
    </main>
  );
}
