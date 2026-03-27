"use client";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
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
        <section className={styles.hero}>
            <div className={styles.bg}>
                <div className={`${styles.blob} ${styles.blob1}`}></div>
                <div className={`${styles.blob} ${styles.blob2}`}></div>
            </div>
            <div className="container">
                <div className={styles.content}>
                    <h1 className={`${styles.title} animate-fade-in`}>
                        Elevate Your <br />
                        <span className="text-gradient">Style Game.</span>
                    </h1>
                    <p className={`${styles.subtitle} animate-fade-in delay-100`}>
                        Premium quality clothing with categories managed from your admin dashboard.
                    </p>
                    <div className="animate-fade-in delay-200" style={{ display: 'flex', gap: '1rem' }}>
                        {categories[0] ? (
                            <Link href={`/products?category=${categories[0].slug}`} className="btn btn-primary">
                                Shop {categories[0].name} <ArrowRight size={18} />
                            </Link>
                        ) : (
                            <Link href="/products" className="btn btn-primary">
                                Shop Collection <ArrowRight size={18} />
                            </Link>
                        )}
                        <Link href="/products" className="btn btn-outline">
                            Browse All
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
