import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router";
import JobCard from "../SearchJobs/JobCard";
import { jobCategories } from "../../Data/jobCategories";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { 
  FiFilter, FiChevronLeft, FiChevronRight, 
  FiMapPin, FiBriefcase, FiGrid, FiList, FiClock, FiInbox, FiTrendingUp 
} from "react-icons/fi";

const PAGE_SIZE = 10;

const getJobDate = (job) => {
  const d = job?.postedAt ?? job?.createdAt ?? job?.date ?? job?.posted_date ?? null;
  return d ? new Date(d) : new Date(0);
};

const getJobSalaryValue = (job) => {
  const min = job?.salaryRange?.min;
  const max = job?.salaryRange?.max;
  return min != null && max != null ? (Number(min) + Number(max)) / 2 : (Number(min) || Number(max) || 0);
};

const DivisionJobs = () => {
  const { division } = useParams();
  const decodedDivision = decodeURIComponent(division || "");

  // States
  const [initialDivisionJobs, setInitialDivisionJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");

  // API Data Fetching
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/jobs")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const divisionJobs = data.filter((job) => job?.division === decodedDivision);
        setInitialDivisionJobs(divisionJobs);
        setLoading(false);
      })
      .catch(() => {
        setInitialDivisionJobs([]);
        setLoading(false);
      });
  }, [decodedDivision]);

  const filteredCategories = useMemo(() => {
    return jobCategories.filter(cat => 
      cat.toLowerCase().includes(categorySearchQuery.toLowerCase())
    );
  }, [categorySearchQuery]);

  const filteredAndSorted = useMemo(() => {
    let list = [...initialDivisionJobs];
    if (selectedCategories.length > 0) {
      list = list.filter((job) => selectedCategories.includes(job.category));
    }
    
    if (sortBy === "date_desc") list.sort((a, b) => getJobDate(b) - getJobDate(a));
    if (sortBy === "salary_desc") list.sort((a, b) => getJobSalaryValue(b) - getJobSalaryValue(a));
    if (sortBy === "salary_asc") list.sort((a, b) => getJobSalaryValue(a) - getJobSalaryValue(b));
    return list;
  }, [initialDivisionJobs, selectedCategories, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE));
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAndSorted.slice(start, start + PAGE_SIZE);
  }, [filteredAndSorted, currentPage]);

  const toggleCategory = (cat) => {
    setCurrentPage(1);
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSortBy("date_desc");
    setCategorySearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans">
      
      <div className="relative pt-24 pb-6 px-6 bg-white overflow-hidden">
  {/* Subtle, Professional Background Accents */}
 <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
  </div>

  <div className="relative max-w-6xl mx-auto z-10 border-b border-slate-100 pb-16">
    <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-8">
      <NavLink to='/'><span className="hover:text-indigo-600 cursor-pointer transition-colors">Back</span></NavLink>
      <span className="text-slate-300">/</span>
      <span className="text-slate-900">{decodedDivision}</span>
    </nav>
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
      
      
      {/* Left Content */}
      <div className="max-w-xl py-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-100 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">Job Box - {decodedDivision}</span>
        </div>
        
        <h1 className="text-4xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Find Job Opportunities in <br />
          <span className="relative">
            <span className="relative z-10 text-indigo-600 italic font-bold">{decodedDivision}</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-50 -z-10"></span>
          </span>
        </h1>
        
        <p className="text-slate-600 text-lg font-normal leading-relaxed max-w-lg mb-8">
          Explore <span className="font-semibold text-slate-900">{filteredAndSorted.length} curated roles</span> designed to match your skills and career goals.
        </p>
      </div>

      {/* Right Content - Compact Stats Card */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <div className="relative bg-white border border-slate-200 p-8 rounded-2xl shadow-sm min-w-[300px]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <FiTrendingUp size={20} />
            </div>
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Market Status</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <p className="text-emerald-600 text-[11px] font-bold uppercase">Active Hiring</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-50 pt-6">
            <h2 className="text-5xl font-bold text-slate-900 tabular-nums">
              {filteredAndSorted.length}
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1">Available vacancies</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

      {/* Main Jobs Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0 -mt-10 relative z-20 pb-32">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Filter */}
          <aside className="lg:w-80 w-full shrink-0">
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 border border-slate-100 sticky top-28">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-[0.2em]">Industry Filter</h3>
                <FiFilter className="text-slate-400" />
              </div>

              {/* Category Search */}
              <div className="relative mb-6">
                <AiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search industries..."
                  value={categorySearchQuery}
                  onChange={(e) => setCategorySearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              {/* Scrollable Categories */}
              <div className="flex flex-col gap-1.5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => toggleCategory(cat)} 
                      className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                        selectedCategories.includes(cat) 
                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' 
                        : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      {selectedCategories.includes(cat) && <AiOutlineClose size={12}/>}
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 font-bold text-center py-6 italic">No categories match</p>
                )}
              </div>

              {selectedCategories.length > 0 && (
                <button 
                  onClick={handleClearFilters}
                  className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Feed Area */}
          <main className="flex-1">
             {/* Feed Header/Toolbar */}
             <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-2xl">
                    <button 
                      onClick={() => setViewMode("grid")} 
                      className={`p-3 rounded-xl transition-all ${viewMode === "grid" ? "bg-white text-indigo-600 shadow-md" : "text-slate-400 hover:text-slate-600"}`}
                    >
                      <FiGrid size={20}/>
                    </button>
                    <button 
                      onClick={() => setViewMode("list")} 
                      className={`p-3 rounded-xl transition-all ${viewMode === "list" ? "bg-white text-indigo-600 shadow-md" : "text-slate-400 hover:text-slate-600"}`}
                    >
                      <FiList size={20}/>
                    </button>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="hidden md:flex items-center gap-2 text-slate-400">
                        <FiClock size={16}/>
                        <span className="text-[10px] font-black uppercase tracking-widest">Sort:</span>
                    </div>
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)} 
                      className="w-full md:w-60 bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none"
                    >
                        <option value="date_desc">Most Recent Postings</option>
                        <option value="salary_desc">Highest Compensations</option>
                        <option value="salary_asc">Entry Level Salary</option>
                    </select>
                </div>
             </div>

             {/* Results */}
             {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
                   {[1,2,3,4].map(i => <div key={i} className="h-64 bg-white rounded-[3rem] border border-slate-50"></div>)}
                </div>
             ) : (
                <>
                  {filteredAndSorted.length > 0 ? (
                    <div className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"}`}>
                        {pageItems.map(job => (
                            <div key={job._id} className="group transition-all duration-500">
                                <JobCard job={job} viewMode={viewMode} />
                            </div>
                        ))}
                    </div>
                  ) : (
                    /* EMPTY STATE */
                    <div className="bg-white rounded-[4rem] border border-dashed border-slate-200 py-32 px-10 text-center">
                        <div className="w-28 h-28 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 text-indigo-200">
                            <FiInbox size={56} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-3">No Openings Found</h2>
                        <p className="text-slate-500 max-w-sm mx-auto font-medium mb-10 leading-relaxed">
                           We couldn't find any roles matching your current filters in {decodedDivision}. Try expanding your search.
                        </p>
                        <button 
                            onClick={handleClearFilters}
                            className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 active:scale-95"
                        >
                            Reset Search
                        </button>
                    </div>
                  )}

                  {/* PREMIUM PAGINATION */}
                  {filteredAndSorted.length > PAGE_SIZE && (
                    <div className="mt-20 flex items-center justify-center gap-3">
                        <button 
                          onClick={() => setCurrentPage(p => Math.max(1, p-1))} 
                          disabled={currentPage === 1} 
                          className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-all hover:shadow-lg"
                        >
                          <FiChevronLeft size={24}/>
                        </button>
                        
                        <div className="flex gap-3">
                          {[...Array(totalPages)].map((_, i) => (
                            <button 
                              key={i} 
                              onClick={() => setCurrentPage(i + 1)} 
                              className={`w-14 h-14 rounded-2xl font-black text-sm transition-all ${
                                currentPage === i + 1 
                                ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-110" 
                                : "bg-white text-slate-400 border border-slate-100 hover:border-indigo-200 hover:text-indigo-600"
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>

                        <button 
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} 
                          disabled={currentPage === totalPages} 
                          className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-all hover:shadow-lg"
                        >
                          <FiChevronRight size={24}/>
                        </button>
                    </div>
                  )}
                </>
             )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DivisionJobs;