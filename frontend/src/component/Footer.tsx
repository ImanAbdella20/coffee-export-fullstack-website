import React from 'react';
import { FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#7b563b] text-gray-300 border-t border-gray-800 h-[50vh] flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col">
        {/* Main Footer Content */}
        <div className="footermain grid grid-cols-1 md:grid-cols-3 gap-8 mb-4 flex-grow items-center">
          
          {/* Brand & Social */}
          <div className="text-center md:text-left space-y-4"> {/* Added space-y-4 */}
            <h3 className="text-2xl font-light leading-tight"> {/* Added leading-tight */}
              <span className="font-bold text-[#61300d]">IFNA</span> Coffee
            </h3>
            <p className="text-gray-200 leading-relaxed"> {/* Added leading-relaxed */}
              Ethically sourced Ethiopian coffee<br />straight from the highlands.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 pt-2"> {/* Added pt-2 */}
              <a href="#" aria-label="Instagram" className="text-gray-200 hover:text-[#61300d] transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-200 hover:text-[#61300d] transition-colors">
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left space-y-4"> {/* Added space-y-4 */}
            <h4 className="text-lg font-semibold text-white leading-tight"> {/* Added leading-tight */}
              Get in Touch
            </h4>
            <ul className="space-y-3 text-gray-200"> {/* Increased space-y to 3 */}
              <li className="flex items-center justify-center md:justify-start leading-relaxed"> {/* Added leading-relaxed */}
                <FaMapMarkerAlt className="mr-2 text-[#61300d] flex-shrink-0" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center justify-center md:justify-start leading-relaxed">
                <FaPhoneAlt className="mr-2 text-[#61300d] flex-shrink-0" />
                <span>+251 123 456 789</span>
              </li>
              <li className="flex items-center justify-center md:justify-start leading-relaxed">
                <FaEnvelope className="mr-2 text-[#61300d] flex-shrink-0" />
                <span>contact@ifnacoffee.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center md:text-left space-y-4"> {/* Added space-y-4 */}
            <h4 className="text-lg font-semibold text-white leading-tight">
              Coffee Updates
            </h4>
            <p className="text-gray-200 leading-relaxed"> {/* Added leading-relaxed */}
              Join our newsletter for<br />seasonal blends and offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-xs mx-auto md:mx-0"> {/* Increased gap to 3 */}
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow px-3 py-2 bg-[#61300d] border border-[#8a6d52] rounded focus:outline-none focus:ring-1 focus:ring-amber-500 text-white placeholder-gray-400 leading-normal"
                required
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-[#61300d] hover:bg-[#7b563b] text-white rounded transition-colors leading-normal"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="pt-4 border-t border-[#8a6d52] text-sm text-center text-gray-300 mt-auto space-y-2"> {/* Added space-y-2 */}
          <p className="leading-relaxed"> {/* Added leading-relaxed */}
            &copy; {new Date().getFullYear()} IFNA Coffee.<br className="md:hidden" /> {/* Responsive line break */}
            <span className="mx-2 hidden md:inline">|</span>
            <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-amber-500 transition-colors">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;