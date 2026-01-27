"use client";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
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
                        Premium quality clothing for Men & Kids. Discover the latest limited edition collection.
                    </p>
                    <div className="animate-fade-in delay-200" style={{ display: 'flex', gap: '1rem' }}>
                        <Link href="/products?category=men" className="btn btn-primary">
                            Shop Men <ArrowRight size={18} />
                        </Link>
                        <Link href="/products?category=kids" className="btn btn-outline">
                            Shop Kids
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
