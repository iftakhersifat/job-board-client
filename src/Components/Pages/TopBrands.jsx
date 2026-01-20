import React from 'react';
import { motion } from 'framer-motion';

const TopBrands = () => {
  const brands = [
    { id: 1, logo: "/assets/visa.png" },
    { id: 2, logo: "/assets/mastercard.png" },
    { id: 3, logo: "/assets/roket.png" },
    { id: 4, logo: "/assets/nogod.png" },
    { id: 5, logo: "/assets/bkash.png" },
    { id: 6, logo: "/assets/american.png" },
    { id: 7, logo: "/assets/das.png" },
    { id: 8, logo: "/assets/easy.png" },
  ];

  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0">
        
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-indigo-600 font-bold text-xs uppercase tracking-[0.4em] mb-4 block">
            Trusted Partnerships
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Powering Careers with <span className="text-indigo-600 italic">Industry Giants</span>
          </motion.h2>
        </div>

        <div className="relative group">
          <div className="flex overflow-hidden py-10 select-none">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 30, 
                ease: "linear", 
                repeat: Infinity 
              }}
              className="flex items-center gap-16 md:gap-24 flex-nowrap">
              {duplicatedBrands.map((brand, index) => (
                <div key={index} className="flex-shrink-0 w-28 md:w-36">
                  <img 
                    src={brand.logo} 
                    alt="Brand Logo" 
                    className="w-full h-12 md:h-16 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-linear-to-r from-white z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-linear-to-l from-white z-10"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 relative rounded-[2.5rem] bg-indigo-600 p-8 md:p-14 overflow-hidden shadow-2xl shadow-indigo-200 dark:shadow-none">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Want to showcase your company?</h3>
              <p className="text-indigo-100 font-medium">Join 500+ brands hiring through our network.</p>
            </div>
            <button className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-lg shadow-black/5">
              Become a Partner
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TopBrands;