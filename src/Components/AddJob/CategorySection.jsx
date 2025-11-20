import React, { useState } from "react";
import { jobCategories } from "../../Data/jobCategories";
import { Link } from "react-router";
import { FcSearch } from "react-icons/fc";
import { MdErrorOutline } from "react-icons/md";

const CategorySection = () => {
  const [search, setSearch] = useState("");

  const filteredCategories = jobCategories.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto mt-20 px-6 md:px-6 lg:px-0">
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-700 via-purple-600 to-pink-600">Job Categories</h1>

        <div className="relative w-full md:w-1/3">
          <input type="text" placeholder="Search category..." value={search} onChange={(e) => setSearch(e.target.value)} 
          className="w-full p-3 pl-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          <span className="absolute left-3 top-4"><FcSearch /></span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat, index) => (
            <Link key={index} to={`/category/${encodeURIComponent(cat)}`} 
            className="group relative bg-linear-to-br from-white to-blue-50 hover:from-blue-50 hover:to-white border border-transparent hover:border-blue-300 shadow-md hover:shadow-lg rounded-xl p-4 h-[110px] flex items-center justify-center text-center transition-all duration-500 hover:-translate-y-1" >

              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-400 to-purple-500 rounded-t-xl opacity-0 
              group-hover:opacity-100 transition-opacity duration-500"></div>

              <p className="font-semibold text-base md:text-lg text-gray-700">{cat}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 flex justify-center items-center gap-1 py-6 text-lg"><MdErrorOutline /> No category found</p>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
