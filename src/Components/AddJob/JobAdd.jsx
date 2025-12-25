import React, { use, useState } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import { jobCategories } from "../../Data/jobCategories";
import { jobLocations } from "../../Data/jobLocations";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { FaPlus, FaBuilding, FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaListUl, FaUserTie, FaArrowLeft, FaChevronDown } from 'react-icons/fa';

const JobAdd = () => {
  const { user } = use(AuthContext);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const navigate = useNavigate();

  const handleJobAdd = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const { min, max, currency, ...rest } = data;
    rest.salaryRange = { min, max, currency };
    rest.requirements = rest.requirements.split(',').map(req => req.trim());
    rest.responsibilities = rest.responsibilities.split(',').map(req => req.trim());
    rest.userRole = user.role || "employee";
    rest.status = "Pending"; 

    axios.post('http://localhost:5000/jobs', rest)
      .then(result => {
        if (result.data.insertedId) {
          Swal.fire({
            title: "Listing Created!",
            text: "Your job post is now under review.",
            icon: "success",
            confirmButtonColor: "#4f46e5",
            customClass: { popup: 'rounded-[2.5rem]' }
          }).then(() => navigate('/myPostedJobs'));
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='min-h-screen bg-[#F8FAFC] pt-28 pb-24 px-4 md:px-10 lg:px-20'>
      <div className='max-w-4xl mx-auto'>
        
        {/* Navigation & Header */}
        <div className="mb-14">
            <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-[0.25em] mb-6 transition-all">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </button>
            <div className="flex items-end justify-between border-b border-slate-200 pb-8">
                <div>
                    <h1 className='text-5xl font-[1000] text-slate-900 tracking-tighter leading-none'>Create a Job</h1>
                    <p className="text-slate-500 font-medium mt-3 text-lg">Fill in the details to publish your recruitment listing.</p>
                </div>
                <div className="hidden lg:block text-right">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated As</span>
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-bold text-slate-700">{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>

        <form onSubmit={handleJobAdd} className='space-y-10'>

          {/* 1. Company Information */}
          <div className="group bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
                    <FaBuilding size={20} />
                </div>
                <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Company Identity</h2>
                    <p className="text-xs text-slate-400 mt-1 font-bold">Public information about the employer</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Job Designation</label>
                    <input type="text" name='title' placeholder="e.g. Lead Software Engineer" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none font-bold text-slate-700 transition-all" required />
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Organization Name</label>
                    <input type="text" name='company' placeholder="e.g. Google LLC" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none font-bold text-slate-700 transition-all" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Company Logo URL</label>
                    <input type="url" name='company_logo' placeholder="https://cloud.storage/logo.png" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none font-bold text-slate-700 transition-all" />
                </div>
            </div>
          </div>

          {/* 2. Placement Details */}
          <div className="group bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt size={20} />
                </div>
                <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Placement & Reach</h2>
                    <p className="text-xs text-slate-400 mt-1 font-bold">Define where this role is located</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                    <select name="division" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all appearance-none cursor-pointer" value={division}
                    onChange={e => { setDivision(e.target.value); setDistrict(""); }} required>
                    <option value="">Division</option>
                    {Object.keys(jobLocations).map((div, i) => <option key={i} value={div}>{div}</option>)}
                    </select>
                    <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none size-3" />
                </div>

                <div className="relative">
                    <select name="district" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all appearance-none cursor-pointer disabled:opacity-50" value={district}
                    onChange={e => setDistrict(e.target.value)} disabled={!division} required>
                    <option value="">District</option>
                    {division && jobLocations[division].map((dist, i) => <option key={i} value={dist}>{dist}</option>)}
                    </select>
                    <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none size-3" />
                </div>

                <input type="text" name="location" placeholder="Specific Area" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none font-bold text-slate-700 transition-all" required />
            </div>
          </div>

          {/* 3. Salary & Classification */}
          <div className="group bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-100 group-hover:scale-110 transition-transform">
                    <FaMoneyBillWave size={20} />
                </div>
                <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Compensation Details</h2>
                    <p className="text-xs text-slate-400 mt-1 font-bold">Salary range and job classification</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Market Category</label>
                <select name="category" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all appearance-none cursor-pointer" required>
                  <option value="" disabled>Select Category</option>
                  {jobCategories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Working Model</label>
                <select name="jobType" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all appearance-none cursor-pointer">
                  <option>On-Site</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Deadline</label>
                <input type="date" name='deadline' className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Min Salary</label>
                <input type="text" name='min' placeholder="Min" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Max Salary</label>
                <input type="text" name='max' placeholder="Max" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Currency</label>
                <select name="currency" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all appearance-none cursor-pointer" required>
                  <option>BDT</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. Description & Skills */}
          <div className="group bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-purple-100 group-hover:scale-110 transition-transform">
                    <FaListUl size={20} />
                </div>
                <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Role Content</h2>
                    <p className="text-xs text-slate-400 mt-1 font-bold">Detailed scope and requirements</p>
                </div>
            </div>
            <div className="space-y-8">
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Job Description</label>
                    <textarea name='description' placeholder="Summarize the core purpose of the role..." className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:bg-white focus:border-indigo-500 outline-none font-medium text-slate-600 transition-all h-40 leading-relaxed"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 text-indigo-500">Applicant Requirements</label>
                        <textarea name='requirements' placeholder="React, Node.js, 3+ years experience..." className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:bg-white focus:border-indigo-500 outline-none font-medium text-slate-600 transition-all h-32 leading-relaxed"></textarea>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 text-emerald-500">Daily Responsibilities</label>
                        <textarea name='responsibilities' placeholder="Team leadership, Architecture design..." className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl focus:bg-white focus:border-indigo-500 outline-none font-medium text-slate-600 transition-all h-32 leading-relaxed"></textarea>
                    </div>
                </div>
            </div>
          </div>

          {/* 5. HR Authority (Contrast Card) */}
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-12 shadow-2xl shadow-indigo-200/20 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="flex items-center gap-4 mb-10 relative">
                <div className="w-12 h-12 bg-white/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-white/10">
                    <FaUserTie size={20} />
                </div>
                <div>
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] leading-none">Authority Contact</h2>
                    <p className="text-xs text-slate-400 mt-1 font-bold">Identity of the hiring manager</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Legal HR Name</label>
                    <input type="text" name='hr_name' placeholder="Full Legal Name" className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:bg-white/10 focus:border-indigo-400 outline-none font-bold text-white transition-all shadow-sm" required />
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Email</label>
                    <input type="email" name='hr_email' defaultValue={user.email} className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:bg-white/10 focus:border-indigo-400 outline-none font-bold text-slate-400 transition-all shadow-sm cursor-not-allowed" readOnly />
                </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-10 flex flex-col items-center">
            <button type="submit"
              className="group relative flex items-center gap-4 px-16 py-6 bg-indigo-600 text-white font-black text-sm uppercase tracking-[0.4em] rounded-full shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-2 transition-all duration-300 active:scale-95">
              <FaPlus className="group-hover:rotate-180 transition-transform duration-500" /> Post Position
            </button>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-10 opacity-60">By clicking, you confirm this listing follows company policy</p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default JobAdd;