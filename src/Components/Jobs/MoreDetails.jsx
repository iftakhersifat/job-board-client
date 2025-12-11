import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useLoaderData } from "react-router";

const MoreDetails = () => {
  const job = useLoaderData();

  // Check if deadline is over
  const today = new Date();
  const deadlineDate = new Date(job.deadline);
  const isDeadlineOver = deadlineDate < today;

  // Format deadline nicely
  const formattedDeadline = new Date(job.deadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-6 lg:px-0 mt-12">

      {/* Main Card */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-orange-200 shadow-xl p-8 md:p-10 space-y-8">

        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl 
          bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500"></div>

        {/* Company & Job Type */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-4">

          {/* Company Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-orange-200 shadow flex items-center justify-center">
              <img
                src={job.company_logo}
                alt="Company Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{job.company}</h2>
              <p className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                <FaLocationDot className="text-orange-600" /> {job?.location}
              </p>
              <p className={`text-sm font-semibold mt-1 ${isDeadlineOver ? "text-red-600" : "text-green-600"}`}>
                Deadline: {formattedDeadline} {isDeadlineOver && "(Passed)"}
              </p>
            </div>
          </div>

          {/* Job Type Tag */}
          <div>
            <span className="px-4 py-2 text-sm rounded-xl font-medium bg-gradient-to-r
              from-orange-600 to-red-500 text-white shadow-md">
              {job.jobType}
            </span>
          </div>
        </div>

        {/* Job Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          {job.title}
        </h1>

        {/* Salary */}
        <div>
          <p className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-lg 
            text-sm font-semibold border border-orange-200">
            Salary: {job.salaryRange?.min} - {job.salaryRange?.max} {job.salaryRange?.currency}
          </p>
        </div>

        {/* Description */}
        <section className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900">Job Description</h3>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            {job.description}
          </p>
        </section>

        {/* Skills */}
        <section className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.requirements?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-100 text-orange-700 border border-orange-300 
                text-xs rounded-full font-medium hover:bg-orange-200 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Responsibilities */}
        <section className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900">Responsibilities</h3>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 text-sm md:text-base">
            {job.responsibilities?.map((res, index) => (
              <li key={index}>{res}</li>
            ))}
          </ul>
        </section>

        {/* HR Section */}
        <section className="bg-orange-50 border border-orange-200 rounded-xl p-5 space-y-2">
          <h3 className="text-lg font-bold text-gray-900">HR Contact</h3>

          <p className="text-sm text-gray-700">
            <strong>Name:</strong>{" "}
            <span className="text-orange-700 font-medium">{job.hr_name}</span>
          </p>

          <p className="text-sm text-gray-700">
            <strong>Email:</strong>{" "}
            <span className="text-orange-700 font-medium">{job.hr_email}</span>
          </p>
        </section>

        {/* Apply Button */}
        <div className="pt-4">
          {isDeadlineOver ? (
            <button
              disabled
              className="w-full md:w-auto px-8 py-3 rounded-xl font-semibold text-white
                bg-gray-400 cursor-not-allowed shadow-lg transition-all duration-300"
            >
              Deadline Passed
            </button>
          ) : (
            <Link to={`/jobApply/${job._id}`}>
              <button className="w-full md:w-auto px-8 py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600
                shadow-lg hover:shadow-xl transition-all duration-300">
                Apply Now
              </button>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default MoreDetails;
