import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../index.css';
import logo from '../assets/images/images-removebg-preview.png';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  user: any; 
}

const Header = ({ user }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const { t } = useTranslation();
  const location = useLocation();



  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartCount(parsedCart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0)); // Update cart count
    }
  }, []); 

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);  // Track hover state for dropdown

  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const handleMouseEnter = (menu: string) => {
    setDropdownOpen(menu);
  };

  const handleMouseLeave = () => {
    if (!isHovering) {
      setDropdownOpen(null);
    }
  };

  const handleItemMouseEnter = () => setIsHovering(true);
  const handleItemMouseLeave = () => setIsHovering(false);

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

  const handleSectionClick = (sectionId: string, pageUrl: string) => {
    if (location.pathname === pageUrl) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `${pageUrl}#${sectionId}`;
    }
  };



  return (
    <div className="flex justify-center bg-[#AD7C59] fullheader">
      <header className="flex justify-between items-center max-w-[92%] w-full px-4 py-2">
        <img src={logo} alt="logo" className="header-item logo w-16 h-auto" />
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
          <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-8 p-4 md:p-0">
            {/* Home */}
            <li className="text-white hover:text-[#61300d]">
              <Link to="/" className="header-item home" onClick={handleItemClick}>
                {t('header.home')}
              </Link>
            </li>

            {/* About Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/about">
                <button className="about hover:text-[#AD7C59] cursor-pointer"
                  onMouseEnter={handleItemMouseEnter}
                  onMouseLeave={handleItemMouseLeave}>
                  {t('header.about')} <span>&#9662;</span>
                </button>
              </Link>
              {/* Dropdown Menu */}
              <ul ref={dropdownRef} className={`dropdown-menu ${dropdownOpen === 'about' ? 'show' : ''}`}>
                <li>
                  <button className="dropdowns" onClick={() => handleSectionClick('our-story', '/about')}>
                    {t('header.about.story')}
                  </button>
                </li>
                <li>
                  <button className="dropdowns" onClick={() => handleSectionClick('our-team', '/about')}>
                    {t('header.about.team')}
                  </button>
                </li>
                <li>
                  <button className="dropdowns" onClick={() => handleSectionClick('our-mission', '/about')}>
                    {t('header.about.missionVision')}
                  </button>
                </li>
              </ul>
            </li>

            {/* Products Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/products">
                <button className="products text-white hover:text-[#AD7C59] cursor-pointer"
                  onMouseEnter={handleItemMouseEnter}
                  onMouseLeave={handleItemMouseLeave}>
                  {t('header.products')} <span>&#9662;</span>
                </button>
              </Link>
              {/* Dropdown Menu */}
              <ul ref={dropdownRef} className={`dropdown-menu ${dropdownOpen === 'products' ? 'show' : ''}`}>
                <li>
                  <button className="dropdowns" onClick={() => handleSectionClick('coffees', '/products')}>
                    {t('header.products.coffees')}
                  </button>
                </li>
                <li>
                  <button className="dropdowns" onClick={() => handleSectionClick('special-editions', '/products')}>
                    {t('header.products.specialEditions')}
                  </button>
                </li>
                <li>
                  <button className="dropdowns" onClick={() => handleSectionClick('subscription', '/products')}>
                    {t('header.products.subscription')}
                  </button>
                </li>
              </ul>
            </li>

            {/* Blog Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter('blog')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/blog">
                <button className="blog text-white hover:text-[#AD7C59] cursor-pointer"
                  onMouseEnter={handleItemMouseEnter}
                  onMouseLeave={handleItemMouseLeave}>
                  {t('header.blog')} <span>&#9662;</span>
                </button>
              </Link>
              {/* Dropdown Menu */}
              <ul ref={dropdownRef} className={`dropdown-menu ${dropdownOpen === 'blog' ? 'show' : ''}`}>
                <li>
                  <button className="dropdowns" onClick={() => handleSectionClick('recipes', '/blog')}>
                    {t('header.blog.recipes')}
                  </button>
                </li>
                <li>
                  <button className="dropdowns" onClick={() => handleSectionClick('tips', '/blog')}>
                    {t('header.blog.tips')}
                  </button>
                </li>
                <li>
                  <button className="dropdowns" onClick={() => handleSectionClick('stories', '/blog')}>
                    {t('header.blog.stories')}
                  </button>
                </li>
              </ul>
            </li>

            {/* Contacts */}
            <li className="text-white hover:text-[#61300d]">
              <Link to="/contacts" className="header-item contacts" onClick={handleItemClick}>
                {t('header.contacts')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex space-x-4 text-white">
          <Link to="/cart" className="header-item cart relative" onClick={handleItemClick}>
            <svg className="w-6 h-6 hover:text-[#61300d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H7M9 18c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </svg>
            {cartCount > 0 && (
              <span className=" cartcount absolute text-xs font-bold text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="header-item user move-up cursor-pointer" onClick={handleItemClick}>
            <svg className="w-6 h-6 hover:text-[#61300d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"/>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
