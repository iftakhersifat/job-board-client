import React, { useState } from "react";
import { jobCategories } from "../../Data/jobCategories";
import { Link } from "react-router";
import { FcSearch } from "react-icons/fc";
import { MdErrorOutline } from "react-icons/md";
import { FiGrid } from "react-icons/fi";

const CategorySection = () => {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(8); // initial visible categories

  const filteredCategories = jobCategories.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8); // show 8 more categories on each click
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 px-6 md:px-6 lg:px-0">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 md:py-3 tracking-tight">
          Job Categories
        </h1>

        <div className="relative w-full md:w-1/3 group">
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pl-11 border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
          />
          <span className="absolute left-4 top-4 text-xl group-focus-within:scale-110 transition-transform">
            <FcSearch />
          </span>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {filteredCategories.length > 0 ? (
          filteredCategories.slice(0, visibleCount).map((cat, index) => (
            <Link
              key={index}
              to={`/category/${encodeURIComponent(cat)}`}
              className="group relative bg-white/60 backdrop-blur-md hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-300 shadow-sm hover:shadow-xl rounded-[2rem] p-6 h-[140px] flex flex-col items-center justify-center text-center transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Top Gradient Line - Indigo to Blue */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="mb-2 p-2 bg-indigo-50 rounded-xl text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                <FiGrid size={20} />
              </div>

              <p className="font-bold text-base md:text-lg text-slate-800 group-hover:text-indigo-700 transition-colors duration-300 tracking-tight">
                {cat}
              </p>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col justify-center items-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <MdErrorOutline size={40} className="text-slate-300 mb-2" />
            <p className="text-slate-500 text-lg font-medium">No category found</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredCategories.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all duration-300 hover:scale-105 active:scale-95 tracking-wide"
          >
            Load More Categories
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySection;