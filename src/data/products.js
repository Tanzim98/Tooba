export const products = [
    {
        id: 1,
        name: "Classic Premium Cotton Shirt",
        category: "men",
        subCategory: "shirt",
        price: 35.00,
        originalPrice: 45.00,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Navy Blue", "Black"],
        stock: 50,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=2525&auto=format&fit=crop",
        description: "A tailored fit premium cotton shirt perfect for formal and casual occasions. Breathable fabric ensuring all-day comfort."
    },
    {
        id: 2,
        name: "Slim Fit Chino Pants",
        category: "men",
        subCategory: "pant",
        price: 42.00,
        sizes: ["30", "32", "34", "36"],
        colors: ["Khaki", "Olive", "Navy"],
        stock: 35,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2597&auto=format&fit=crop",
        description: "Modern slim fit chinos made with stretchable fabric for maximum mobility and style."
    },
    {
        id: 3,
        name: "Urban Street T-Shirt",
        category: "men",
        subCategory: "t-shirt",
        price: 25.00,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "White", "Grey"],
        stock: 100,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2564&auto=format&fit=crop",
        description: "High-quality cotton t-shirt with a relaxed fit. Essential for any streetwear wardrobe."
    },
    {
        id: 4,
        name: "Kids Playful Polo",
        category: "kids",
        subCategory: "polo",
        price: 20.00,
        originalPrice: 28.00,
        sizes: ["4Y", "6Y", "8Y", "10Y"],
        colors: ["Red", "Blue", "Yellow"],
        stock: 40,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1622290291314-1f256e35f62c?q=80&w=2670&auto=format&fit=crop",
        description: "Colorful and durable polo shirt suitable for active kids. Soft fabric to prevent irritation."
    },
    {
        id: 5,
        name: "Denim Jacket",
        category: "men",
        subCategory: "others",
        price: 65.00,
        sizes: ["M", "L", "XL"],
        colors: ["Blue Denim"],
        stock: 20,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=2574&auto=format&fit=crop",
        description: "Classic denim jacket with a rugged look. Perfect for layering."
    },
    {
        id: 6,
        name: "Summer Shorts",
        category: "kids",
        subCategory: "pant",
        price: 18.00,
        sizes: ["4Y", "6Y", "8Y", "10Y"],
        colors: ["Beige", "Green"],
        stock: 60,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1519278409-1f56fdda78bf?q=80&w=2574&auto=format&fit=crop",
        description: "Lightweight and comfortable shorts for the summer season."
    }
];

export const categories = [
    { id: 'all', name: 'All Collection' },
    { id: 'men', name: 'Men\'s Clothing' },
    { id: 'kids', name: 'Kids\' Clothing' }
];

export const subCategories = [
    { id: 'all', name: 'All Types' },
    { id: 'shirt', name: 'Shirts' },
    { id: 'pant', name: 'Pants' },
    { id: 't-shirt', name: 'T-Shirts' },
    { id: 'polo', name: 'Polos' }
];
