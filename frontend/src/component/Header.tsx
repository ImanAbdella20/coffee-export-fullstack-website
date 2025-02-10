import React, { useState } from 'react';
import '../index.css';  
import logo from '../assets/images/images-removebg-preview.png';
import { FaShoppingCart, FaUser } from 'react-icons/fa'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='flex justify-center'>
      <header className='flex justify-between items-center max-w-[92%] w-full px-4 py-2'>
      
        <img src={logo} alt="logo" className="header-item logo w-16 h-auto " />

<button className="md:hidden block " onClick={toggleMenu} >
  {isOpen ? (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg ">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  ) : (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
  )}
</button>

<nav className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-8 absolute md:static top-16 left-0 w-full md:w-auto text-white`}>
  <ul className='flex flex-col md:flex-row items-center gap-4 md:gap-8 p-4 md:p-0'>
    <a href='#' className="header-item home">Home</a>
    <a href='#' className="header-item about">About</a>
    <a href='#' className="header-item products">Products</a>
    <a href='#' className="header-item blog">Blog</a>
    <a href='#' className="header-item contact">Contact</a>
  </ul>
</nav>
        

        <div className='hidden md:flex space-x-4 text-white'>
          <a href='#' className="header-item blog">Cart</a>
          <a href='#' className="header-item contact">user</a>
        </div>
      </header>
    </div>
  );
}

export default Header;
