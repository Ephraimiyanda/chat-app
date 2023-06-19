"use client"
import React, { useState } from 'react';
import Navbar from '../src/app/ui/Navbar';
import SideNavbar from '../src/app/ui/sidebar';
import { AppContext } from '../public/context/AppContext';
import "../src/app/globals.css"
interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [will, setWill] = useState(false);

  return (
    <html lang="en" className="bg-body">
      <body className='bg-body'>
        <AppContext.Provider value={{ will }}>
          <Navbar />
          <div className="flex">
            <div className="absolute h-full">
              <SideNavbar />
            </div>
            <main>{children}</main>
          </div>
        </AppContext.Provider>
      </body>
    </html>
  );
};

export default RootLayout;
