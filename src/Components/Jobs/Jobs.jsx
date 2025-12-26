import React, { use } from "react";
import { FaLocationDot, FaMoneyBillWave } from "react-icons/fa6";
import { FiArrowUpRight, FiClock, FiLayers, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Jobs = ({ jobsPromise }) => {
  const jobs = use(jobsPromise);

  return (
    <div className="max-w-6xl mx-auto mt-32 mb-24 px-6 md:px-6 lg:px-0">
      {/* --- Section Header --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-10 h-[2px] bg-indigo-600"></span>
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em]">Latest Opportunities</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">Career Paths</span>
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-slate-500 font-medium text-lg max-w-sm md:text-right"
        >
          Connecting ambitious talent with world-class companies. Your next step starts here.
        </motion.p>
      </div>

      {/* --- Job Cards Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs
          .filter((job) => job.status === "Active")
          .map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative flex flex-col bg-white border border-slate-200 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:border-indigo-100"
            >
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Badge & Logo Row */}
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-3 shadow-inner group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                  <img
                    src={job.company_logo}
                    alt={job.company}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                  />
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

              {/* Main Info */}
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

              {/* Meta Stats */}
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

              {/* Skills Section */}
              <div className="flex flex-wrap gap-2 mb-10 relative z-10">
                {job.requirements?.slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-white border border-slate-200 text-[11px] font-bold text-slate-500 rounded-lg group-hover:border-indigo-200 group-hover:text-indigo-600 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-auto relative z-10">
                <Link to={`/jobs/${job._id}`} className="block">
                  <button className="w-full flex items-center justify-between px-6 py-4 bg-slate-900 group-hover:bg-indigo-600 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-slate-200 active:scale-95 overflow-hidden relative">
                    <span className="relative z-10">Explore Opportunity</span>
                    <FiArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Jobs;