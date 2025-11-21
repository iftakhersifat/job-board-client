import React from "react";
import {FaFacebookF,FaTwitter,FaLinkedinIn,FaInstagram} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-blue-50 to-blue-200  text-gray-700 mt-24 pt-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-0 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className='space-y-3'>
          <img src="/assets/logo.png" className='w-[300px] -ml-7 lg:-ml-7 md:pl-2' alt="job-box" />
          <p className='text-gray-500 max-w-md'>Discover the best opportunities and grow your career. Your journey begins here.</p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Branding</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Design</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Marketing</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Advertisement</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Jobs</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Press Kit</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">Legal</h3>
          <ul className="space-y-2 text-sm mb-4">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Use</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Cookie Policy</a></li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-3 mt-2">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:bg-blue-600 hover:text-white text-blue-600 transition-all duration-300"><FaFacebookF /></a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:bg-blue-600 hover:text-white text-blue-600 transition-all duration-300"><FaTwitter /></a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:bg-blue-600 hover:text-white text-blue-600 transition-all duration-300"><FaLinkedinIn /></a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:bg-blue-600 hover:text-white text-blue-600 transition-all duration-300"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12 py-6 border-t border-blue-300 text-center text-gray-600">
        © {new Date().getFullYear()} — All rights reserved by <span className="font-semibold">Job-Box</span>
      </div>
    </footer>
  );
};

export default Footer;
