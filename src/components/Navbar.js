"use client";
import Link from 'next/link';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import styles from './Navbar.module.css';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const { cartCount, toggleCart } = useCart();

    return (
        <nav className={styles.navbar}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                <Link href="/" className={styles.logo}>
                    TOOBA<span className="text-gradient">.</span>
                </Link>
                <ul className={styles.navLinks}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/products?category=men">Men's Collection</Link></li>
                    <li><Link href="/products?category=kids">Kids' Collection</Link></li>
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
