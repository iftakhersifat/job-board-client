import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaSearch, FaBriefcase, FaBuilding, FaRegClock } from 'react-icons/fa';

const AdminJobControl = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDeadline, setFilterDeadline] = useState("all");

    const fetchJobs = async () => {
        try {
            const res = await axios.get('https://job-board-server-five.vercel.app/jobs');
            setJobs(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch Error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This job will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#1e293b',
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://job-board-server-five.vercel.app/jobs/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setJobs(jobs.filter(job => job._id !== id));
                            Swal.fire("Deleted!", "Listing has been removed.", "success");
                        }
                    });
            }
        });
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
        
        const today = new Date();
        const deadlineDate = new Date(job.applicationDeadline);
        const isExpired = deadlineDate < today;

        if (filterDeadline === "expired") return matchesSearch && isExpired;
        if (filterDeadline === "active") return matchesSearch && !isExpired;
        return matchesSearch;
    });

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-[#F8FAFC]">
            <span className="loading loading-bars loading-lg text-indigo-600"></span>
        </div>
    );

    return (
        <div className="min-h-screen -mb-24 bg-[#F8FAFC] pt-28 pb-20 px-6 md:px-6 lg:px-0">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-[1000] text-slate-900 tracking-tighter uppercase italic">System Control</h1>
                        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Inventory Management & Job Moderation</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        {/* Deadline Filter */}
                        <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm w-full sm:w-auto">
                            <FaRegClock className="text-slate-400" />
                            <select 
                                className="outline-none font-bold text-xs bg-transparent text-slate-700 cursor-pointer uppercase tracking-wider"
                                onChange={(e) => setFilterDeadline(e.target.value)}>
                                <option value="all">All Deadlines</option>
                                <option value="active">Live Jobs</option>
                                <option value="expired">Deadline Over</option>
                            </select>
                        </div>

                        {/* Search Input */}
                        <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm w-full md:w-80">
                            <FaSearch className="text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Filter by role..." 
                                className="w-full outline-none font-bold text-sm bg-transparent text-slate-700"
                                onChange={(e) => setSearchTerm(e.target.value)}/>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hidden lg:block">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Position & Company</th>
                                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">HR Email</th>
                                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Deadline Status</th>
                                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredJobs.map((job) => {
                                const isExpired = new Date(job.applicationDeadline) < new Date();
                                return (
                                    <tr key={job._id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                                                    <img src={job.company_logo} className="w-full h-full object-contain" alt="brand" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-sm leading-tight">{job.title}</p>
                                                    <p className="text-indigo-600 text-[10px] font-black uppercase flex items-center gap-1.5 mt-1.5">
                                                       <FaBuilding size={10}/> {job.company}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <p className="text-slate-600 font-bold text-xs">{job.hr_email}</p>
                                            <p className="text-slate-400 text-[10px] font-medium mt-0.5 tracking-tighter">Due: {job.applicationDeadline}</p>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                                                isExpired 
                                                ? 'bg-rose-50 text-rose-500 border-rose-100' 
                                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            }`}>
                                                {isExpired ? "Deadline Over" : "In Progress"}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <button 
                                                onClick={() => handleDelete(job._id)} 
                                                className="inline-flex items-center justify-center w-10 h-10 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-sm">
                                                <FaTrashAlt size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="lg:hidden grid grid-cols-1 gap-4">
                    {filteredJobs.map((job) => {
                        const isExpired = new Date(job.applicationDeadline) < new Date();
                        return (
                            <div key={job._id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <img src={job.company_logo} className="w-10 h-10 object-contain" alt="" />
                                        <div>
                                            <h3 className="font-black text-slate-800 text-sm">{job.title}</h3>
                                            <p className="text-indigo-600 text-[9px] font-bold uppercase">{job.company}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete(job._id)} className="text-rose-500 p-2 bg-rose-50 rounded-lg">
                                        <FaTrashAlt size={12} />
                                    </button>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                    <span className={`text-[10px] font-bold uppercase ${isExpired ? 'text-rose-500' : 'text-emerald-600'}`}>
                                        {isExpired ? "Deadline Over" : "Active"}
                                    </span>
                                    <p className="text-[11px] text-slate-500 font-bold italic">{job.applicationDeadline}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredJobs.length === 0 && (
                    <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaBriefcase className="text-slate-200 text-3xl" />
                        </div>
                        <h3 className="text-slate-800 font-black text-lg uppercase tracking-tighter">No Matches Found</h3>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Try changing your filters or search term</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminJobControl;