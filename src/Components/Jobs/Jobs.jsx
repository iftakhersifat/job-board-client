import React, { use } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router";

const Jobs = ({ jobsPromise }) => {
  const jobs = use(jobsPromise);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mt-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 drop-shadow-sm">
            Hot Jobs
          </span>
        </h1>

        <div className="w-28 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 mx-auto mt-4 rounded-full shadow-sm"></div>

        <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Discover top opportunities tailored to your skills. Apply now and take
          your career to the next level with today’s hottest job openings.
        </p>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 lg:px-0">
        {jobs
          .filter((job) => job.status === "Active")
          .map((job) => (
            <div
              key={job._id}
              className="group relative bg-gradient-to-br from-white/80 to-orange-50/60 backdrop-blur-md hover:from-orange-50/80 hover:to-white/90 border border-transparent shadow-md hover:shadow-xl rounded-2xl p-6 h-[450px] md:h-[480px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-orange-300"
            >
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Company Info */}
              <div className="flex gap-4 items-center mb-5">
                <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                  <img
                    src={job.company_logo}
                    alt="Company Logo"
                    className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
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
                  {job.title}
                  <span className="text-orange-500 font-medium text-base ml-1">
                    ({job.jobType})
                  </span>
                </h2>

                <p className="text-sm font-medium text-gray-700 bg-gradient-to-r from-orange-100 to-yellow-100 inline-block px-3 py-1 rounded-md shadow-sm border border-orange-200">
                  {job.salaryRange?.min} - {job.salaryRange?.max}{" "}
                  {job.salaryRange?.currency}
                </p>

                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                  {job.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.requirements?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 text-xs font-semibold rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Button */}
              <div className="mt-6">
                <Link to={`/jobs/${job._id}`}>
                  <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    More Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Jobs;
