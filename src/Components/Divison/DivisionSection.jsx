import React from "react";
import { jobLocations } from "../../Data/jobLocations";
import { Link } from "react-router";

const DivisionSection = () => {
  const divisions = Object.keys(jobLocations);

  return (
    <div className="max-w-6xl mx-auto mt-12 px-6 md:px-6 lg:px-0">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {divisions.map((d, index) => (
          <Link
            key={index}
            to={`/division/${encodeURIComponent(d)}`}
            className="group relative bg-linear-to-br from-white to-green-50 hover:from-green-50 hover:to-white border border-transparent hover:border-green-300 shadow-md hover:shadow-lg rounded-lg p-2 h-10 flex items-center justify-center text-center transition-all duration-500 hover:-translate-y-0.5"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-green-400 to-blue-500 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <p className="font-semibold text-sm md:text-base text-gray-700">
              {d}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DivisionSection;
