import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaRegCheckCircle, FaClipboardList, FaArrowLeft } from "react-icons/fa";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://job-board-server-five.vercel.app/jobs/${id}`)
      .then(res => {
        if (res.data.status === "Active") {
          Swal.fire({
            title: "Access Denied",
            text: "Approved jobs cannot be edited. Please contact support.",
            icon: "warning",
            confirmButtonColor: "#4f46e5"
          });
          navigate("/dashboard/posted-jobs");
        } else {
          setJob({
            ...res.data,
            requirements: Array.isArray(res.data.requirements) ? res.data.requirements.join(", ") : res.data.requirements || "",
            responsibilities: Array.isArray(res.data.responsibilities) ? res.data.responsibilities.join(", ") : res.data.responsibilities || "",
            hr: res.data.hr_name || ""
          });
        }
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error!", "Unable to load job info", "error");
        navigate("/dashboard/posted-jobs");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedJob = {
      ...job,
      requirements: job.requirements.split(",").map(req => req.trim()).filter(req => req),
      responsibilities: job.responsibilities.split(",").map(resp => resp.trim()).filter(resp => resp),
      hr_name: job.hr
    };

    axios.put(`https://job-board-server-five.vercel.app/jobs/update/${id}`, updatedJob)
      .then(() => {
        Swal.fire({
            title: "Listing Updated",
            text: "Job information has been successfully synchronized.",
            icon: "success",
            confirmButtonColor: "#4f46e5"
        });
        navigate("/myPostedJobs");
      })
      .catch(() => {
        Swal.fire("Error!", "Job update failed", "error");
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#F8FAFC]">
        <span className="loading loading-ring loading-lg text-indigo-600"></span>
        <p className="mt-4 text-slate-400 font-black text-[10px] uppercase tracking-widest">Opening Editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-20 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-all"
            >
                <FaArrowLeft /> Back to List
            </button>
            <div className="text-right">
                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100">
                    Draft Mode
                </span>
            </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 p-10 text-center">
             <h1 className="text-3xl font-[1000] text-white tracking-tight flex items-center justify-center gap-4">
                <FaEdit className="text-indigo-400" /> Edit Listing
             </h1>
             <p className="text-slate-400 mt-2 font-medium">Refine your job post details to attract the best talent</p>
          </div>

          <form onSubmit={handleUpdate} className="p-8 md:p-12 space-y-10">
            
            {/* --- Section 1: Basic Information --- */}
            <div>
                <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
                    <FaBriefcase className="text-indigo-500" />
                    <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Primary Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Job Title</label>
                        <input type="text" name="title" value={job.title || ""} onChange={handleChange}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all shadow-sm" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Organization Name</label>
                        <input type="text" name="company" value={job.company || ""} onChange={handleChange}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all shadow-sm" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Employment Type</label>
                        <select name="jobType" value={job.jobType || ""} onChange={handleChange}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all shadow-sm appearance-none">
                            <option>Full-Time</option>
                            <option>Part-Time</option>
                            <option>Remote</option>
                            <option>Internship</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Functional Category</label>
                        <input type="text" name="category" value={job.category || ""} onChange={handleChange}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all shadow-sm" />
                    </div>
                </div>
            </div>

            {/* --- Section 2: Logistics --- */}
            <div>
                <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
                    <FaMapMarkerAlt className="text-indigo-500" />
                    <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Logistics & Timeline</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Office Location / Division</label>
                        <input type="text" name="division" value={job.division || ""} onChange={handleChange}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all shadow-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Submission Deadline</label>
                        <div className="relative">
                            <input type="date" name="deadline" value={job.deadline || ""} onChange={handleChange}
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all shadow-sm" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Section 3: Detailed Content --- */}
            <div>
                <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
                    <FaClipboardList className="text-indigo-500" />
                    <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Job Content</h2>
                </div>
                <div className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Role Description</label>
                        <textarea name="description" value={job.description || ""} onChange={handleChange}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:bg-white focus:border-indigo-500 outline-none font-medium text-slate-600 transition-all shadow-sm h-32 leading-relaxed"></textarea>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Applicant Requirements (CSV)</label>
                        <textarea name="requirements" value={job.requirements || ""} onChange={handleChange}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:bg-white focus:border-indigo-500 outline-none font-medium text-slate-600 transition-all shadow-sm h-28 leading-relaxed"></textarea>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Key Responsibilities (CSV)</label>
                        <textarea name="responsibilities" value={job.responsibilities || ""} onChange={handleChange}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl focus:bg-white focus:border-indigo-500 outline-none font-medium text-slate-600 transition-all shadow-sm h-28 leading-relaxed"></textarea>
                    </div>
                </div>
            </div>

            {/* --- Section 4: Point of Contact --- */}
            <div className="bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100/50">
                <div className="flex items-center gap-3 mb-4">
                    <FaRegCheckCircle className="text-indigo-600" />
                    <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Hiring Authority</h2>
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">HR Representative Name</label>
                    <input type="text" name="hr" value={job.hr || ""} onChange={handleChange}
                        className="w-full px-6 py-4 bg-white border border-indigo-100 rounded-2xl focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all shadow-sm" />
                </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 flex flex-col md:flex-row gap-4">
                <button 
                    type="submit" 
                    className="flex-1 bg-indigo-600 hover:bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-indigo-100 active:scale-95"
                >
                    Update Listing & Notify Team
                </button>
                <button 
                    type="button" 
                    onClick={() => navigate(-1)}
                    className="px-10 bg-slate-100 hover:bg-slate-200 text-slate-500 font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-2xl transition-all"
                >
                    Cancel
                </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJob;