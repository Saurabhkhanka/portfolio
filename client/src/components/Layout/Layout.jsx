import React, { useEffect } from 'react'
import Headder from './Headder'
import Footer from './Footer'
import {ToastContainer} from 'react-toastify'
import { useLocation } from 'react-router-dom'

const Layout = ({children}) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
        <Headder/>
        <main style={{ minHeight: '80vh', paddingBottom: '80px' , marginTop:"10vh"}}>
          <ToastContainer/>
            {children}
        </main>
        <Footer/>
    </>
  )
}

export default Layout
