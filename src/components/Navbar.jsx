import React from 'react'
import { useState, useEffect } from 'react';
import Logo from '../images/Logo.png';
import { Link } from "react-router-dom";
import Login from "../components/Login";

function Navbar() {
  const [MobileNav, setMobileNav] = useState(false);
  const [ActiveLink, setActiveLink] = useState("Home");
  const [IsLoginOpen, setIsLoginOpen] = useState(false);
  const [LoginBtn, setLoginBtn] = useState(true);

  useEffect(() => {
    if(sessionStorage.getItem("userID")) {
      setLoginBtn(false);
    } else {
      setLoginBtn(true);
    }
  })

  return (
    <>
      <nav className='flex justify-between items-center py-2 md:px-0'>
        <div>
          <Link to='/'><img src={Logo} alt='logo' /></Link>
        </div>
        <div className={`md:block ${MobileNav ? 'flex' : 'hidden'} justify-center items-center flex-col absolute md:static w-full md:w-auto h-screen md:h-auto left-0 top-0 bg-white z-40`}>
          <i className='bx bx-exit cursor-pointer text-xl absolute right-8 top-5 md:hidden' onClick={() => { setMobileNav(false) }}></i>
          <Link to="/" className={`mx-2 ${ActiveLink === "Home" && 'font-semibold'} text-NavText`} onClick={() => { setActiveLink("Home"); setMobileNav(false) }}>Home</Link>
          <a href="#" className={`mx-2 ${ActiveLink === "About" && 'font-semibold'} text-NavText`} onClick={() => { setActiveLink("About"); setMobileNav(false) }}>About</a>
          <Link to="/places" className={`mx-2 ${ActiveLink === "Places" && 'font-semibold'} text-NavText`} onClick={() => { setActiveLink("Places"); setMobileNav(false) }}>Places</Link>
          <a href="#" className={`mx-2 ${ActiveLink === "Careers" && 'font-semibold'} text-NavText`} onClick={() => { setActiveLink("Careers"); setMobileNav(false) }}>Careers</a>
          <Link to="/blog" className={`mx-2 ${ActiveLink === "Blog" && 'font-semibold'} text-NavText`} onClick={() => { setActiveLink("Blog"); setMobileNav(false) }}>Blog</Link>
        </div>
        <div>
          {LoginBtn ? 
            <button className='bg-primary text-sm md:text-base text-white px-3 py-1 rounded-full' onClick={() => { setIsLoginOpen(true) }}>Connect</button>
            : 
            <Link to="/profile" className='bg-primary text-sm md:text-base text-white px-3 py-1 rounded-full' onClick={() => { setActiveLink("") }}>Profile</Link>
          }
        </div>
        <div className='md:hidden' onClick={() => { setMobileNav(true) }}>
          <i className='bx bx-menu-alt-right text-xl cursor-pointer'></i>
        </div>
      </nav>
      <Login status={IsLoginOpen} isOpen={setIsLoginOpen}/>
    </>
  )
}

export default Navbar