# TOOBA Export Zone - E-Commerce Platform

A modern, premium e-commerce platform for men's and kids' clothing built with Next.js 16 and React 19.

![TOOBA Export Zone](https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop)

## 🌟 Features

### Core Functionality
- **Product Catalog**: Browse 20+ premium clothing items across multiple categories
- **Advanced Filtering**: Filter products by category (Men/Kids) and subcategory (Shirts, Pants, T-Shirts, Polos, Jackets)
- **Product Details**: Detailed product pages with size/color selection, ratings, and descriptions
- **Shopping Cart**: Full-featured cart with add/remove/update quantity functionality
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)

### Pages
- **Home**: Hero section with featured products
- **Products**: Complete catalog with filtering options
- **Product Details**: Individual product pages with full information
- **About**: Company story and values
- **Contact**: Contact form and business information
- **Cart Sidebar**: Slide-out cart for quick checkout

### Design Features
- **Premium UI/UX**: Modern glassmorphism design with smooth animations
- **Dark Theme**: Elegant dark mode with gradient accents
- **Custom Typography**: Google Fonts (Outfit) for professional appearance
- **Micro-animations**: Smooth transitions and hover effects
- **Gradient Accents**: Eye-catching gradient elements throughout

## 🚀 Tech Stack

- **Framework**: [Next.js 16.1.4](https://nextjs.org/) (App Router)
- **React**: 19.2.3
- **Styling**: Vanilla CSS with CSS Modules and JSX Styles
- **Icons**: [Lucide React](https://lucide.dev/)
- **Image Optimization**: Next.js Image component
- **State Management**: React Context API
- **Font**: Google Fonts (Outfit)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tooba-export-zone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
tooba-export-zone/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── products/          # Products listing
│   │   │   └── [id]/         # Dynamic product details
│   │   ├── layout.js          # Root layout with navbar/footer
│   │   ├── page.js            # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── CartSidebar.js    # Shopping cart sidebar
│   │   ├── Footer.js         # Footer component
│   │   ├── Hero.js           # Hero section
│   │   ├── Navbar.js         # Navigation bar
│   │   └── ProductCard.js    # Product card component
│   ├── context/              # React Context
│   │   └── CartContext.js    # Cart state management
│   └── data/                 # Static data
│       └── products.js       # Product catalog
├── public/                   # Static assets
├── package.json
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: Gold gradient (#eab308)
- **Secondary**: Purple (#8b5cf6)
- **Background**: Dark (#0a0a0a)
- **Text Primary**: White (#ffffff)
- **Text Secondary**: Gray (#aaaaaa)

### CSS Variables
```css
--brand-primary: #eab308;
--brand-secondary: #8b5cf6;
--brand-accent: #ef4444;
--gradient-primary: linear-gradient(135deg, #eab308 0%, #8b5cf6 100%);
--glass-border: rgba(255, 255, 255, 0.1);
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 16px;
```

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📱 Features Breakdown

### Shopping Cart
- Add products with size and color selection
- Update quantities
- Remove items
- Real-time total calculation
- Persistent cart state (Context API)
- Slide-out sidebar interface

### Product Filtering
- Filter by main category (All/Men/Kids)
- Filter by subcategory (Shirts, Pants, T-Shirts, Polos, Jackets)
- Real-time filtering with smooth transitions
- "No results" state with clear filters option

### Product Details
- High-quality product images
- Size and color selection
- Stock availability
- Customer ratings
- Quantity selector
- Discount badges
- Product features list

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is private and proprietary.

## 👥 Contact

**TOOBA Export Zone**
- Email: info@toobaexport.com
- Phone: +880 1234-567890
- Address: 123 Fashion Street, Dhaka, Bangladesh

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- Built with [Next.js](https://nextjs.org)

---

**Made with ❤️ by TOOBA Export Zone Team**
