import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../index.css';
import logo from '../assets/images/images-removebg-preview.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  user: any;
}

const Header = ({ user }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [userIconOpen, setUserIconOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(!!user);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const userIconRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Language change handler
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    setLanguageDropdownOpen(false);
    localStorage.setItem('preferredLanguage', lang);
  };

  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setSelectedLanguage(savedLanguage);
    }
  }, [i18n]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to update the cart count from localStorage
  const updateCartCount = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartCount(parsedCart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0));
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();
    const handleStorageChange = () => {
      updateCartCount();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownOpen(menu);
  };

  const handleMouseLeave = (menu: string) => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(null);
    }, 300); // 300ms delay before closing
  };

  const handleDropdownItemClick = (sectionId: string, pageUrl: string) => {
    handleSectionClick(sectionId, pageUrl);
    setDropdownOpen(null); // Close dropdown after click
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(null);
    }
    if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
      setLanguageDropdownOpen(false);
    }
  };

  const handleItemClick = () => {
    setUserIconOpen(!userIconOpen);
  };

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

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
    setUserIconOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

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
              onMouseLeave={() => handleMouseLeave('about')}
            >
              <Link to="/about" className="flex items-center">
                <button className="about hover:text-[#AD7C59] cursor-pointer">
                  {t('header.about')} <span>&#9662;</span>
                </button>
              </Link>
              {/* Dropdown Menu */}
              <ul 
                ref={dropdownRef} 
                className={`dropdown-menu ${dropdownOpen === 'about' ? 'show' : ''}`}
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={() => handleMouseLeave('about')}
              >
                <li>
                  <button 
                    className="dropdowns w-full text-left" 
                    onClick={() => handleDropdownItemClick('our-story', '/about')}
                  >
                    {t('header.about.story')}
                  </button>
                </li>
                <li>
                  <button 
                    className="dropdowns w-full text-left" 
                    onClick={() => handleDropdownItemClick('our-team', '/about')}
                  >
                    {t('header.about.team')}
                  </button>
                </li>
                <li>
                  <button 
                    className="dropdowns w-full text-left" 
                    onClick={() => handleDropdownItemClick('our-mission', '/about')}
                  >
                    {t('header.about.missionVision')}
                  </button>
                </li>
              </ul>
            </li>

            {/* Products Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={() => handleMouseLeave('products')}
            >
              <Link to="/products" className="flex items-center">
                <button className="products text-white hover:text-[#AD7C59] cursor-pointer">
                  {t('header.products')} <span>&#9662;</span>
                </button>
              </Link>
              {/* Dropdown Menu */}
              <ul 
                ref={dropdownRef} 
                className={`dropdown-menu ${dropdownOpen === 'products' ? 'show' : ''}`}
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={() => handleMouseLeave('products')}
              >
                <li>
                  <button 
                    className="dropdowns w-full text-left" 
                    onClick={() => handleDropdownItemClick('coffees', '/products')}
                  >
                    {t('header.products.coffees')}
                  </button>
                </li>
                <li>
                  <button 
                    className="dropdowns w-full text-left" 
                    onClick={() => handleDropdownItemClick('special-editions', '/products')}
                  >
                    {t('header.products.specialEditions')}
                  </button>
                </li>
                <li>
                  <button 
                    className="dropdowns w-full text-left" 
                    onClick={() => handleDropdownItemClick('subscription', '/products')}
                  >
                    {t('header.products.subscription')}
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

        <div className="hidden md:flex items-center space-x-4 text-white mr-9">
          {/* Language Selector */}
          <div className="relative" ref={languageDropdownRef}>
            <button 
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="flex items-center space-x-1 px-3 py-1 rounded hover:bg-[#61300d] transition-colors"
            >
              <span className="text-sm uppercase">
                {selectedLanguage === 'en' ? 'EN' : 
                 selectedLanguage === 'es' ? 'ES' : 
                 selectedLanguage === 'tr' ? 'TR' : 'AR'}
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {languageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50 text-black ">
                <button 
                  onClick={() => changeLanguage('en')}
                  className={`cursor-pointer block w-full text-left px-4 py-2 text-sm ${selectedLanguage === 'en' ? 'bg-[#AD7C59] text-white' : 'text-gray-800 hover:bg-gray-100'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => changeLanguage('es')}
                  className={`cursor-pointer block w-full text-left px-4 py-2 text-sm ${selectedLanguage === 'es' ? 'bg-[#AD7C59] text-white' : 'text-gray-800 hover:bg-gray-100'}`}
                >
                  Español
                </button>
                <button 
                  onClick={() => changeLanguage('tr')}
                  className={`cursor-pointer block w-full text-left px-4 py-2 text-sm ${selectedLanguage === 'tr' ? 'bg-[#AD7C59] text-white' : 'text-gray-800 hover:bg-gray-100'}`}
                >
                  Türkçe
                </button>
                <button 
                  onClick={() => changeLanguage('ar')}
                  className={`cursor-pointer block w-full text-left px-4 py-2 text-sm ${selectedLanguage === 'ar' ? 'bg-[#AD7C59] text-white' : 'text-gray-800 hover:bg-gray-100'}`}
                >
                  العربية
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="header-item cart relative" onClick={handleItemClick}>
            <svg className="w-6 h-6 hover:text-[#61300d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H7M9 18c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </svg>
            {cartCount > 0 && (
              <span className="cartcount absolute -top-1 -right-1 text-xs font-bold text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Icon */}
          {userIconOpen ? (
            <div className="usericon absolute right-0 mt-10 bg-white text-black rounded shadow-lg w-40 z-50">
              <ul>
                <li>
                  <button className="dropdown-item cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { handleNavigate('/orderhistory'); setUserIconOpen(false); }}>
                    {t('header.orderHistory')}
                  </button>
                </li>
                <li>
                  <Link to='/settings'>
                    <button className="dropdown-item cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setUserIconOpen(false)}>
                      {t('header.settings')}
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
          
          <button className="header-item user move-up cursor-pointer" onClick={handleItemClick}>
            <svg className="w-6 h-6 hover:text-[#61300d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;