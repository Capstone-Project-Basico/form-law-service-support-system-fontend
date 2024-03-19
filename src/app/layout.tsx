import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ExampleClientComponent from "./clientComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Basico",
  description: "Basico website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <ExampleClientComponent>
            <main>{children}</main>
          </ExampleClientComponent>
        </div>
      </body>
    </html>
  );
}
