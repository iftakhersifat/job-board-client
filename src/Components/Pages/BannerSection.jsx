import React from "react";
import { FiSearch } from "react-icons/fi";
import { MdWork } from "react-icons/md";
import DivisionSection from "../Divison/DivisionSection";

const BannerSection = () => {
  return (
    <div
      className="relative bg-cover bg-center py-20"
      style={{ backgroundImage: "url('/assets/banner.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-black/40"></div>

      {/* Content Container */}
      <div className="relative max-w-6xl mx-auto px-6 flex flex-col items-center lg:items-start">
        
        {/* Small Top Tag */}
        <p className="font-semibold text-sm uppercase tracking-wide text-blue-300">
          We Have 208,000+ Live Jobs
        </p>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-4 text-white text-center lg:text-left drop-shadow-xl">
          Your <span className="text-yellow-400">Dream</span> Job Is <br />
          Waiting For You
        </h1>

        {/* Description */}
        <p className="text-gray-200 mt-5 text-center lg:text-left max-w-2xl text-sm">
          Type your keyword, then click search to find your perfect job
            among thousands of opportunities worldwide.
        </p>

        {/* Search Box */}
        <div className="w-full mt-8 bg-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/20">
          <div className="flex flex-col md:flex-row gap-4 items-center">

            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-xl" />
              <input
                type="text"
                placeholder="Search job title or keyword"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
              />
            </div>

            {/* Dropdown */}
            <div className="relative w-full md:w-1/4">
              <MdWork className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-xl" />
              <select className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-yellow-300 focus:outline-none">
                <option className="text-black">Government</option>
                <option className="text-black">Private</option>
                <option className="text-black">NGO Jobs</option>
              </select>
            </div>

            {/* Search Button */}
            <button className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-xl shadow-xl transition duration-200">
              Search
            </button>
          </div>
        </div>

        <div className="w-full mt-2">
          <DivisionSection />
        </div>

        

      </div>
    </div>
  );
};

export default BannerSection;
