import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ExampleClientComponent from './clientComponent';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Basico',
  description: 'Basico website',
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
