"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Award, Users, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <h1 className="text-gradient">About TOOBA Export Zone</h1>
                    <p className="hero-subtitle">
                        Crafting premium fashion experiences since our inception.
                        Quality, style, and comfort in every stitch.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-content">
                            <h2>Our Story</h2>
                            <p>
                                TOOBA Export Zone was founded with a simple mission: to provide high-quality,
                                stylish clothing for men and kids at accessible prices. What started as a small
                                venture has grown into a trusted name in fashion retail.
                            </p>
                            <p>
                                We believe that everyone deserves to look and feel their best. That's why we
                                carefully curate our collections, ensuring each piece meets our strict standards
                                for quality, comfort, and style.
                            </p>
                            <p>
                                From classic essentials to trendy statement pieces, our diverse range caters to
                                various tastes and occasions. We're committed to sustainable practices and ethical
                                sourcing, because fashion should never come at the cost of our planet or people.
                            </p>
                        </div>
                        <div className="story-image">
                            <div className="image-wrapper">
                                <Image
                                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop"
                                    alt="Fashion store interior"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="container">
                    <h2 className="section-title">Our Core Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">
                                <Award size={32} />
                            </div>
                            <h3>Quality First</h3>
                            <p>
                                We never compromise on quality. Every product is carefully inspected to
                                ensure it meets our high standards.
                            </p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <Users size={32} />
                            </div>
                            <h3>Customer Focused</h3>
                            <p>
                                Your satisfaction is our priority. We're here to provide exceptional
                                service and support at every step.
                            </p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <Globe size={32} />
                            </div>
                            <h3>Sustainability</h3>
                            <p>
                                We're committed to sustainable practices and reducing our environmental
                                footprint in everything we do.
                            </p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">
                                <Heart size={32} />
                            </div>
                            <h3>Passion for Fashion</h3>
                            <p>
                                Fashion is our passion. We stay ahead of trends to bring you the latest
                                styles that make you look amazing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Elevate Your Wardrobe?</h2>
                        <p>Explore our latest collection and discover your new favorite pieces.</p>
                        <Link href="/products" className="btn btn-primary">
                            Shop Now
                        </Link>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .about-page {
                    padding-top: 80px;
                }

                .about-hero {
                    padding: 6rem 0 4rem;
                    text-align: center;
                    background: linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
                }

                .about-hero h1 {
                    font-size: 3.5rem;
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                }

                .hero-subtitle {
                    font-size: 1.3rem;
                    color: var(--text-secondary);
                    max-width: 700px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .story-section {
                    padding: 6rem 0;
                }

                .story-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 4rem;
                    align-items: center;
                }

                @media (min-width: 900px) {
                    .story-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                .story-content h2 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 2rem;
                }

                .story-content p {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: var(--text-secondary);
                    margin-bottom: 1.5rem;
                }

                .image-wrapper {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 4/3;
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }

                .values-section {
                    padding: 6rem 0;
                    background: rgba(255, 255, 255, 0.02);
                }

                .section-title {
                    text-align: center;
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 4rem;
                }

                .values-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2.5rem;
                }

                .value-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-md);
                    padding: 2.5rem 2rem;
                    text-align: center;
                    transition: all 0.3s ease;
                }

                .value-card:hover {
                    transform: translateY(-5px);
                    background: rgba(255, 255, 255, 0.05);
                    border-color: var(--brand-primary);
                }

                .value-icon {
                    width: 70px;
                    height: 70px;
                    margin: 0 auto 1.5rem;
                    background: var(--gradient-primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }

                .value-card h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .value-card p {
                    color: var(--text-secondary);
                    line-height: 1.6;
                }

                .cta-section {
                    padding: 6rem 0;
                }

                .cta-content {
                    text-align: center;
                    background: linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-lg);
                    padding: 4rem 2rem;
                }

                .cta-content h2 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .cta-content p {
                    font-size: 1.2rem;
                    color: var(--text-secondary);
                    margin-bottom: 2rem;
                }

                @media (max-width: 768px) {
                    .about-hero h1 {
                        font-size: 2.5rem;
                    }

                    .hero-subtitle {
                        font-size: 1.1rem;
                    }

                    .story-content h2,
                    .section-title,
                    .cta-content h2 {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </main>
    );
}
