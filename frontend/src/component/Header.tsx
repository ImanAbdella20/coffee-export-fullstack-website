import React, { useState } from 'react';
import '../index.css';  
import logo from '../assets/images/images-removebg-preview.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='flex justify-center'>
      <header className='flex justify-between items-center max-w-[92%] w-full px-4 py-2'>
      
        <img src={logo} alt="logo" className="header-item logo w-16 h-auto " />

        <button className="md:hidden block" onClick={toggleMenu} >
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

        <nav className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-8 absolute md:static top-16 left-0 w-full md:w-auto text-white `}>
          <ul className='flex flex-col md:flex-row items-center gap-4 md:gap-8 p-4 md:p-0 '>
            <li className='text-white hover:text-[#AD7C59]'><a href='#' className="header-item home ">Home</a></li>
            <li className='text-white hover:text-[#AD7C59]'><a href='#' className="header-item about">About</a></li>
            <li className='text-white hover:text-[#AD7C59]'>   <a href='#' className="header-item products">Products</a></li>
            <li className='text-white hover:text-[#AD7C59]'> <a href='#' className="header-item blog">Blog</a></li>
            <li className='text-white hover:text-[#AD7C59]'><a href='#' className="header-item blog">Contacts</a></li>
            
         
          </ul>
        </nav>

        <div className='hidden md:flex space-x-4 text-white'>
          <a href='#' className="header-item blog">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3zm3 8h2v-2H6v2zm0-4h2V5H6v2zm0 8h2v-2H6v2zm4-8h2V5h-2v2zm0 4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-8h2V5h-2v2zm0 4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-8h2V5h-2v2zm0 4h2v-2h-2v2zm0 4h2v-2h-2v2z"></path>
            </svg>
          </a>
          <a href='#' className="header-item contact">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7c1.657 0 3-1.343 3-3S13.657 1 12 1s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.206 0-4 1.794-4 4v3h8v-3c0-2.206-1.794-4-4-4zm-8 8v5h16v-5H4z"></path>
            </svg>
          </a>
        </div>
      </header>
    </div>
  );
}

export default Header;
