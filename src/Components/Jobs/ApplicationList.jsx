import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Calendar, Trash2, TrendingUp, Clock, Filter, List, Download } from 'lucide-react';

const ApplicationList = ({ myApplicationList }) => {
    const [loading, setLoading] = useState(true);
    const [originalList, setOriginalList] = useState([]); 
    const [displayList, setDisplayList] = useState([]);   
    const [activeFilter, setActiveFilter] = useState("total");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        setLoading(true);
        myApplicationList.then(data => {
            setOriginalList(data);
            setDisplayList(data);
            setLoading(false);
        });
    }, [myApplicationList]);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = getFilteredByTime(activeFilter, originalList);
            
            if (statusFilter !== "All") {
                filtered = filtered.filter(app => {
                    const appStatus = (app.status || "Pending").toString().trim().toLowerCase();
                    const targetStatus = statusFilter.toString().trim().toLowerCase();
                    return appStatus === targetStatus;
                });
            }
            
            setDisplayList(filtered);
        };
        applyFilters();
    }, [activeFilter, statusFilter, originalList]);

    const getFilteredByTime = (type, list) => {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        switch (type) {
            case "today": return list.filter(app => new Date(app.appliedAt) >= todayStart);
            case "thisWeek":
                const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
                return list.filter(app => new Date(app.appliedAt) >= weekStart);
            case "lastWeek":
                const lwEnd = new Date(); lwEnd.setDate(lwEnd.getDate() - lwEnd.getDay() - 1);
                lwEnd.setHours(23, 59, 59, 999);
                const lwStart = new Date(lwEnd); lwStart.setDate(lwStart.getDate() - 6);
                lwStart.setHours(0, 0, 0, 0);
                return list.filter(app => { const d = new Date(app.appliedAt); return d >= lwStart && d <= lwEnd; });
            case "thisMonth":
                return list.filter(app => new Date(app.appliedAt).getMonth() === new Date().getMonth() && new Date(app.appliedAt).getFullYear() === new Date().getFullYear());
            case "lastMonth":
                const lm = new Date(); lm.setMonth(lm.getMonth() - 1);
                return list.filter(app => new Date(app.appliedAt).getMonth() === lm.getMonth() && new Date(app.appliedAt).getFullYear() === lm.getFullYear());
            default: return list;
        }
    };

    const handleExportCSV = () => {
        if (displayList.length === 0) return Swal.fire("No Data", "Nothing to export!", "info");
        const headers = ["Company,Job Role,Applied Date,Status"];
        const rows = displayList.map(app => (
            `"${app.company}","${app.category || app.title}","${new Date(app.appliedAt).toLocaleDateString()}","${app.status || 'Pending'}"`
        ));
        const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `job_applications.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Record?',
            text: "This action is permanent.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', 
            confirmButtonText: 'Yes, delete'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://job-board-server-five.vercel.app/applications/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setOriginalList(prev => prev.filter(app => app._id !== id));
                            setDisplayList(prev => prev.filter(app => app._id !== id));
                            Swal.fire('Deleted!', 'Record removed.', 'success');
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire('Error!', 'Something went wrong.', 'error');
                    });
            }
        });
    };

    const getStatusStyles = (status) => {
        const s = (status || "Pending").toLowerCase();
        if (s.includes('hired')) return 'bg-emerald-500';
        if (s.includes('rejected')) return 'bg-rose-500';
        if (s.includes('interview')) return 'bg-amber-500';
        return 'bg-indigo-500';
    };

    return (
        <div className='max-w-6xl mx-auto px-6 py-28 min-h-screen'>
            <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter">
                        Application <span className="text-indigo-600 font-bold">List</span>
                    </h1>
                    <p className="text-slate-400 font-medium text-sm">Review and track your application timeline.</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex bg-white border border-slate-200 p-1 rounded-2xl shadow-sm overflow-x-auto">
                        {["All", "Hired", "Rejected", "Call for Interview", "Pending"].map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${
                                    statusFilter === s ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
                    >
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
                <StatCard label="Today" count={getFilteredByTime("today", originalList).length} active={activeFilter === 'today'} onClick={() => setActiveFilter('today')} color="bg-rose-500" icon={<Clock size={18} />} />
                <StatCard label="This Week" count={getFilteredByTime("thisWeek", originalList).length} active={activeFilter === 'thisWeek'} onClick={() => setActiveFilter('thisWeek')} color="bg-indigo-600" icon={<TrendingUp size={18} />} />
                <StatCard label="Last Week" count={getFilteredByTime("lastWeek", originalList).length} active={activeFilter === 'lastWeek'} onClick={() => setActiveFilter('lastWeek')} color="bg-cyan-600" icon={<Calendar size={18} />} />
                <StatCard label="This Month" count={getFilteredByTime("thisMonth", originalList).length} active={activeFilter === 'thisMonth'} onClick={() => setActiveFilter('thisMonth')} color="bg-blue-600" icon={<Calendar size={18} />} />
                <StatCard label="Last Month" count={getFilteredByTime("lastMonth", originalList).length} active={activeFilter === 'lastMonth'} onClick={() => setActiveFilter('lastMonth')} color="bg-purple-600" icon={<Calendar size={18} />} />
                <StatCard label="Total All" count={originalList.length} active={activeFilter === 'total'} onClick={() => setActiveFilter('total')} color="bg-slate-900" icon={<List size={18} />} />
            </div>

            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="py-32 text-center"><span className="loading loading-ring loading-lg text-indigo-600"></span></div>
                ) : displayList.length === 0 ? (
                    <div className="text-center py-32">
                        <Filter className="mx-auto mb-4 text-slate-200" size={48} />
                        <h2 className="text-xl font-black text-slate-800 uppercase">No Data Found</h2>
                        <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">Try changing filters</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full border-collapse">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                                <tr className="text-slate-400 uppercase text-[10px] tracking-widest font-black">
                                    <th className="py-6 pl-8">Company</th>
                                    <th>Job Details</th>
                                    <th>Applied On</th>
                                    <th>Status</th>
                                    <th className="text-right pr-8">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {displayList.map((app) => (
                                    <tr key={app._id} className="group hover:bg-indigo-50/30 transition-all">
                                        <td className="py-6 pl-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center p-1.5 shadow-sm group-hover:rotate-6 transition-all">
                                                    <img src={app.company_logo || "https://cdn-icons-png.flaticon.com/512/281/281764.png"} alt="logo" className="w-full h-full object-contain" />
                                                </div>
                                                <span className="font-black text-slate-800 text-xs uppercase italic">{app.company}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="font-bold text-slate-900 text-sm">{app.category || app.title}</p>
                                        </td>
                                        <td className="text-[10px] font-black text-slate-400 uppercase">
                                            {new Date(app.appliedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <span className={`w-1.5 h-1.5 rounded-full ${getStatusStyles(app.status)}`}></span>
                                                <span className="text-[10px] font-black text-slate-600 uppercase italic">{app.status || "Pending"}</span>
                                            </div>
                                        </td>
                                        <td className="text-right pr-8">
                                            <button onClick={() => handleDelete(app._id)} className="p-2 text-slate-300 hover:text-rose-500 transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ label, count, active, color, icon, onClick }) => (
    <button onClick={onClick} className={`p-4 rounded-[24px] border transition-all text-left flex flex-col justify-between h-32 relative overflow-hidden group ${active ? `border-indigo-500 bg-white ring-4 ring-indigo-500/5 shadow-lg scale-105` : `bg-white border-slate-100 hover:border-slate-300 shadow-sm`}`}>
        <div className={`w-9 h-9 ${color} text-white rounded-xl flex items-center justify-center shadow-lg mb-2 relative z-10 group-hover:scale-110 transition-all`}>{icon}</div>
        <div className="relative z-10">
            <h3 className={`text-2xl font-black ${active ? 'text-indigo-600' : 'text-slate-900'}`}>{count}</h3>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p>
        </div>
        {active && <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-indigo-500/5 rounded-full"></div>}
    </button>
);

export default ApplicationList;