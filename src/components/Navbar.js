"use client";
import Link from 'next/link';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const { cartCount, toggleCart } = useCart();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        let active = true;
        fetch('/api/categories')
            .then((res) => res.json())
            .then((payload) => {
                if (active) setCategories(payload.categories || []);
            })
            .catch(() => {
                if (active) setCategories([]);
            });

        return () => {
            active = false;
        };
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                <Link href="/" className={styles.logo}>
                    TOOBA<span className="text-gradient">.</span>
                </Link>
                <ul className={styles.navLinks}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/products">Products</Link></li>
                    {categories.slice(0, 2).map((category) => (
                        <li key={category.id}>
                            <Link href={`/products?category=${category.slug}`}>{category.name}</Link>
                        </li>
                    ))}
                    <li><Link href="/admin">Admin</Link></li>
                </ul>
                <div className={styles.actions}>
                    <button className={styles.iconBtn} aria-label="Search">
                        <Search size={20} />
                    </button>
                    <button className={styles.iconBtn} aria-label="Cart" onClick={toggleCart}>
                        <ShoppingCart size={20} />
                        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                    </button>
                    <button className={`${styles.iconBtn} md:hidden`} aria-label="Menu" style={{ display: 'none' }}> {/* Mobile trigger to be implemented */}
                        <Menu size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
