import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ExampleClientComponent from "./clientComponent";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import { ToastContainer } from "react-toastify";
// import "primeflex/primeflex.css";

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
        <ExampleClientComponent>{children}</ExampleClientComponent>
      </body>
    </html>
  );
}
