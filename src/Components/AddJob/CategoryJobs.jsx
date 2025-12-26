import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import JobCard from "../SearchJobs/JobCard";
import { FiArrowLeft, FiBriefcase, FiFilter } from "react-icons/fi";

const CategoryJobs = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("https://job-board-server-five.vercel.app/jobs").then((res) => {
      const filtered = res.data.filter(
        (job) => job.category === decodedCategory
      );
      setJobs(filtered);
      setLoading(false);
    });
  }, [decodedCategory]);

  return (
    <div className="max-w-6xl mx-auto mt-28 px-6 md:px-6 lg:px-0 pb-20">
      
      {/* Breadcrumb / Back Navigation */}
      <Link 
        to="/" 
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 font-semibold text-sm group"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Categories
      </Link>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-8 mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
               <FiBriefcase size={20} />
            </div>
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Category Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-[1000] text-slate-900 tracking-tight">
            {decodedCategory} <span className="text-indigo-600 text-5xl">.</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Explore {jobs.length} open positions in the {decodedCategory} sector.
          </p>
        </div>
        
        {/* Result Counter/Filter Placeholder */}
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
           <FiFilter className="text-slate-400" />
           <span className="text-sm font-bold text-slate-600">{jobs.length} Results Found</span>
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="flex flex-col justify-center items-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold animate-pulse uppercase text-xs tracking-[0.2em]">Searching Jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6">
             <FiBriefcase size={40} className="text-slate-200" />
          </div>
          <h2 className="text-2xl font-black text-slate-800">No Jobs Available</h2>
          <p className="text-slate-500 mt-2 max-w-xs mx-auto font-medium">
            Currently, there are no active openings for {decodedCategory}. Please check back later.
          </p>
          <Link to="/">
            <button className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all">
              Browse Other Categories
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryJobs;