import React, { useState } from 'react'
import { doSignOut } from '../../../lib/auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


interface HeaderProps {
    user: any;
  }

const Setting = ({ user }: HeaderProps) => {
    const { t, i18n } = useTranslation(); 
  const [signedIn, setSignedIn] = useState(!!user);
   const [dropdownOpen, setDropdownOpen] = useState(false); 
     const [selectedLanguage, setSelectedLanguage] = useState('en');

   const navigate = useNavigate();
    
  const handleSignOut = async () => {
    await doSignOut();
    setSignedIn(false);
    navigate('/');
  }

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang); // Update the selected language
    setDropdownOpen(false); // Close the dropdown after selecting a language
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className='h-screen'>
        <div className='flex flex-col bg-gray-50 gap-4 '>
            <button className='cursor-pointer' onClick={() =>navigate('/profile')}>Profile</button>
            <button className='cursor-pointer' onClick={() => navigate('/settingshipaddress')}>Shipping Address</button>
        </div>

        <div className='flex flex-col bg-gray-100 cursor-pointer gap-4 '>
            <div className='flex '>
            <button className='cursor-pointer'>Language </button>
            <div className="language-buttonssetting absolute lg:left-270 md:left-120 sm:left-120 transform -translate-x-1/2 mt-2  ">
            <button onClick={toggleDropdown} className="languagessetting  text-white rounded-lg px-4 py-2 cursor-pointer">
              {selectedLanguage === 'en'
                ? 'ENGLISH'
                : selectedLanguage === 'es'
                ? 'SPANISH'
                : selectedLanguage === 'tr'
                ? 'TURKISH'
                : 'ARABIC'}
              <span className="ml-2">&#9662;</span>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute  mt-2 w-full bg-white rounded-lg shadow-lg ">
                <button onClick={() => changeLanguage('en')} className="block w-full px-4 py-2 text-left  hover:text-white cursor-pointer">
                  ENGLISH
                </button>
                <button onClick={() => changeLanguage('es')} className="block w-full px-4 py-2 text-left  hover:text-white cursor-pointer">
                  SPANISH
                </button>
                <button onClick={() => changeLanguage('tr')} className="block w-full px-4 py-2 text-left  hover:text-white cursor-pointer">
                  TURKISH
                </button>
                <button onClick={() => changeLanguage('ar')} className="block w-full px-4 py-2 text-left  hover:text-white cursor-pointer">
                  ARABIC
                </button>
              </div>
            )}
          </div>

            </div>
           
        </div>

        <button onClick={handleSignOut}>
            Sign out
        </button>
    </div>
  )
}

export default Setting