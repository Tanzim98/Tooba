"use client";
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd send this to an API
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <main className="contact-page">
            <div className="container">
                <header className="page-header">
                    <h1 className="text-gradient">Get In Touch</h1>
                    <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </header>

                <div className="contact-grid">
                    {/* Contact Info */}
                    <div className="contact-info-section">
                        <h2>Contact Information</h2>
                        <p className="info-subtitle">Fill out the form or reach us directly</p>

                        <div className="contact-methods">
                            <div className="contact-method">
                                <div className="method-icon">
                                    <MapPin size={24} />
                                </div>
                                <div className="method-details">
                                    <h3>Visit Us</h3>
                                    <p>123 Fashion Street<br />Dhaka, Bangladesh</p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="method-icon">
                                    <Phone size={24} />
                                </div>
                                <div className="method-details">
                                    <h3>Call Us</h3>
                                    <p>+880 1234-567890<br />Mon-Sat, 9AM-6PM</p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="method-icon">
                                    <Mail size={24} />
                                </div>
                                <div className="method-details">
                                    <h3>Email Us</h3>
                                    <p>info@toobaexport.com<br />support@toobaexport.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="business-hours">
                            <h3>Business Hours</h3>
                            <div className="hours-list">
                                <div className="hours-item">
                                    <span>Monday - Friday</span>
                                    <span>9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="hours-item">
                                    <span>Saturday</span>
                                    <span>10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="hours-item">
                                    <span>Sunday</span>
                                    <span>Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-section">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Your Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject *</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    placeholder="Tell us more about your inquiry..."
                                />
                            </div>

                            <button type="submit" className="btn btn-primary submit-btn">
                                <Send size={20} />
                                Send Message
                            </button>

                            {submitted && (
                                <div className="success-message">
                                    ✓ Thank you! Your message has been sent successfully.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .contact-page {
                    padding: 120px 0 4rem;
                    min-height: 100vh;
                }

                .page-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .page-header h1 {
                    font-size: 3rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                }

                .page-header p {
                    font-size: 1.2rem;
                    color: var(--text-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                }

                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 3rem;
                }

                @media (min-width: 900px) {
                    .contact-grid {
                        grid-template-columns: 1fr 1.2fr;
                    }
                }

                .contact-info-section h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .info-subtitle {
                    color: var(--text-secondary);
                    margin-bottom: 2.5rem;
                }

                .contact-methods {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    margin-bottom: 3rem;
                }

                .contact-method {
                    display: flex;
                    gap: 1.5rem;
                    padding: 1.5rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-md);
                    transition: all 0.3s ease;
                }

                .contact-method:hover {
                    background: rgba(255, 255, 255, 0.05);
                    transform: translateX(5px);
                }

                .method-icon {
                    width: 50px;
                    height: 50px;
                    background: var(--gradient-primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    flex-shrink: 0;
                }

                .method-details h3 {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .method-details p {
                    color: var(--text-secondary);
                    line-height: 1.6;
                }

                .business-hours {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-md);
                    padding: 2rem;
                }

                .business-hours h3 {
                    font-size: 1.3rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                }

                .hours-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .hours-item {
                    display: flex;
                    justify-content: space-between;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    color: var(--text-secondary);
                }

                .hours-item:last-child {
                    border-bottom: none;
                    padding-bottom: 0;
                }

                .contact-form {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-lg);
                    padding: 2.5rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-group label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: var(--text-primary);
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 0.875rem 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-sm);
                    color: var(--text-primary);
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--brand-primary);
                    background: rgba(255, 255, 255, 0.08);
                }

                .form-group textarea {
                    resize: vertical;
                    font-family: inherit;
                }

                .submit-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 1rem;
                    font-size: 1.1rem;
                }

                .success-message {
                    margin-top: 1.5rem;
                    padding: 1rem;
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.3);
                    border-radius: var(--radius-sm);
                    color: #22c55e;
                    text-align: center;
                    animation: slideDown 0.3s ease;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 768px) {
                    .page-header h1 {
                        font-size: 2.5rem;
                    }

                    .contact-form {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </main>
    );
}
