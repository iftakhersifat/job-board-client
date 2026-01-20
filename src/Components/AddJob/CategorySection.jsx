import React, { useState } from "react";
import { jobCategories } from "../../Data/jobCategories";
import { Link } from "react-router";
import { FcSearch } from "react-icons/fc";
import { MdErrorOutline } from "react-icons/md";
import { FiGrid, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const CategorySection = () => {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredCategories = jobCategories.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="max-w-6xl mx-auto mt-24 px-6 md:px-6 lg:px-0">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-500 mb-2">
            Browse by Sector
          </h2>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Explore <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-500">Categories</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <input
            type="text"
            placeholder="Search across 50+ categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="relative w-full py-4 pl-12 pr-6 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 transition-all font-medium text-slate-700 placeholder:text-slate-400"/>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl group-focus-within:scale-110 transition-transform">
            <FcSearch />
          </span>
        </div>
      </div>

      {/* Container */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredCategories.length > 0 ? (
            filteredCategories.slice(0, visibleCount).map((cat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}>
                <Link
                  to={`/category/${encodeURIComponent(cat)}`}
                  className="group relative h-40 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-[2.5rem] p-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] hover:-translate-y-2 overflow-hidden">

                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50 rounded-full group-hover:scale-[3] transition-transform duration-700 ease-in-out opacity-50"></div>

                  <div className="relative z-10 mb-4 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-[10deg] transition-all duration-500 shadow-inner">
                    <FiGrid size={24} />
                  </div>

                  {/* Category Name */}
                  <div className="relative z-10 text-center">
                    <p className="font-black text-slate-800 group-hover:text-indigo-700 transition-colors duration-300 tracking-tight text-lg">
                      {cat}
                    </p>
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="text-[10px] font-bold text-indigo-500 uppercase">View Jobs</span>
                      <FiArrowRight size={10} className="text-indigo-500" />
                    </div>
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-400 group-hover:w-full transition-all duration-500"></div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-4">
                <MdErrorOutline size={40} className="text-slate-300" />
              </div>
              <p className="text-slate-900 text-xl font-black">No results found</p>
              <p className="text-slate-500 font-medium">Try adjusting your search terms</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* More Button */}
      {visibleCount < filteredCategories.length && (
        <div className="flex justify-center mt-20 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <button
            onClick={handleLoadMore}
            className="relative px-10 py-4 bg-white border border-slate-200 hover:border-indigo-500 text-slate-900 font-black rounded-full shadow-xl hover:shadow-indigo-100 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 group">
            <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform">+</span>Show More Sectors</button>
        </div>
      )}
    </div>
  );
};

export default CategorySection;