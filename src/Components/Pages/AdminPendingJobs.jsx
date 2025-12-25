import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  FaCheck, FaTimes, FaChevronDown, FaChevronUp, FaSearch, 
  FaRegClock, FaBuilding, FaMapMarkerAlt, FaEnvelope, 
  FaUserShield, FaBriefcase, FaLayerGroup, FaCalendarAlt 
} from 'react-icons/fa';

const AdminPendingJobs = () => {
  const [pendingJobs, setPendingJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [expandedJobs, setExpandedJobs] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/jobs?status=Pending')
      .then(res => {
        setPendingJobs(res.data);
        setFilteredJobs(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (id) => {
    setExpandedJobs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const approveJob = (id) => {
    axios.patch(`http://localhost:5000/jobs/${id}/approve`)
      .then(() => {
        Swal.fire({
            title: 'Approved!',
            text: 'Job listing is now live.',
            icon: 'success',
            confirmButtonColor: '#4f46e5',
            customClass: { popup: 'rounded-[2rem]' }
        });
        setPendingJobs(prev => prev.filter(job => job._id !== id));
        setFilteredJobs(prev => prev.filter(job => job._id !== id));
      })
      .catch(err => console.log(err));
  };

  const rejectJob = (id) => {
    Swal.fire({
      title: 'Reject Listing?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Reject',
      customClass: { popup: 'rounded-[2rem]' }
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`http://localhost:5000/jobs/${id}/reject`)
          .then(() => {
            Swal.fire('Rejected', 'The listing has been removed.', 'error');
            setPendingJobs(prev => prev.filter(job => job._id !== id));
            setFilteredJobs(prev => prev.filter(job => job._id !== id));
          })
          .catch(err => console.log(err));
      }
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const filtered = pendingJobs.filter(job =>
      (job.title?.toLowerCase().includes(query)) ||
      (job.company?.toLowerCase().includes(query)) ||
      (job.division?.toLowerCase().includes(query)) ||
      (job.category?.toLowerCase().includes(query))
    );
    setFilteredJobs(filtered);
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Loading Records...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20 px-4 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
            <div>
                <h1 className="text-4xl font-[1000] text-slate-900 tracking-tighter">Moderation Queue</h1>
                <p className="text-slate-500 font-medium mt-1">Review and approve incoming job submissions.</p>
            </div>
            
            <div className="relative w-full lg:max-w-md">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                    type="text"
                    placeholder="Search by title, company, or category..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 font-bold text-slate-600 transition-all placeholder:text-slate-300 text-sm"
                />
            </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
            {filteredJobs.length > 0 ? filteredJobs.map(job => (
            <div key={job._id} className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                
                {/* Main Row */}
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-2 shrink-0">
                            {job.company_logo ? (
                                <img src={job.company_logo} alt="Logo" className="w-full h-full object-contain" />
                            ) : (
                                <FaBuilding className="text-slate-200 text-2xl" />
                            )}
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight">{job.title}</h3>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mt-1">{job.company}</p>
                            
                            <div className="flex flex-wrap gap-3 mt-3">
                                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-lg">
                                    <FaBriefcase /> {job.jobType}
                                </span>
                                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                                    <FaMapMarkerAlt /> {job.division}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => approveJob(job._id)} className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
                            <FaCheck /> Approve
                        </button>
                        <button onClick={() => rejectJob(job._id)} className="flex-1 md:flex-none bg-white border border-red-100 text-red-500 hover:bg-red-50 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2">
                            <FaTimes /> Reject
                        </button>
                        <button onClick={() => toggleExpand(job._id)} className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-colors">
                            {expandedJobs[job._id] ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                    </div>
                </div>

                {/* Collapsible Content */}
                {expandedJobs[job._id] && (
                <div className="px-8 pb-10 pt-4 bg-slate-50/50 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Job Description</h4>
                                <p className="text-slate-600 text-sm font-medium leading-relaxed bg-white p-6 rounded-2xl border border-slate-100">{job.description}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Requirements</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.isArray(job.requirements) ? job.requirements.map((req, i) => (
                                            <span key={i} className="text-[11px] font-bold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200"># {req}</span>
                                        )) : <span className="text-sm text-slate-500">{job.requirements}</span>}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Responsibilities</h4>
                                    <ul className="space-y-2">
                                        {Array.isArray(job.responsibilities) ? job.responsibilities.map((res, i) => (
                                            <li key={i} className="text-xs text-slate-600 font-bold flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0"></div> {res}
                                            </li>
                                        )) : <li className="text-sm text-slate-500">{job.responsibilities}</li>}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 text-center lg:text-left">Submitter Info</h4>
                            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 space-y-4 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center shrink-0"><FaUserShield /></div>
                                    <div className="overflow-hidden">
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">HR Manager</p>
                                        <p className="text-sm font-black text-slate-700 truncate">{job.hr_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shrink-0"><FaEnvelope /></div>
                                    <div className="overflow-hidden">
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Email Address</p>
                                        <p className="text-sm font-black text-slate-700 truncate">{job.hr_email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center shrink-0"><FaCalendarAlt /></div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Post Deadline</p>
                                        <p className="text-sm font-black text-slate-700">{job.deadline || "Open"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
            )) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                <FaRegClock className="text-slate-200 text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-black text-slate-800">Clear Skies!</h3>
                <p className="text-slate-400 font-medium">No pending jobs are waiting for review.</p>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminPendingJobs;