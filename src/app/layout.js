import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
});

export const metadata = {
  title: "TOOBA Export Zone | Premium Clothing",
  description: "Exclusive fashion for men and kids. Shop the latest trends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <CartProvider>
          <Navbar />
          <CartSidebar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
