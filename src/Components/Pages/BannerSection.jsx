import React, { useState } from "react";
import { FiSearch, FiMapPin, FiTrendingUp } from "react-icons/fi";
import DivisionSection from "../Divison/DivisionSection";
import { useNavigate } from "react-router";

const BannerSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate(`/search/${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="relative pt-12 min-h-[600px] flex items-center bg-white overflow-hidden">
      
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 -skew-x-12 translate-x-20 rounded-l-[100px] hidden lg:block"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl"></div>
      
      {/* Container */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-6 lg:px-0 w-full py-16">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Content & Search */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-8">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-600">
                Over 208,000+ jobs are waiting
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl font-[1000] text-slate-900 tracking-tighter leading-[1.1] mb-6">
              Find your next <br />
              <span className="text-indigo-600 italic">Career Goal</span> here.
            </h1>

            <p className="text-slate-500 text-lg max-w-lg mb-10 font-medium leading-relaxed italic">
              Explore thousands of job opportunities from top-rated companies with 
              personalized recommendations just for you.
            </p>

            {/* SEARCH BOX */}
            <div className="w-full max-w-2xl bg-white p-2.5 rounded-[28px] shadow-[0_20px_60px_-15px_rgba(99,102,241,0.15)] border border-slate-100 flex flex-col md:flex-row items-center gap-2 transition-all hover:shadow-[0_25px_70px_-15px_rgba(99,102,241,0.25)]">
              <div className="relative flex-1 w-full group">
                <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  type="text"
                  placeholder="Job title, keyword or company..."
                  className="w-full pl-14 pr-4 py-4 rounded-2xl text-slate-800 placeholder-slate-400 outline-none font-bold text-base"/>
              </div>

              <button 
                onClick={handleSearch} 
                className="w-full md:w-auto bg-indigo-600 hover:bg-slate-900 text-white font-black px-10 py-4.5 rounded-[20px] transition-all duration-300 shadow-lg shadow-indigo-100 active:scale-95">
                Search
              </button>
            </div>

            {/* Trending Tags */}
            <div className="mt-8 flex flex-wrap gap-4 items-center">
               <span className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Trending:</span>
               {['Remote', 'Finance', 'Software', 'Designer'].map(tag => (
                 <button key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[12px] font-bold text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition-all">
                   {tag}
                 </button>
               ))}
            </div>
          </div>

          {/* Explore by Division */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50/80 rounded-[40px] p-8 border border-slate-100 shadow-sm relative">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                    <FiMapPin className="text-indigo-600 text-2xl" />
                 </div>
                 <div>
                    <h3 className="text-slate-900 font-black text-lg tracking-tight uppercase">Quick Explore</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Browse by division</p>
                 </div>
              </div>
              <div className="division-container overflow-hidden rounded-3xl">
                  <DivisionSection />
              </div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-20 bg-indigo-600 rounded-full"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BannerSection;