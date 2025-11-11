import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 mt-24 pt-12 border-t border-blue-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full shadow-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              ACME Industries
            </h2>
          </div>
          <p className="text-sm leading-relaxed">
            Crafting reliable tech solutions since 1992.  
            Empowering innovation and digital growth worldwide.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">
            Services
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Branding</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Design</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Marketing</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Advertisement</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Jobs</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Press Kit</a></li>
          </ul>
        </div>

        {/* Legal & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">
            Legal
          </h3>
          <ul className="space-y-2 text-sm mb-4">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Use</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Cookie Policy</a></li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-3 mt-2">
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"><FaFacebookF /></a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"><FaTwitter /></a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"><FaLinkedinIn /></a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-200 dark:border-gray-700 mt-10 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} ACME Industries Ltd. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
