import type { Metadata } from "next";

import { Header } from "./components/Header";
import  Footer  from "./components/Footer";
import { quicksand } from './fonts'
import { CartProvider}  from "../app/cart/CartContext"
import "./globals.css";

export const metadata: Metadata = {
  title: "Lavand",
  description: "Store to buy your Wines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`  ${quicksand.className}`}>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}