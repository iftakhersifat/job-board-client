import React, { useState } from "react";
import { jobCategories } from "../../Data/jobCategories";
import { Link } from "react-router";
import { FcSearch } from "react-icons/fc";
import { MdErrorOutline } from "react-icons/md";

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
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 md:py-3">
          Job Categories
        </h1>

        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <span className="absolute left-4 top-4.5"><FcSearch /></span>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredCategories.length > 0 ? (
          filteredCategories.slice(0, visibleCount).map((cat, index) => (
            <Link
              key={index}
              to={`/category/${encodeURIComponent(cat)}`}
              className="group relative bg-white/60 backdrop-blur-md hover:bg-gradient-to-r hover:from-orange-100 hover:via-red-100 hover:to-yellow-50 border border-transparent hover:border-orange-300 shadow-md hover:shadow-xl rounded-2xl p-4 h-[120px] flex items-center justify-center text-center transition-all duration-500 hover:-translate-y-1"
            >
              {/* Top Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <p className="font-semibold text-base md:text-lg text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                {cat}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 flex justify-center items-center gap-1 py-6 text-lg">
            <MdErrorOutline /> No category found
          </p>
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredCategories.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySection;
