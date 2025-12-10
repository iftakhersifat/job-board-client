import React, { use } from "react";
import { FaLocationDot, FaMoneyBillWave } from "react-icons/fa6";
import { Link } from "react-router";

const Jobs = ({ jobsPromise }) => {
  const jobs = use(jobsPromise);

  return (
    <div className="max-w-6xl mx-auto mt-24 px-6 lg:px-0">
      {/* Header Section */}
      <div className="text-center px-6">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {jobs
          .filter((job) => job.status === "Active")
          .map((job) => (
            <div
              key={job._id}
              className="group relative flex flex-col justify-between bg-white/60 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl h-[400px] transition-all duration-500 p-6 border border-transparent hover:border-orange-300"
            >
              {/* Featured Badge */}
              {job.featured && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Featured
                </span>
              )}

              {/* Company Info */}
              <div className="flex items-center gap-4 mb-5">
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
                <h2 className="font-bold text-xl text-gray-800 group-hover:text-orange-600 transition-colors leading-snug">
                  {job.title}{" "}
                  <span className="text-orange-500 font-medium text-base ml-1">
                    ({job.jobType})
                  </span>
                </h2>

                <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaMoneyBillWave className="text-green-500" />
                  {job.salaryRange?.min} - {job.salaryRange?.max}{" "}
                  {job.salaryRange?.currency}
                </p>

                <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
                  {job.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-2 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-50">
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
              <div className="mt-4">
                <Link to={`/jobs/${job._id}`}>
                  <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300">
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
