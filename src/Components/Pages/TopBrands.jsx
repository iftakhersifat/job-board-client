import React from 'react';

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

  return (
    <section className="py-12 transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0">
        
        <div className="text-center mb-20">
          <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block opacity-80">Strategic Partners</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
            Top <span className="text-indigo-600">Brands</span> & Networks
          </h2>
          <div className="w-24 h-1.5 bg-indigo-600 mx-auto mt-6 rounded-full opacity-20"></div>
        </div>

        <div className="relative border-y border-slate-100 dark:border-slate-800/60 bg-slate-50/30 dark:bg-slate-900/10 py-16">
          <marquee direction="left" scrollamount="12" onMouseOver={(e) => e.target.stop()} onMouseOut={(e) => e.target.start()}>
            <div className="flex items-center gap-24 md:gap-32 px-10">
              {[...brands, ...brands].map((brand, index) => (
                <div key={index} className="flex-shrink-0">
                  <img 
                    src={brand.logo} 
                    alt="partner" 
                    className="h-10 md:h-14 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500 cursor-pointer dark:brightness-200"
                  />
                </div>
              ))}
            </div>
          </marquee>

          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-linear-to-r from-white pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-linear-to-l from-white pointer-events-none z-10"></div>
        </div>

        <div className="mt-24 relative rounded-[3.5rem] overflow-hidden group">
            <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-700 transition-all duration-700"></div>
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 p-12 md:p-20">
                <div className="max-w-xl text-center md:text-left">
                    <h4 className="text-3xl md:text-5xl font-black text-white italic">
                        LOOKING TO HIRE <br /> <span className="text-indigo-200">TOP TALENT</span> FAST?
                    </h4>
                    <p className="text-indigo-100/70 mt-4 text-lg font-medium">
                        Post your job requirements and connect with over 50,000+ verified professionals today.
                    </p>
                </div>
                
                <button className="relative z-10 px-12 py-6 bg-white text-indigo-900 font-black rounded-2xl hover:bg-slate-900 hover:text-white transition-all duration-500 active:scale-95 uppercase tracking-widest text-sm shadow-2xl">
                    Post a Job Now
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TopBrands;