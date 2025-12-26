import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEdit, FaUsers, FaCalendarAlt, FaBriefcase, FaPlus, FaFilter, FaCheckCircle, FaClock } from 'react-icons/fa';

const PostedJobList = ({ postedJobPromise }) => {
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([]);
  const [filter, setFilter] = useState('All'); // 'All', 'Pending', 'Active'

  useEffect(() => {
    setLoading(true);
    postedJobPromise.then(data => {
      const userJobs = data.filter(job =>
        job.status === "Pending" || job.status === "Active"
      );
      setAllJobs(userJobs);
      setLoading(false);
    });
  }, [postedJobPromise]);

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    if (filter === 'All') return allJobs;
    return allJobs.filter(job => job.status === filter);
  }, [allJobs, filter]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Archive this listing?",
      text: "All candidate applications for this role will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#1e293b',
      cancelButtonColor: '#f1f5f9',
      confirmButtonText: "Yes, delete",
      customClass: { popup: 'rounded-[2rem]', confirmButton: 'text-white font-bold' }
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://job-board-server-five.vercel.app/jobs/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setAllJobs(prev => prev.filter(job => job._id !== id));
              Swal.fire({ title: "Deleted", text: "Listing removed successfully.", icon: "success", customClass: { popup: 'rounded-[2rem]' } });
            }
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#F8FAFC]">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        <p className="mt-4 text-slate-400 font-black text-[10px] uppercase tracking-widest">Fetching Listings...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen -mb-20 bg-[#F8FAFC] pt-24 pb-20 px-6 md:px-6 lg:px-0'>
      <div className='max-w-6xl mx-auto'>
        
        {/* Top Header Section */}
        <div className="flex flex-row lg:items-center justify-between gap-8 mb-12">
            <div>
                <h1 className="text-4xl font-[1000] text-slate-900 tracking-tighter">Recruitment Dashboard</h1>
                <p className="text-slate-500 font-bold mt-1 uppercase text-[11px] tracking-widest">Manage your organization's open roles</p>
            </div>
            
            <Link 
    to="/addJob" 
    className="group relative flex items-center justify-center bg-indigo-600 text-white w-14 h-14 md:w-auto md:px-8 md:py-4 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all duration-300 active:scale-95 overflow-hidden"
>
    {/* Desktop Text */}
    <span className="hidden md:inline-block font-black text-xs uppercase tracking-widest mr-3">
        Post New Job
    </span>
    
    {/* Icon with Animation */}
    <FaPlus className="text-xl group-hover:rotate-90 transition-transform duration-500" />

    {/* Subtle Glow Effect */}
    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
</Link>
        </div>

        {/* --- Advanced Filtering Tabs --- */}
        <div className="flex items-center justify-between mb-8 bg-white p-2 rounded-[1.5rem] border border-slate-200 shadow-sm overflow-x-auto">
            <div className="flex items-center gap-1">
                {[
                    { label: 'All Posted', value: 'All', icon: <FaBriefcase /> },
                    { label: 'Approval Required', value: 'Pending', icon: <FaClock /> },
                    { label: 'Live Approved', value: 'Active', icon: <FaCheckCircle /> }
                ].map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setFilter(tab.value)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                            filter === tab.value 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                            : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                        }`}
                    >
                        {tab.icon} {tab.label}
                        <span className={`ml-2 px-2 py-0.5 rounded-md text-[9px] ${
                            filter === tab.value ? 'bg-white/20' : 'bg-slate-100 text-slate-500'
                        }`}>
                            {tab.value === 'All' ? allJobs.length : allJobs.filter(j => j.status === tab.value).length}
                        </span>
                    </button>
                ))}
            </div>
            <div className="hidden md:flex items-center gap-2 px-6 text-slate-300">
                <FaFilter size={12} />
                <span className="text-[10px] font-black uppercase tracking-widest">Filter active</span>
            </div>
        </div>

        {/* --- Job List --- */}
        <div className="space-y-4">
            {filteredJobs.length > 0 ? filteredJobs.map((post) => (
                <div key={post._id} className="group bg-white border border-slate-200 rounded-[2.2rem] p-6 transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-100">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        
                        {/* Company & Identity */}
                        <div className="flex items-center gap-5 lg:w-[35%]">
                            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[1.4rem] overflow-hidden p-3 flex items-center justify-center group-hover:bg-white transition-colors">
                                {post.company_logo ? (
                                    <img src={post.company_logo} alt="logo" className="w-full h-full object-contain" />
                                ) : (
                                    <FaBriefcase className="text-slate-300 text-xl" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                                <p className="text-slate-500 font-bold text-xs mt-1">{post.company} <span className="mx-2 text-slate-200">•</span> <span className="text-indigo-500">{post?.division || "Global"}</span></p>
                            </div>
                        </div>

                        {/* Status & Deadline */}
                        <div className="flex flex-col lg:items-center lg:w-[25%]">
                            {post.status === "Pending" ? (
                                <span className="px-4 py-1.5 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100">
                                    Pending Approval
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Published Live
                                </span>
                            )}
                            <p className="flex items-center gap-2 text-slate-400 text-[11px] font-bold mt-3">
                                <FaCalendarAlt className="text-slate-300" /> Deadline: {post.deadline}
                            </p>
                        </div>

                        {/* Interactive Actions */}
                        <div className="flex items-center justify-end gap-3 lg:w-[40%] ml-auto w-full">
                            {post.status === "Active" ? (
                                <Link to={`/applications/${post._id}`} className="flex-1 lg:flex-none text-center px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-lg shadow-slate-100 hover:shadow-indigo-100">
                                   <FaUsers className="inline mr-2 mt-[-2px]" /> View Applications
                                </Link>
                            ) : (
                                <Link to={`/jobs/edit/${post._id}`} className="flex-1 lg:flex-none text-center px-8 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all">
                                   <FaEdit className="inline mr-2 mt-[-2px]" /> Modify Listing
                                </Link>
                            )}

                            <button
                                onClick={() => handleDelete(post._id)}
                                className="p-4 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all border border-transparent hover:border-red-100"
                            >
                                <FaTrashAlt size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )) : (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] py-24 text-center">
                    <FaBriefcase className="text-slate-200 text-5xl mx-auto mb-4" />
                    <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">No {filter !== 'All' ? filter.toLowerCase() : ''} positions found</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PostedJobList;