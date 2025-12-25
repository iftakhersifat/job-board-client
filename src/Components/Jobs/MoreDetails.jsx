import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useLoaderData } from "react-router";
import { FiMail, FiUser, FiCalendar, FiBriefcase, FiDollarSign } from "react-icons/fi";

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
    <div className="max-w-4xl mx-auto px-5 md:px-6 lg:px-0 mt-28 pb-20">

      {/* Main Card */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-indigo-100 shadow-2xl p-8 md:p-10 space-y-8 overflow-hidden">

        {/* Top Accent Line - Now Indigo to Blue */}
        <div className="absolute top-0 left-0 w-full h-1.5 rounded-t-3xl 
          bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500"></div>

        {/* Company & Job Type */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-4 relative z-10">

          {/* Company Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white border border-indigo-50 shadow-sm flex items-center justify-center p-2">
              <img
                src={job.company_logo}
                alt="Company Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{job.company}</h2>
              <p className="flex items-center gap-1 text-slate-500 text-sm mt-1 font-medium">
                <FaLocationDot className="text-indigo-600" /> {job?.location}
              </p>
              <p className={`flex items-center gap-1 text-sm font-bold mt-2 ${isDeadlineOver ? "text-red-500" : "text-emerald-600"}`}>
                <FiCalendar /> Deadline: {formattedDeadline} {isDeadlineOver && "(Passed)"}
              </p>
            </div>
          </div>

          {/* Job Type Tag - Indigo Styled */}
          <div>
            <span className="px-5 py-2.5 text-xs rounded-xl font-black uppercase tracking-widest bg-gradient-to-r
              from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-100 flex items-center gap-2">
              <FiBriefcase /> {job.jobType}
            </span>
          </div>
        </div>

        {/* Job Title */}
        <h1 className="text-4xl md:text-5xl font-[1000] text-slate-900 leading-[1.1] tracking-tight">
          {job.title}
        </h1>

        {/* Salary Badge - Indigo Styled */}
        <div className="flex items-center gap-2 w-fit bg-indigo-50 text-indigo-700 px-5 py-2.5 rounded-2xl 
          text-sm font-black border border-indigo-100 shadow-sm">
          <FiDollarSign className="text-indigo-500" size={18} />
          Salary: {job.salaryRange?.min} - {job.salaryRange?.max} {job.salaryRange?.currency}
        </div>

        {/* Description */}
        <section className="space-y-4 pt-4 border-t border-slate-50">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
             <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
             Job Description
          </h3>
          <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">
            {job.description}
          </p>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
             <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
             Required Skills
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {job.requirements?.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-1.5 bg-slate-50 text-slate-600 border border-slate-200 
                text-xs rounded-xl font-bold hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Responsibilities */}
        <section className="space-y-4">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
             <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
             Responsibilities
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {job.responsibilities?.map((res, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-600 text-sm md:text-base font-medium">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                {res}
              </li>
            ))}
          </ul>
        </section>

        {/* HR Section - Now Indigo themed */}
        <section className="bg-slate-50 border border-indigo-100 rounded-[2rem] p-6 md:p-8 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-600">
             <FiUser size={100} />
          </div>
          
          <h3 className="text-xl font-black text-slate-900">HR Contact</h3>

          <div className="flex flex-col gap-3 relative z-10">
            <p className="flex items-center gap-3 text-sm md:text-base text-slate-700">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <FiUser />
              </span>
              <strong>Name:</strong>{" "}
              <span className="text-indigo-700 font-bold ml-1">{job.hr_name}</span>
            </p>

            <p className="flex items-center gap-3 text-sm md:text-base text-slate-700">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <FiMail />
              </span>
              <strong>Email:</strong>{" "}
              <span className="text-indigo-700 font-bold ml-1">{job.hr_email}</span>
            </p>
          </div>
        </section>

        {/* Apply Button Section */}
        <div className="pt-8">
          {isDeadlineOver ? (
            <button
              disabled
              className="w-full md:w-auto px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white
                bg-slate-300 cursor-not-allowed shadow-none"
            >
              Deadline Passed
            </button>
          ) : (
            <Link to={`/jobApply/${job._id}`}>
              <button className="w-full md:w-auto px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] text-white
                bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700
                shadow-xl shadow-indigo-100 hover:shadow-indigo-200 transition-all duration-300 hover:-translate-y-1 active:scale-95">
                Apply for this Job
              </button>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default MoreDetails;