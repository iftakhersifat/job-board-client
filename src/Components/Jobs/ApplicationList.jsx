import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import { Calendar, Trash2, Briefcase, MapPin, TrendingUp, Clock, ChevronRight, BarChart3, X } from 'lucide-react';

const ApplicationList = ({ myApplicationList }) => {
  const [loading, setLoading] = useState(true);
  const [allApplications, setAllApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [timeStats, setTimeStats] = useState({ thisWeek: 0, lastWeek: 0, thisMonth: 0, lastMonth: 0 });

  useEffect(() => {
    setLoading(true);
    myApplicationList.then(data => {
      setAllApplications(data);
      processStats(data);
      setLoading(false);
    });
  }, [myApplicationList]);

  const dateRanges = useMemo(() => {
    const now = new Date();
    const getStartOfWeek = (d) => {
      const date = new Date(d);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(date.setDate(diff)).setHours(0, 0, 0, 0);
    };

    return {
      thisWeekStart: getStartOfWeek(now),
      lastWeekStart: new Date(getStartOfWeek(now) - 7 * 24 * 60 * 60 * 1000).getTime(),
      thisMonthStart: new Date(now.getFullYear(), now.getMonth(), 1).getTime(),
      lastMonthStart: new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime()
    };
  }, []);

  const processStats = (data) => {
    const stats = data.reduce((acc, app) => {
      const appDate = new Date(app.appliedDate || Date.now()).getTime();
      if (appDate >= dateRanges.thisWeekStart) acc.thisWeek++;
      else if (appDate >= dateRanges.lastWeekStart) acc.lastWeek++;
      if (appDate >= dateRanges.thisMonthStart) acc.thisMonth++;
      else if (appDate >= dateRanges.lastMonthStart) acc.lastMonth++;
      return acc;
    }, { thisWeek: 0, lastWeek: 0, thisMonth: 0, lastMonth: 0 });
    setTimeStats(stats);
  };

  const filteredList = allApplications.filter(app => {
    const appDate = new Date(app.appliedDate || Date.now()).getTime();
    if (activeFilter === 'thisWeek') return appDate >= dateRanges.thisWeekStart;
    if (activeFilter === 'lastWeek') return appDate >= dateRanges.lastWeekStart && appDate < dateRanges.thisWeekStart;
    if (activeFilter === 'thisMonth') return appDate >= dateRanges.thisMonthStart;
    if (activeFilter === 'lastMonth') return appDate >= dateRanges.lastMonthStart && appDate < dateRanges.thisMonthStart;
    return true;
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Remove Record?',
      text: "Permanent removal of this application data.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      confirmButtonText: 'Yes, Delete',
      customClass: { popup: 'rounded-[24px]' }
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/applications/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            const newList = allApplications.filter(app => app._id !== id);
            setAllApplications(newList);
            processStats(newList);
            Swal.fire({ title: 'Removed', icon: 'success', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
          }
        });
      }
    });
  };

  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">
            Application<span className="text-indigo-600">List</span>
          </h1>
          <p className="text-slate-500 font-medium mt-3 flex items-center gap-2">
            <BarChart3 size={18} className="text-indigo-500" />
            {activeFilter === 'all' ? 'Activity Log & Status Tracker' : `Viewing: ${activeFilter}`}
          </p>
        </div>
        {activeFilter !== 'all' && (
          <button onClick={() => setActiveFilter('all')} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all">
            <X size={14} /> Reset View
          </button>
        )}
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard label="This Week" value={timeStats.thisWeek} sub="Entries" icon={<Clock />} color="text-indigo-600" bg="bg-indigo-50" isActive={activeFilter === 'thisWeek'} onClick={() => setActiveFilter('thisWeek')} />
        <StatCard label="Last Week" value={timeStats.lastWeek} sub="Entries" icon={<TrendingUp />} color="text-emerald-600" bg="bg-emerald-50" isActive={activeFilter === 'lastWeek'} onClick={() => setActiveFilter('lastWeek')} />
        <StatCard label="This Month" value={timeStats.thisMonth} sub="Total" icon={<Calendar />} color="text-blue-600" bg="bg-blue-50" isActive={activeFilter === 'thisMonth'} onClick={() => setActiveFilter('thisMonth')} />
        <StatCard label="Last Month" value={timeStats.lastMonth} sub="Total" icon={<Briefcase />} color="text-slate-600" bg="bg-slate-50" isActive={activeFilter === 'lastMonth'} onClick={() => setActiveFilter('lastMonth')} />
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        {loading ? (
          <div className="py-40 flex justify-center"><div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.15em] border-b border-slate-100">
                  <th className="px-8 py-6 text-left">Company</th>
                  <th className="px-6 py-6 text-left">Categories & Location</th>
                  <th className="px-6 py-6 text-left">Current Status</th>
                  <th className="px-8 py-6 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredList.length > 0 ? filteredList.map((app) => (
                  <tr key={app._id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform">
                          <img src={app.company_logo} alt="logo" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-slate-900 font-black text-sm uppercase tracking-tight">{app.company}</span>
                          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{app.jobType}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className="text-slate-800 font-bold text-[15px]">{app.category}</span>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-1 font-medium">
                          <MapPin size={13} className="text-indigo-400" /> {app.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                        app.status === 'Hired' ? 'bg-emerald-50 text-emerald-600' :
                        app.status === 'Rejected' ? 'bg-red-50 text-red-600' :
                        app.status === 'Call For Interview' ? 'bg-blue-50 text-blue-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          app.status === 'Hired' ? 'bg-emerald-500' :
                          app.status === 'Rejected' ? 'bg-red-500' :
                          app.status === 'Call For Interview' ? 'bg-blue-500' :
                          'bg-slate-400'
                        }`}></div>
                        {app.status || "Applied"}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button onClick={() => handleDelete(app._id)} className="p-2.5 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                         <Trash2 size={20} />
                       </button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="py-32 text-center text-slate-300 font-bold uppercase tracking-[0.2em] text-xs">No records for this timeframe</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, sub, icon, color, bg, onClick, isActive }) => (
  <div onClick={onClick} className={`cursor-pointer p-8 rounded-[32px] border transition-all duration-500 ${isActive ? 'bg-indigo-600 border-indigo-600 shadow-2xl -translate-y-2' : 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1'}`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${isActive ? 'bg-white/20 text-white' : `${bg} ${color}`}`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>{label}</p>
    <div className="flex items-baseline gap-2">
      <h3 className={`text-4xl font-black tracking-tighter ${isActive ? 'text-white' : 'text-slate-900'}`}>{value}</h3>
      <span className={`text-xs font-bold lowercase ${isActive ? 'text-indigo-100/60' : 'text-slate-300'}`}>{sub}</span>
    </div>
  </div>
);

export default ApplicationList;