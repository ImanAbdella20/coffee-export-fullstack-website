import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import '../index.css';
import { Link } from 'react-router';

interface HeroSectionProps {
  handleClickArrow: (direction: 'prev' | 'next') => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ handleClickArrow }) => {
  const { t, i18n } = useTranslation(); // Access the translation function

  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language is English

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang); // Update the selected language
    setDropdownOpen(false); // Close the dropdown after selecting a language
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="herocontainer">
      <div className="herocontent">
        {/* Hero content */}
        <div className="text-white ">
          <div className="text-white max-w-md mx-auto px-6 absolute top-25 head">
            {/* Heading */}
            <p className="font-bold sm:text-4xl leading-tight mb-4 herohead">
              {t('hero.title')}
            </p>

            {/* Subheading */}
            <p className="sm:text-xl mb-6 leading-relaxed text-[#AD7C59] heroet">
              {t('hero.subtitle')}
            </p>

            {/* Description */}
            <p className="sm:text-xl leading-relaxed mb-8 text-gray-300 herodesc">
              {t('hero.description')}
            </p>

            <Link
  to="/coffees"
  className="herobutton bg-[#61300D] hover:bg-[#AD7C59] text-white rounded-lg text-lg transform transition-all duration-300 hover:translate-x-4 w-50 block"
>
  {t('hero.button')}
</Link>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="icons absolute top-95">
          <svg
            className="w-4 h-6 text-white hover:text-[#AD7C59] mb-2 cursor-pointer"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M22 12c0-5.522-4.477-10-10-10s-10 4.478-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54v-2.89h2.54v-2.203c0-2.506 1.492-3.89 3.77-3.89 1.094 0 2.24.195 2.24.195v2.461h-1.261c-1.243 0-1.631.771-1.631 1.562v1.875h2.773l-.444 2.89h-2.329v6.988c4.781-.75 8.438-4.887 8.438-9.878z" />
          </svg>

          <svg
            className="w-4 h-6 text-white hover:text-[#AD7C59] mb-2 cursor-pointer"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.793-1.573 2.163-2.724-.951.564-2.005.974-3.127 1.196-.897-.958-2.178-1.555-3.594-1.555-2.719 0-4.92 2.201-4.92 4.917 0 .39.043.765.127 1.124-4.09-.205-7.719-2.165-10.141-5.144-.423.725-.666 1.562-.666 2.457 0 1.695.863 3.191 2.175 4.072-.8-.025-1.554-.245-2.212-.612v.061c0 2.367 1.685 4.343 3.918 4.788-.412.111-.846.171-1.294.171-.316 0-.623-.03-.924-.086.624 1.955 2.437 3.376 4.584 3.416-1.68 1.319-3.809 2.105-6.102 2.105-.396 0-.786-.023-1.17-.067 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 14.307-14.422 0-.22-.004-.439-.015-.655.985-.711 1.841-1.6 2.515-2.614z" />
          </svg>

          <svg
            className="w-4 h-6 text-white hover:text-[#AD7C59] mb-2 cursor-pointer"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.332 3.608 1.308.974.975 1.245 2.242 1.307 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.332 2.633-1.308 3.608-.974.974-2.241 1.245-3.607 1.307-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.607-.057-1.265-.069-1.645-.069-4.849s.012-3.584.07-4.849c.062-1.366.333-2.633 1.308-3.608.975-.974 2.242-1.245 3.607-1.307 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.015-4.947.072-1.349.062-2.557.34-3.608 1.391-1.051 1.051-1.33 2.26-1.392 3.608-.058 1.281-.072 1.688-.072 4.948s.014 3.667.072 4.947c.062 1.349.34 2.557 1.391 3.608 1.051 1.051 2.259 1.33 3.608 1.392 1.28.057 1.688.071 4.947.071s3.667-.014 4.947-.072c1.349-.062 2.557-.34 3.608-1.391 1.051-1.051 1.33-2.259 1.392-3.608.057-1.281.071-1.688.071-4.947s-.014-3.667-.072-4.947c-.062-1.349-.34-2.557-1.391-3.608-1.051-1.051-2.259-1.33-3.608-1.392-1.281-.057-1.688-.071-4.947-.071zm0 5.838c-3.206 0-5.816 2.611-5.816 5.817s2.611 5.817 5.817 5.817c3.206 0 5.816-2.611 5.816-5.817s-2.61-5.817-5.816-5.817zm0 9.635c-2.111 0-3.818-1.707-3.818-3.818s1.707-3.817 3.818-3.817 3.818 1.707 3.818 3.817-1.707 3.818-3.818 3.818zm6.406-10.711c-.796 0-1.442.646-1.442 1.442s.646 1.442 1.442 1.442 1.442-.646 1.442-1.442-.646-1.442-1.442-1.442z" />
          </svg>

          <div className="line"></div>

          {/* Navigation Arrows */}
          <div className="arrow  ">
            <span onClick={() => handleClickArrow('prev')} className='text-white hover:text-[#AD7C59]'>&#11144;</span>
            <span onClick={() => handleClickArrow('next')} className='text-white '>&#11045;</span>
            <span onClick={() => handleClickArrow('next')} className='text-white hover:text-[#AD7C59]'>&#11146;</span>
          </div>

          {/* Language Selector */}
          <div className="language-buttons absolute lg:left-270 md:left-120 sm:left-120 transform -translate-x-1/2 mt-2  ">
            <button onClick={toggleDropdown} className="languages bg-[#61300D] hover:bg-[#AD7C59] text-white rounded-lg px-4 py-2 cursor-pointer">
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
                <button onClick={() => changeLanguage('en')} className="block w-full px-4 py-2 text-left hover:bg-[#AD7C59] hover:text-white cursor-pointer">
                  ENGLISH
                </button>
                <button onClick={() => changeLanguage('es')} className="block w-full px-4 py-2 text-left hover:bg-[#AD7C59] hover:text-white cursor-pointer">
                  SPANISH
                </button>
                <button onClick={() => changeLanguage('tr')} className="block w-full px-4 py-2 text-left hover:bg-[#AD7C59] hover:text-white cursor-pointer">
                  TURKISH
                </button>
                <button onClick={() => changeLanguage('ar')} className="block w-full px-4 py-2 text-left hover:bg-[#AD7C59] hover:text-white cursor-pointer">
                  ARABIC
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
