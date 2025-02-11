import React, { useState, useEffect, useRef } from 'react';
import '../index.css';  
import logo from '../assets/images/images-removebg-preview.png';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const toggleDropdown = (menu: string) => {
    setDropdownOpen(prev => (prev === menu ? null : menu));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          <ul className='flex flex-col md:flex-row items-center gap-4 md:gap-8 p-4 md:p-0 ' ref={dropdownRef}>
          <li className='text-white hover:text-[#AD7C59]'><a href='#' className="header-item home">Home</a></li>
            <li className='text-white hover:text-[#AD7C59]' onClick={() => toggleDropdown('about')}>
              <a href='#' className="header-item about">About <span>&#9662;</span></a>
              <ul className={`dropdown-menu ${dropdownOpen === 'about' ? 'show' : ''}`}>
                <li><a href='#'>Our Story</a></li>
                <li><a href='#'>Team</a></li>
                <li><a href='#'>Mission $ Vision</a></li>
              </ul>
            </li>
            <li className='text-white hover:text-[#AD7C59]' onClick={() => toggleDropdown('products')}>
              <a href='#' className="header-item products">Products <span>&#9662;</span></a>
              <ul className={`dropdown-menu ${dropdownOpen === 'products' ? 'show' : ''}`}>
                <li><a href='#'>Our coffees</a></li>
                <li><a href='#'>Special Editions</a></li>
                <li><a href='#'>Blends</a></li>
                <li><a href='#'>Subscription Service</a></li>
              </ul>
            </li>
            <li className='text-white hover:text-[#AD7C59]' onClick={() => toggleDropdown('blog')}>
              <a href='#' className="header-item blog">Blog <span>&#9662;</span></a>
              <ul className={`dropdown-menu ${dropdownOpen === 'blog' ? 'show' : ''}`}>
                <li><a href='#'>Coffee Recipes</a></li>
                <li><a href='#'>Coffee Brewing Tips</a></li>
                <li><a href='#'>Customer Stories</a></li>
              </ul>
            </li>
            <li className='text-white hover:text-[#AD7C59]'><a href='#' className="header-item contacts">Contacts</a></li>
          </ul>
        </nav>

        <div className='hidden md:flex space-x-4 text-white'>
          <a href='#' className="header-item cart">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H7M9 18c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </svg>
          </a>
          <a href='#' className="header-item user move-up">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"/>
            </svg>
          </a>
        </div>
      </header>
    </div>
  );
}

export default Header;
