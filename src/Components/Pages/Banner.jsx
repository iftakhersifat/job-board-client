import React from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative bg-linear-to-br from-white to-indigo-200 flex items-center py-12 lg:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-20 lg:gap-20 px-6 lg:px-0">
        {/* Left Content */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <p className="text-blue-600 font-medium text-sm sm:text-base uppercase tracking-wide">
            We Have 208,000+ Live Jobs
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mt-3 text-gray-900">
            Your <span className="text-blue-600">Dream</span> Job Is <br />
            Waiting For You
          </h1>
          <p className="text-gray-600 mt-4 max-w-md mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed">
            Type your keyword, then click search to find your perfect job
            among thousands of opportunities worldwide.
          </p>

          {/* Search Box */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
           
           <div className="relative w-full md:w-1/2">
           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🏷️</span>
           <input type="text" placeholder="Search by keyword" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"/>
          </div>

           <select className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2  focus:ring-blue-400 focus:outline-none">
           <option>Government</option>
           <option>Private</option>
           <option>NGO</option>
           </select>

           {/* Search Button */}
           <button className="w-full md:w-auto bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-lg"> Search</button></div>

          <p className="text-gray-500 mt-4 text-xs sm:text-sm">
            <span className="font-medium">Popular Searches:</span> Designer,
            Senior, Architecture, iOS, etc.
          </p>
        </div>

        <div className="relative flex justify-center items-center h-[160px] sm:h-[300px] lg:h-[550px]">
          <img src="/assets/man-BwOz4zHp.png" alt="Businessman" className="relative z-10 max-h-[260px] sm:max-h-[400px] lg:max-h-[710px] object-contain drop-shadow-xl"/>

          <div className="absolute w-[220px] h-[220px] sm:w-[360px] sm:h-[360px] lg:w-[500px] lg:h-[500px] rounded-full border-2 border-dashed border-gray-300 animate-[spin_25s_linear_infinite] hover:[animation-play-state:paused]">
            {/* Google */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img src="/assets/google.png" alt="Google" className="w-8 sm:w-10 lg:w-12" />
            </div>

            {/* Microsoft */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
              <img
                src="/assets/microsoft.png"
                alt="Microsoft"
                className="w-8 sm:w-10 lg:w-12"
              />
            </div>

            {/* Amazon */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <img src="/assets/amzon.png" alt="Amazon" className="w-8 sm:w-10 lg:w-12" />
            </div>

            {/* Dropbox */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
              <img
                src="/assets/dropbox.png"
                alt="Dropbox"
                className="w-8 sm:w-10 lg:w-12"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
