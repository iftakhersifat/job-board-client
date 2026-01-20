import React, { use } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FiArrowUpRight, FiClock, FiLayers, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router";

const Jobs = ({ jobsPromise }) => {
  const jobs = use(jobsPromise);

  if (!jobs || jobs.length === 0) {
    return <div className="text-center py-20 text-slate-500">No jobs available right now.</div>;
  }


  const activeJobs = jobs
    .filter((job) => job.status === "Active")
    .slice(0, 9);

  return (
    <div className="max-w-6xl mx-auto mt-32 mb-24 px-6 md:px-6 lg:px-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-10 h-[2px] bg-indigo-600"></span>
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em]">Latest Opportunities</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-500">Career Paths</span>
          </h1>
        </div>
        
        <p className="text-slate-500 font-medium text-lg max-w-sm md:text-right">
          Connecting ambitious talent with world-class companies. Your next step starts here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeJobs.map((job) => (
          <div
            key={job._id}
            className="group relative flex flex-col bg-white border border-slate-200 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:border-indigo-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-indigo-50 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-3 shadow-inner group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                <img src={job.company_logo} alt={job.company} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"/>
              </div>
              <div className="flex flex-col items-end gap-2">
                {job.featured && (
                  <span className="flex items-center gap-1.5 bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-indigo-100 uppercase tracking-wider">
                    <FiCheckCircle size={12} /> Featured
                  </span>
                )}
                <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1.5 rounded-full border border-slate-200 uppercase tracking-wider">
                  {job.jobType}
                </span>
              </div>
            </div>

            <div className="mb-6 relative z-10">
              <h2 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight mb-3">
                {job.title}
              </h2>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                 <span className="text-slate-500 font-bold text-sm flex items-center gap-1.5">
                    <FiLayers className="text-indigo-500" /> {job.company}
                 </span>
                 <span className="text-slate-400 font-bold text-sm flex items-center gap-1.5">
                    <FaLocationDot /> {job.location}
                 </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
              <div className="bg-slate-50 group-hover:bg-indigo-50/50 p-4 rounded-2xl border border-slate-100 group-hover:border-indigo-100 transition-colors">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Compensations</p>
                <p className="text-sm font-black text-slate-700">
                  {job.salaryRange?.min}K - {job.salaryRange?.max}K <span className="text-[10px]">{job.salaryRange?.currency}</span>
                </p>
              </div>
              <div className="bg-slate-50 group-hover:bg-blue-50/50 p-4 rounded-2xl border border-slate-100 group-hover:border-blue-100 transition-colors">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Schedule</p>
                <p className="text-sm font-black text-slate-700 flex items-center gap-1.5">
                  <FiClock /> Full-time
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-10 relative z-10">
              {job.requirements?.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-white border border-slate-200 text-[11px] font-bold text-slate-500 rounded-lg group-hover:border-indigo-200 group-hover:text-indigo-600 transition-all">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-auto relative z-10">
              <Link to={`/jobs/${job._id}`} className="block">
                <button className="w-full flex items-center justify-between px-6 py-4 bg-slate-900 group-hover:bg-indigo-600 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-slate-200 active:scale-95 overflow-hidden">
                  <span>Explore Opportunity</span>
                  <FiArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

     <div className="mt-12 md:mt-20 text-center">
  <Link to="/jobs" className="inline-block group w-full sm:w-auto px-6 sm:px-0">
    <button className="relative w-full sm:w-auto flex items-center justify-center gap-3 md:gap-4 px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] active:scale-95">
      
      <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      
      <span className="relative z-10">View All Available Positions</span>

      <FiArrowUpRight size={18} className="relative z-10 group-hover:rotate-45 group-hover:translate-x-1 transition-all duration-500 flex-shrink-0" />
    </button>
  </Link>
</div>
    </div>
  );
};

export default Jobs;