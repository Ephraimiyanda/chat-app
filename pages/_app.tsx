"use client"
import type { AppProps } from 'next/app';
import React from 'react';
import Navbar from '@/app/ui/Navbar';
import SideNavbar from '@/app/ui/sidebar';
import "../src/app/globals.css"
import { AppContext } from '../public/context/AppContext';
import  { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [will, setWill] = useState(false);
  return (
    <AppContext.Provider value={{ will }}>
    <div>
      <Navbar />
      <div className="main-content flex">
        <SideNavbar />
        <div className="page-content w-full">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
    </AppContext.Provider>
  );
}

export default MyApp;
