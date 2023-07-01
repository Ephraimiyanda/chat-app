"use client"
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Navbar from '@/app/ui/Navbar';
import SideNavbar from '@/app/ui/sidebar';
import "../src/app/globals.css"
import { AppContext } from '../public/context/AppContext';
import  { useState } from 'react';
import useFetch from '../public/fetch/userfetch';
import Cookies from "js-cookie"

function MyApp({ Component, pageProps }: AppProps) {
  const{user}=useFetch(`http://localhost:5000/users/0`);
  Cookies.set("user", JSON.stringify(user));
  const [will, setWill] = useState(false);
  return (
    <AppContext.Provider value={{ will,user }}>
    <div className='fixed w-full'>
      <Navbar />
      <div className="main-content flex">
        <SideNavbar />
        <div className="page-content w-full h-screen">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
    </AppContext.Provider>
  );
}

export default MyApp;
