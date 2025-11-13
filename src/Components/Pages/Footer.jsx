import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100  text-gray-700 mt-24 pt-12 border-t border-blue-200">
      <div className="max-w-6xl mx-auto px-6 lg:px-0 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Section */}
        <div className='space-y-3'>
          <img src="/assets/logo.png" className='w-[300px] -ml-8' alt="" />
          <p className='text-gray-500 max-w-md'>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.</p>
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
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"><FaFacebookF /></a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"><FaTwitter /></a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"><FaLinkedinIn /></a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-200 dark:border-gray-700 mt-10 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
      © {new Date().getFullYear()} - All rights reserved by Job-Box
      </div>
    </footer>
  );
};

export default Footer;
