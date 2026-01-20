import React from "react";
import { FaLocationDot, FaGlobe, FaUsers } from "react-icons/fa6";
import { Link, useLoaderData } from "react-router";
import { FiMail, FiUser, FiCalendar, FiBriefcase, FiExternalLink, FiShield, FiClock, FiAlertCircle } from "react-icons/fi";

const MoreDetails = () => {
  const job = useLoaderData();
  const isDeadlineOver = new Date(job.deadline) < new Date();

  const formatTimeAgo = (createdAt, id) => {
    const postDate = createdAt ? new Date(createdAt) : new Date(parseInt(id.substring(0, 8), 16) * 1000);
    const now = new Date();
    const diffInMs = now - postDate;
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 60) return `${diffInMins} mins ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${diffInDays} days ago`;
  };

  return (
    <div className="min-h-screen -mb-24 bg-[#F3F4F6] pb-58 pt-32">
      <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0">
        
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link to="/jobs" className="hover:text-indigo-600">Jobs</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate">{job.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div className="flex gap-6">
                    <div className="w-20 h-20 rounded-xl border border-slate-100 flex-shrink-0 bg-white p-2 shadow-sm">
                      <img src={job.company_logo} alt="Company" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-slate-600">
                        <span className="font-semibold text-indigo-600 hover:underline cursor-pointer">{job.company}</span>
                        <span className="flex items-center gap-1.5"><FaLocationDot className="text-slate-400" /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><FiClock className="text-slate-400" /> Posted {formatTimeAgo(job.createdAt, job._id)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-md text-xs font-bold uppercase tracking-wider">{job.jobType}</span>
                  <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md text-xs font-bold uppercase tracking-wider">{job.category}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-10">
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Job Description</h3>
                <div className="text-slate-600 leading-relaxed space-y-4">
                  <p>{job.description}</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Responsibilities</h3>
                <ul className="grid grid-cols-1 gap-4">
                  {job.responsibilities?.map((res, i) => (
                    <li key={i} className="flex gap-3 text-slate-600">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></div>
                      <span className="text-[15px]">{res}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.requirements?.map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="mb-6">
                <p className="text-sm text-slate-500 mb-1">Estimated Salary</p>
                <h4 className="text-2xl font-bold text-slate-900">
                  {job.salaryRange?.min}k - {job.salaryRange?.max}k 
                  <span className="text-base font-normal text-slate-500 ml-1">{job.salaryRange?.currency} / yr</span>
                </h4>
              </div>

              {!isDeadlineOver ? (
                <Link to={`/jobApply/${job._id}`} className="block">
                  <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2">
                    Apply Now <FiExternalLink />
                  </button>
                </Link>
              ) : (
                <button disabled className="w-full py-4 bg-slate-200 text-slate-500 rounded-lg font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                   <FiAlertCircle /> Applications Closed
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Application Deadline</span>
                  <span className={`font-semibold ${isDeadlineOver ? 'text-red-500' : 'text-slate-900'}`}>
                    {new Date(job.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Job Security</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium"><FiShield /> Verified</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FaUsers className="text-indigo-600" /> About Recruitment
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Hiring Manager</p>
                  <p className="text-sm font-bold text-slate-800">{job.hr_name}</p>
                  <p className="text-xs text-indigo-600 font-medium underline truncate mt-1">{job.hr_email}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;