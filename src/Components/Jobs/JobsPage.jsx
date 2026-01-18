import React, { use, Suspense } from 'react';
import { Link } from 'react-router';
import { FaLocationDot } from "react-icons/fa6";
import { FiArrowUpRight, FiLayers, FiAlertCircle, FiZap, FiClock } from "react-icons/fi";
import { Briefcase } from 'lucide-react';

// --- JobCard Component ---
const JobCard = ({ job, showTimeAgo = true }) => {
  
  const calculateDaysLeft = (deadline) => {
    if (!deadline) return null;
    const diff = new Date(deadline) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const formatTimeAgo = (createdAt, id) => {
    const postDate = createdAt ? new Date(createdAt) : new Date(parseInt(id.substring(0, 8), 16) * 1000);
    const now = new Date();
    const diffInMs = now - postDate;
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 60) return `${diffInMins} mins ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${diffInDays} days ago`;
  };

  const daysLeft = calculateDaysLeft(job.deadline);
  const timeAgo = formatTimeAgo(job.createdAt, job._id);

  return (
    <div className="group relative flex flex-col bg-white border border-slate-200 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:border-indigo-100">
      
      {/* --- Urgent Badge --- */}
      {daysLeft !== null && daysLeft > 0 && daysLeft <= 10 && (
        <div className="absolute -top-3 left-8 z-20 bg-red-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-red-200 animate-pulse border-2 border-white">
          {daysLeft === 1 ? "⚠️ LAST DAY" : `⏳ ${daysLeft} DAYS LEFT`}
        </div>
      )}

      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-3 shadow-inner group-hover:bg-white group-hover:scale-110 transition-all duration-500">
          <img src={job.company_logo} alt={job.company} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1.5 rounded-full border border-slate-200 uppercase tracking-wider">
            {job.jobType}
          </span>
          
          {/* --- Time Ago Badge (Urgent সেকশনে এটি লুকানো থাকবে) --- */}
          {showTimeAgo && (
            <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black px-2.5 py-1 rounded-md border border-indigo-100 uppercase flex items-center gap-1">
               <FiClock size={10} /> {timeAgo}
            </span>
          )}
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
             <FaLocationDot /> {job.location || job.division}
           </span>
        </div>
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
  );
};

// --- JobsList Component ---
const JobsList = ({ jobsPromise }) => {
  const jobs = use(jobsPromise);
  const now = new Date();

  if (!jobs || jobs.length === 0) return <p className="text-center py-20 text-slate-500">No jobs found.</p>;

  const activeJobs = jobs.filter(job => job.status === "Active");

  const urgentJobs = activeJobs.filter(job => {
    if (!job.deadline) return false;
    const deadline = new Date(job.deadline);
    const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 10;
  });

  const newJobs = activeJobs.filter(job => {
    const postDate = job.createdAt ? new Date(job.createdAt) : new Date(parseInt(job._id.substring(0, 8), 16) * 1000);
    const diffDays = Math.ceil((now - postDate) / (1000 * 60 * 60 * 24));
    const isUrgent = urgentJobs.some(u => u._id === job._id);
    return diffDays <= 5 && !isUrgent;
  });

  const otherJobs = activeJobs.filter(job => 
    !urgentJobs.some(u => u._id === job._id) && !newJobs.some(n => n._id === job._id)
  );

  const SectionTitle = ({ icon: Icon, title, color }) => (
    <div className="flex items-center gap-3 mb-8 mt-16">
      <div className={`p-2 rounded-lg text-white ${color}`}><Icon size={20} /></div>
      <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{title}</h2>
    </div>
  );

  return (
    <div className="pb-20">
      {/* Urgent Section: এখানে showTimeAgo={false} করা হয়েছে */}
      {urgentJobs.length > 0 && (
        <section>
          <SectionTitle icon={FiAlertCircle} title="Urgent: Closing Soon" color="bg-red-500 shadow-lg shadow-red-100" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {urgentJobs.map(job => <JobCard key={job._id} job={job} showTimeAgo={false} />)}
          </div>
        </section>
      )}

      {newJobs.length > 0 && (
        <section>
          <SectionTitle icon={FiZap} title="Newly Posted" color="bg-amber-500 shadow-lg shadow-amber-100" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newJobs.map(job => <JobCard key={job._id} job={job} />)}
          </div>
        </section>
      )}

      {otherJobs.length > 0 && (
        <section>
          <SectionTitle icon={Briefcase} title="Explore More Opportunities" color="bg-indigo-600 shadow-lg shadow-indigo-100" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherJobs.map(job => <JobCard key={job._id} job={job} />)}
          </div>
        </section>
      )}
    </div>
  );
};

// --- Main Page Component ---
const JobsPage = () => {
  const jobsPromise = fetch('https://job-board-server-five.vercel.app/jobs').then(res => res.json());

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 -mb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Briefcase size={20} />
            </div>
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em]">Career Portal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-4">
            Browse All <span className="text-indigo-600">Available Jobs</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-xl">
            Explore your next career move with top-tier companies.
          </p>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-slate-200/50 animate-pulse rounded-[2.5rem]"></div>
            ))}
          </div>
        }>
          <JobsList jobsPromise={jobsPromise} />
        </Suspense>
      </div>
    </div>
  );
};

export default JobsPage;