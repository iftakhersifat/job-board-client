import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  // Your Custom Logo Component integrated here
  const Logo = () => (
    <Link to="/" className="flex items-center gap-3 outline-none group">
      <div className="relative w-10 h-10 md:w-11 md:h-11 bg-slate-900 rounded-[12px] md:rounded-[14px] flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:bg-indigo-600 group-hover:rounded-[18px] group-hover:rotate-[10deg] shadow-lg shadow-slate-200 group-hover:shadow-indigo-200">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]"></div>
        <span className="relative z-10 text-white font-[1000] text-xl md:text-2xl italic tracking-tighter transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-[10deg]">
          J
        </span>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </div>
      <div className="flex flex-col -space-y-1">
        <div className="flex items-center">
          <span className="text-xl md:text-2xl font-[1000] tracking-tighter text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
            JOB
          </span>
          <span className="text-xl md:text-2xl font-light tracking-tighter text-indigo-600 ml-0.5">
            BOX
          </span>
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full ml-1 animate-pulse"></span>
        </div>
        <span className="hidden md:block text-[8px] font-black uppercase tracking-[0.35em] text-slate-400 group-hover:text-slate-600">
          Future Pathway
        </span>
      </div>
    </Link>
  );

  return (
    <footer className="bg-gradient-to-b from-slate-50 via-white to-white border-t border-slate-100 mt-20">
      {/* Upper Footer: Links & Branding */}
      <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Logo />
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-medium">
              Discover high-impact opportunities and grow your career with industry leaders. We bridge the gap between talent and the future of work.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF />, link: "#" },
                { icon: <FaTwitter />, link: "#" },
                { icon: <FaLinkedinIn />, link: "#" },
                { icon: <FaInstagram />, link: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white hover:-translate-y-1 transition-all duration-300 border border-slate-100 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
                Platform
              </h3>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                <li><Link to="/jobs" className="hover:text-indigo-600 transition-colors">Browse Jobs</Link></li>
                <li><Link to="/categories" className="hover:text-indigo-600 transition-colors">Categories</Link></li>
                <li><Link to="/companies" className="hover:text-indigo-600 transition-colors">Companies</Link></li>
                <li><Link to="/career-advice" className="hover:text-indigo-600 transition-colors">Career Advice</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
                Support
              </h3>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                <li><Link to="/about" className="hover:text-indigo-600 transition-colors">Our Story</Link></li>
                <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact Support</Link></li>
                <li><Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
              Get in Touch
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                  <FiMail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">Email Us</p>
                  <p className="text-sm font-bold text-slate-700">support@jobbox.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                  <FiMapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">Visit Us</p>
                  <p className="text-sm font-bold text-slate-700">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-50 py-8 bg-[#FDFDFF]">
        <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-slate-400">
            © {new Date().getFullYear()} <span className="text-indigo-600">Job-Box</span> Global Inc.
          </p>
          <div className="flex gap-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Built for the future</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;