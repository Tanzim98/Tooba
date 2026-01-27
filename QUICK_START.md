# 🚀 Quick Start Guide - TOOBA Export Zone

## Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Run Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
Navigate to: **http://localhost:3000**

---

## 🎯 What You'll See

### Home Page (/)
- Beautiful hero section
- 6 featured products
- Call-to-action buttons

### Products Page (/products)
- Full product catalog (20 items)
- Filter by category (Men/Kids)
- Filter by type (Shirts, Pants, T-Shirts, etc.)

### Product Details (/products/[id])
- Click any product to see details
- Select size and color
- Add to cart
- View ratings and description

### About Page (/about)
- Company story
- Core values
- Beautiful imagery

### Contact Page (/contact)
- Contact form
- Business hours
- Contact information

---

## 🛒 Try the Shopping Cart

1. Browse products
2. Click "Add to Cart" on any product
3. Click the cart icon (top right)
4. View your cart in the sidebar
5. Update quantities or remove items
6. See real-time total calculation

---

## 🎨 Features to Explore

✨ **Hover Effects** - Hover over products, buttons, and cards
🎭 **Smooth Animations** - Notice the fade-in and slide effects
🔍 **Filtering** - Try different category combinations
📱 **Responsive** - Resize your browser or check on mobile
🌙 **Dark Theme** - Enjoy the premium dark design

---

## 📂 Key Files to Know

```
src/
├── app/
│   ├── page.js              # Home page
│   ├── products/page.js     # Products listing
│   └── layout.js            # Main layout (navbar + footer)
├── components/
│   ├── Navbar.js            # Top navigation
│   ├── Footer.js            # Bottom footer
│   └── CartSidebar.js       # Shopping cart
├── data/
│   └── products.js          # Product data (edit here!)
└── context/
    └── CartContext.js       # Cart state management
```

---

## 🎨 Customize Your Store

### Change Products
Edit: `src/data/products.js`

### Change Colors
Edit: `src/app/globals.css` (CSS variables)

### Change Logo/Brand Name
Edit: `src/components/Navbar.js` and `src/components/Footer.js`

---

## 🔧 Available Commands

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build

# Run production server
npm start

# Check for code issues
npm run lint
```

---

## 💡 Tips

1. **Cart persists** - Your cart items stay even when you navigate between pages
2. **Filters are live** - Product filtering happens instantly
3. **Images are optimized** - Next.js automatically optimizes all images
4. **Mobile-friendly** - Try it on your phone!

---

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Check `PROJECT_SUMMARY.md` for complete feature list
- All pages have proper error handling
- Console logs can help debug issues

---

## ✅ Quick Test Checklist

- [ ] Home page loads
- [ ] Can navigate to Products page
- [ ] Can filter products
- [ ] Can click on a product to see details
- [ ] Can add product to cart
- [ ] Cart icon shows item count
- [ ] Can open cart sidebar
- [ ] Can update cart quantities
- [ ] Can navigate to About page
- [ ] Can submit contact form

---

**Enjoy your TOOBA Export Zone e-commerce platform! 🎉**

*Built with Next.js 16, React 19, and ❤️*
