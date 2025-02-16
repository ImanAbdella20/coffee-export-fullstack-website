import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../index.css';
import logo from '../assets/images/images-removebg-preview.png';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const { t } = useTranslation();

  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle hover over dropdown items
  const handleMouseEnter = (menu: string) => {
    setDropdownOpen(menu);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(null);
    }
  };

  const handleItemClick = () => {
    setDropdownOpen(null);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className='flex justify-center bg-[#AD7C59] '   >
      <header className='flex justify-between items-center max-w-[92%] w-full px-4 py-2 '>
        <img src={logo} alt="logo" className="header-item logo w-16 h-auto " />
        <button className="md:hidden block" onClick={toggleMenu}>
          {isOpen ? (
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg ">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          )}
        </button>

        <nav className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-8 absolute md:static top-16 left-0 w-full md:w-auto text-white`}>
          <ul className='flex flex-col md:flex-row items-center gap-4 md:gap-8 p-4 md:p-0' ref={dropdownRef}>
            {/* Home */}
            <li className='text-white hover:text-[#61300d]'>
              <Link to="/" className="header-item home" onClick={handleItemClick}>{t('header.home')}</Link>
            </li>

            {/* About Dropdown */}
            <li 
              className='relative'
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/about">
              
              <button className="about hover:text-[#AD7C59] cursor-pointer">
                {t('header.about')} <span>&#9662;</span>
              </button>

              </Link>
              <ul className={`dropdown-menu ${dropdownOpen === 'about' ? 'show' : ''}`}>
                <li><Link to="/about/#our-story" className="text-white" onClick={handleItemClick}>{t('header.about.story')}</Link></li>
                <li><Link to="/about/#our-team" className="text-white" onClick={handleItemClick}>{t('header.about.team')}</Link></li>
                <li><Link to="/about/#our-mission" className="text-white" onClick={handleItemClick}>{t('header.about.missionVision')}</Link></li>
              </ul>
            </li>

            {/* Products Dropdown */}
            <li 
              className='relative'
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >

              <Link to="/products">
              <button className="products text-white hover:text-[#AD7C59] cursor-pointer">
                {t('header.products')} <span>&#9662;</span>
              </button>
              </Link>
              
              <ul className={`dropdown-menu ${dropdownOpen === 'products' ? 'show' : ''}`}>
                <li><Link to="/products/coffees" className="text-white" onClick={handleItemClick}>{t('header.products.coffees')}</Link></li>
                <li><Link to="/products/special-editions" className="text-white" onClick={handleItemClick}>{t('header.products.specialEditions')}</Link></li>
                <li><Link to="/products/blends" className="text-white" onClick={handleItemClick}>{t('header.products.blends')}</Link></li>
                <li><Link to="/products/subscription" className="text-white" onClick={handleItemClick}>{t('header.products.subscription')}</Link></li>
              </ul>
            </li>

            {/* Blog Dropdown */}
            <li 
              className='relative'
              onMouseEnter={() => handleMouseEnter('blog')}
              onMouseLeave={handleMouseLeave}
            >

              <Link to="/blog">
              <button className="blog text-white hover:text-[#AD7C59] cursor-pointer">
                {t('header.blog')} <span>&#9662;</span>
              </button>
              </Link>
             
              <ul className={`dropdown-menu ${dropdownOpen === 'blog' ? 'show' : ''}`}>
                <li><Link to="/blog/recipes" className="text-white" onClick={handleItemClick}>{t('header.blog.recipes')}</Link></li>
                <li><Link to="/blog/tips" className="text-white" onClick={handleItemClick}>{t('header.blog.tips')}</Link></li>
                <li><Link to="/blog/stories" className="text-white" onClick={handleItemClick}>{t('header.blog.stories')}</Link></li>
              </ul>
            </li>

            {/* Contacts */}
            <li className='text-white hover:text-[#61300d]'>
              <Link to="/contacts" className="header-item contacts" onClick={handleItemClick}>{t('header.contacts')}</Link>
            </li>

          </ul>
        </nav>

        <div className='hidden md:flex space-x-4 text-white'>
          <Link to="/cart" className="header-item cart" onClick={handleItemClick}>
            <svg className="w-6 h-6 hover:text-[#61300d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H7M9 18c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </svg>
          </Link>
          <Link to="/user" className="header-item user move-up" onClick={handleItemClick}>
            <svg className="w-6 h-6 hover:text-[#61300d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"/>
            </svg>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
