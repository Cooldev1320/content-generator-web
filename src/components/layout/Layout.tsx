'use client';

import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showFooter?: boolean;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showSidebar = true,
  showFooter = false,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {showSidebar ? (
        // Dashboard Layout with Sidebar
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col w-0 flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 relative overflow-y-auto focus:outline-none">
              <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        // Simple Layout without Sidebar
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          {showFooter && <Footer />}
        </div>
      )}
    </div>
  );
};

export default Layout;