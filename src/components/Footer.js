"use client";
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-col">
                        <h3 className="footer-logo">TOOBA</h3>
                        <p className="footer-desc">
                            Premium clothing for men and kids. Quality, style, and comfort in every piece.
                        </p>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/products">Shop All</Link></li>
                            <li><Link href="/products?category=men">Men's Collection</Link></li>
                            <li><Link href="/products?category=kids">Kids' Collection</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="footer-col">
                        <h4>Customer Service</h4>
                        <ul>
                            <li><Link href="/contact">Contact Us</Link></li>
                            <li><Link href="/shipping">Shipping Info</Link></li>
                            <li><Link href="/returns">Returns & Exchanges</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="/size-guide">Size Guide</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-col">
                        <h4>Get In Touch</h4>
                        <div className="contact-info">
                            <div className="contact-item">
                                <MapPin size={18} />
                                <span>123 Fashion Street, Dhaka, Bangladesh</span>
                            </div>
                            <div className="contact-item">
                                <Phone size={18} />
                                <span>+880 1234-567890</span>
                            </div>
                            <div className="contact-item">
                                <Mail size={18} />
                                <span>info@toobaexport.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} TOOBA Export Zone. All rights reserved.</p>
                    <div className="footer-links">
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .footer {
                    background: linear-gradient(180deg, rgba(10, 10, 10, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%);
                    border-top: 1px solid var(--glass-border);
                    padding: 4rem 0 2rem;
                    margin-top: 6rem;
                }

                .footer-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 3rem;
                    margin-bottom: 3rem;
                }

                .footer-col h3,
                .footer-col h4 {
                    margin-bottom: 1.5rem;
                    font-weight: 700;
                }

                .footer-logo {
                    font-size: 1.8rem;
                    background: var(--gradient-primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .footer-desc {
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }

                .social-links {
                    display: flex;
                    gap: 1rem;
                }

                .social-links a {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--glass-border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-secondary);
                    transition: all 0.3s ease;
                }

                .social-links a:hover {
                    background: var(--brand-primary);
                    border-color: var(--brand-primary);
                    color: white;
                    transform: translateY(-3px);
                }

                .footer-col ul {
                    list-style: none;
                    padding: 0;
                }

                .footer-col ul li {
                    margin-bottom: 0.75rem;
                }

                .footer-col ul li a {
                    color: var(--text-secondary);
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .footer-col ul li a:hover {
                    color: var(--brand-primary);
                }

                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .contact-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    color: var(--text-secondary);
                }

                .contact-item :global(svg) {
                    flex-shrink: 0;
                    margin-top: 2px;
                    color: var(--brand-primary);
                }

                .footer-bottom {
                    padding-top: 2rem;
                    border-top: 1px solid var(--glass-border);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }

                .footer-links {
                    display: flex;
                    gap: 2rem;
                }

                .footer-links a {
                    color: var(--text-secondary);
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .footer-links a:hover {
                    color: var(--brand-primary);
                }

                @media (max-width: 768px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .footer-bottom {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>
        </footer>
    );
}
