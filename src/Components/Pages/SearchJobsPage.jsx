// SearchJobsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import JobCard from "../SearchJobs/JobCard";
import { jobCategories } from "../../Data/jobCategories";
import { jobLocations } from "../../Data/jobLocations";
import { FiFilter } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const PAGE_SIZE = 10;

const getJobDate = (job) => new Date(job.postedAt || job.createdAt || job.date || job.posted_date || Date.now());

const getJobSalaryValue = (job) => {
  const min = job?.salaryRange?.min;
  const max = job?.salaryRange?.max;
  if (min != null && max != null) return (Number(min) + Number(max)) / 2;
  if (min != null) return Number(min);
  if (max != null) return Number(max);
  return 0;
};

const SearchJobsPage = () => {
  const { searchTerm } = useParams();
  const decodedTerm = decodeURIComponent(searchTerm || "");

  const [allSearchResults, setAllSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [sortBy, setSortBy] = useState("date_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCatOpen, setIsCatOpen] = useState(true);
  const [isDivOpen, setIsDivOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const divisions = Object.keys(jobLocations || {});

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);

    axios.get("http://localhost:5000/jobs")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        const filtered = data.filter(job => String(job.title ?? "").toLowerCase().includes(decodedTerm.toLowerCase()));
        setAllSearchResults(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setAllSearchResults([]);
        setLoading(false);
      });

    setSelectedCategories([]);
    setSelectedDivisions([]);
    setSortBy("date_desc");
  }, [decodedTerm]);

  const filteredAndSorted = useMemo(() => {
    let list = [...allSearchResults];
    if (selectedCategories.length) list = list.filter(job => selectedCategories.includes(job.category));
    if (selectedDivisions.length) list = list.filter(job => selectedDivisions.includes(job.division));

    if (sortBy === "date_desc") list.sort((a, b) => getJobDate(b) - getJobDate(a));
    if (sortBy === "salary_desc") list.sort((a, b) => getJobSalaryValue(b) - getJobSalaryValue(a));
    if (sortBy === "salary_asc") list.sort((a, b) => getJobSalaryValue(a) - getJobSalaryValue(b));

    return list;
  }, [allSearchResults, selectedCategories, selectedDivisions, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE));
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(1); }, [totalPages, currentPage]);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAndSorted.slice(start, start + PAGE_SIZE);
  }, [filteredAndSorted, currentPage]);

  const toggleCategory = cat => { setCurrentPage(1); setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]); };
  const toggleDivision = div => { setCurrentPage(1); setSelectedDivisions(prev => prev.includes(div) ? prev.filter(d => d !== div) : [...prev, div]); };
  const handleClearFilters = () => { setSelectedCategories([]); setSelectedDivisions([]); setSortBy("date_desc"); setCurrentPage(1); };
  const removeTag = (type, value) => { if(type==="category") setSelectedCategories(prev => prev.filter(c => c!==value)); if(type==="division") setSelectedDivisions(prev => prev.filter(d => d!==value)); };

  return (
    <div className="max-w-6xl mx-auto mt-6 px-6 md:px-6 lg:px-0">

      {/* Top header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-600">
            Search Results: <span className="text-gray-800">"{decodedTerm}"</span>
          </h1>
          <p className="text-sm text-gray-500">
            Showing {filteredAndSorted.length} job{filteredAndSorted.length!==1?"s":""}
            {selectedCategories.length>0 || selectedDivisions.length>0?" (filtered)":""}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-sm text-gray-600">Sort by</label>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="p-2 rounded-md border bg-white">
            <option value="date_desc">Date (newest)</option>
            <option value="salary_desc">Salary (high → low)</option>
            <option value="salary_asc">Salary (low → high)</option>
          </select>

          <button onClick={()=>setMobileFiltersOpen(true)} className="sm:hidden px-3 py-2 rounded-md bg-blue-50 border flex items-center gap-2">
            <FiFilter /> Filters
          </button>
        </div>
      </div>

      {/* Active tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedCategories.map(c => <div key={c} className="flex items-center gap-2 bg-blue-50 border text-blue-800 px-3 py-1 rounded-full text-sm"><span>{c}</span><button onClick={()=>removeTag("category",c)}><AiOutlineClose /></button></div>)}
        {selectedDivisions.map(d => <div key={d} className="flex items-center gap-2 bg-green-50 border text-green-800 px-3 py-1 rounded-full text-sm"><span>{d}</span><button onClick={()=>removeTag("division",d)}><AiOutlineClose /></button></div>)}
        {(selectedCategories.length>0 || selectedDivisions.length>0) && <button onClick={handleClearFilters} className="ml-2 text-sm text-gray-600 underline">Clear All</button>}
      </div>

      <div className="flex flex-col sm:flex-row gap-5">

        {/* Desktop sidebar */}
        <aside className="hidden sm:block w-72 shrink-0 sticky top-24 h-fit">
          <div className="bg-white border rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={handleClearFilters} className="text-sm text-gray-600 hover:text-gray-800">Clear</button>
            </div>

            {/* Category */}
            <div className="mb-4">
              <button onClick={()=>setIsCatOpen(s=>!s)} className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                <span className="font-medium">Category</span><span className="text-gray-500">{isCatOpen?"−":"+"}</span>
              </button>
              {isCatOpen && <div className="mt-3 max-h-52 overflow-auto pr-2">{jobCategories.map((cat,idx)=><label key={idx} className="flex items-center gap-2 py-1"><input type="checkbox" checked={selectedCategories.includes(cat)} onChange={()=>toggleCategory(cat)} /> <span className="text-sm text-gray-700">{cat}</span></label>)}</div>}
            </div>

            {/* Division */}
            <div className="mb-2">
              <button onClick={()=>setIsDivOpen(s=>!s)} className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                <span className="font-medium">Division</span><span className="text-gray-500">{isDivOpen?"−":"+"}</span>
              </button>
              {isDivOpen && <div className="mt-3 max-h-52 overflow-auto pr-2">{divisions.map((div,idx)=><label key={idx} className="flex items-center gap-2 py-1"><input type="checkbox" checked={selectedDivisions.includes(div)} onChange={()=>toggleDivision(div)} /> <span className="text-sm text-gray-700">{div}</span></label>)}</div>}
            </div>

            <div className="mt-4"><button onClick={handleClearFilters} className="w-full py-2 rounded-md bg-gray-100 hover:bg-gray-200">Clear Filters</button></div>
          </div>
        </aside>

        {/* Main jobs */}
        <main className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{Array.from({length:PAGE_SIZE}).map((_,i)=><div key={i} className="p-4 border rounded-lg animate-pulse"><div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div><div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div><div className="h-10 bg-gray-300 rounded w-full"></div></div>)}</div>
          ) : pageItems.length===0 ? (
            <div className="text-center py-20"><h2 className="text-2xl font-semibold text-gray-600">No Jobs Found</h2><p className="text-gray-400 mt-2">Try removing some filters or changing sort.</p></div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{pageItems.map(job=><JobCard key={job._id} job={job}/>)}</div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-2">
                <p className="text-sm text-gray-500">Showing {(currentPage-1)*PAGE_SIZE+1}-{Math.min(currentPage*PAGE_SIZE,filteredAndSorted.length)} of {filteredAndSorted.length}</p>
                <div className="flex flex-wrap gap-2 items-center">
                  <button onClick={()=>setCurrentPage(p=>Math.max(1,p-1))} disabled={currentPage===1} className={`px-3 py-1 rounded-md border ${currentPage===1?"opacity-50 cursor-not-allowed":"hover:bg-gray-100"}`}>Prev</button>
                  {Array.from({length: totalPages}).map((_,idx)=>{
                    const pageNum = idx+1;
                    return <button key={pageNum} onClick={()=>setCurrentPage(pageNum)} className={`px-3 py-1 rounded-md border ${pageNum===currentPage?"bg-blue-600 text-white":"hover:bg-gray-100"}`}>{pageNum}</button>
                  })}
                  <button onClick={()=>setCurrentPage(p=>Math.min(totalPages,p+1))} disabled={currentPage===totalPages} className={`px-3 py-1 rounded-md border ${currentPage===totalPages?"opacity-50 cursor-not-allowed":"hover:bg-gray-100"}`}>Next</button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Mobile drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setMobileFiltersOpen(false)} />
          <div className="relative w-full max-h-[90vh] bg-white rounded-t-xl shadow-xl p-4 overflow-auto">
            <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold">Filters</h3><button onClick={()=>setMobileFiltersOpen(false)} className="p-1 rounded-md"><AiOutlineClose /></button></div>

            {/* Category */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2"><h4 className="font-medium">Category</h4><button className="text-sm text-gray-600" onClick={()=>setSelectedCategories([])}>Clear</button></div>
              <div className="max-h-56 overflow-auto pr-2">{jobCategories.map((cat,idx)=><label key={idx} className="flex items-center gap-2 py-1"><input type="checkbox" checked={selectedCategories.includes(cat)} onChange={()=>toggleCategory(cat)} /><span className="text-sm text-gray-700">{cat}</span></label>)}</div>
            </div>

            {/* Division */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2"><h4 className="font-medium">Division</h4><button className="text-sm text-gray-600" onClick={()=>setSelectedDivisions([])}>Clear</button></div>
              <div className="max-h-56 overflow-auto pr-2">{divisions.map((div,idx)=><label key={idx} className="flex items-center gap-2 py-1"><input type="checkbox" checked={selectedDivisions.includes(div)} onChange={()=>toggleDivision(div)} /><span className="text-sm text-gray-700">{div}</span></label>)}</div>
            </div>

            <div className="flex gap-2 mt-4"><button onClick={()=>{handleClearFilters(); setMobileFiltersOpen(false)}} className="flex-1 py-2 rounded-md bg-gray-100">Clear</button><button onClick={()=>setMobileFiltersOpen(false)} className="flex-1 py-2 rounded-md bg-blue-600 text-white">Apply</button></div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SearchJobsPage;
