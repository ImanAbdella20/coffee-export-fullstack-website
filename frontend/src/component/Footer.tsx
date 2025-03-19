import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-white py-10 ">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Information Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">About Us</h2>
          <p>
            We are a premium coffee exporter, delivering the best coffee beans from around the world. Our mission is to provide high-quality coffee products to enthusiasts and businesses globally.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
            <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
            <li><a href="/products" className="text-gray-300 hover:text-white">Products</a></li>
            <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <ul className="space-y-2">
            <li><span className="text-gray-300">Email: </span>contact@coffeebiz.com</li>
            <li><span className="text-gray-300">Phone: </span>+1 (800) 123-4567</li>
            <li><span className="text-gray-300">Address: </span>123 Coffee Lane, Coffee Town, USA</li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-brown-700 text-center py-4">
        <p className="text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} CoffeeBiz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
