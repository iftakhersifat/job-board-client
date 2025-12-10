import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  return (
    <div className="group relative flex flex-col justify-between bg-white/60 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl p-6 h-[450px] md:h-[480px] transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-orange-300">
      
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Company Info */}
      <div className="flex gap-4 items-center mb-5">
        <div className="w-16 h-16 rounded-xl bg-white/80 border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
          <img
            src={job.company_logo}
            alt={`${job.company} Logo`}
            className="w-12 h-12 object-contain"
          />
        </div>
        <div>
          <h2 className="font-semibold text-lg text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
            {job.company}
          </h2>
          <p className="flex gap-1 items-center text-sm text-gray-500 mt-1">
            <FaLocationDot className="text-orange-500" /> {job.location}
          </p>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex-1 space-y-3">
        <h2 className="font-bold text-xl text-gray-800 group-hover:text-orange-600 transition-colors duration-300 leading-snug">
          {job.title}{" "}
          <span className="text-orange-500 font-medium text-base ml-1">
            ({job.jobType})
          </span>
        </h2>

        <p className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-orange-50/80 inline-block px-3 py-1 rounded-lg border border-orange-200 shadow-sm">
           {job.salaryRange?.min} - {job.salaryRange?.max} {job.salaryRange?.currency}
        </p>

        <p className="text-gray-700 text-sm line-clamp-3">{job.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-3 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-50">
          {job.requirements?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-orange-50/80 border border-orange-200 text-xs font-semibold rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="mt-6">
        <Link to={`/jobs/${job._id}`}>
          <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
            More Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
