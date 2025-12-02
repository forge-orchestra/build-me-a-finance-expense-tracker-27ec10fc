import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LucideIcon } from 'lucide-react';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Forge App - Finance Expense Tracker',
  description: 'Manage your personal finances efficiently with Forge App.',
  viewport: 'width=device-width, initial-scale=1',
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="bg-gray-100 text-gray-900">
        <div className="min-h-screen flex flex-col">
          <header className="bg-blue-600 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
              <div className="text-lg font-bold">Forge App</div>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/expenses" className="hover:underline">Expenses</a></li>
                <li><a href="/budget" className="hover:underline">Budget</a></li>
                <li><a href="/analytics" className="hover:underline">Analytics</a></li>
              </ul>
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-blue-600 text-white p-4">
            <div className="container mx-auto text-center">
              <p>© 2023 Forge App. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;