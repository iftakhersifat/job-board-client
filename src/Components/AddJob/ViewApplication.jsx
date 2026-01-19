import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router";
import Swal from "sweetalert2";
import { db } from "../Firebase/Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FaFileAlt, FaLinkedin, FaGithub, FaGlobe, FaUserCircle, FaEnvelope, FaBriefcase, FaFilter } from "react-icons/fa";

const ViewApplication = () => {
  const { id } = useParams();
  const loaderApplications = useLoaderData();
  
  // States
  const [applications, setApplications] = useState(loaderApplications);
  const [filteredApplications, setFilteredApplications] = useState(loaderApplications);
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter effect
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredApplications(applications);
    } else {
      const filtered = applications.filter(app => (app.status || "Pending") === activeFilter);
      setFilteredApplications(filtered);
    }
  }, [activeFilter, applications]);

  const handleStatus = async (e, applicationID, applicantUID, index) => {
    const newStatus = e.target.value;
    try {
      const res = await axios.patch(
        `https://job-board-server-five.vercel.app/applications/${applicationID}`,
        { status: newStatus, applicantUID }
      );

      if (res.data.modifiedCount) {
        const updatedApplications = [...applications];
        const actualIndex = applications.findIndex(app => app._id === applicationID);
        updatedApplications[actualIndex] = { ...updatedApplications[actualIndex], status: newStatus };
        
        setApplications(updatedApplications);

        Swal.fire({
          icon: "success",
          title: "Status Updated!",
          timer: 1500,
          showConfirmButton: false,
          background: '#f8fafc',
          customClass: { popup: 'rounded-3xl' }
        });

        if (applicantUID) {
          await addDoc(
            collection(db, "notifications", applicantUID, "userNotifications"),
            {
              message: `Your application status has been updated to "${newStatus}"`,
              type: "application",
              createdAt: serverTimestamp(),
            }
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hired': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'Call For Interview': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const filterOptions = ["All", "Pending", "Call For Interview", "Hired", "Rejected"];

  return (
    <div className="min-h-screen -mb-24 bg-gray-50/50 py-12 pt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <nav className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-widest">Recruitment Dashboard</nav>
            <h1 className="text-4xl font-[900] text-slate-900 tracking-tight">
              Applicants for <span className="text-blue-600 font-black italic">Target Role</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Reviewing {filteredApplications.length} candidates in <span className="text-indigo-600 font-bold">{activeFilter}</span> stage.</p>
          </div>
          <div className="h-14 w-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
             <FaBriefcase className="text-blue-500 text-xl" />
          </div>
        </div>

        {/* Dynamic Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-10 bg-white p-2 rounded-[2rem] border border-slate-200 shadow-sm w-fit">
            <div className="px-4 py-2 text-slate-400 border-r border-slate-100 mr-2 hidden md:block">
                <FaFilter size={14} />
            </div>
            {filterOptions.map((filter) => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                        activeFilter === filter 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105" 
                        : "bg-transparent text-slate-500 hover:bg-slate-50"
                    }`}
                >
                    {filter}
                </button>
            ))}
        </div>

        {/* Applicants */}
        <div className="grid grid-cols-1 gap-6">
          {filteredApplications.length > 0 ? filteredApplications.map((app, index) => (
            <div
              key={app._id}
              className="group bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                
                {/* Applicant Profile info */}
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-200">
                    {app.applicant?.charAt(0) || "A"}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl font-black text-slate-800 tracking-tight leading-none">
                        {app.applicant}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(app.status)}`}>
                        {app.status || 'Pending'}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-500 text-sm font-medium">
                      <span className="flex items-center gap-1.5 truncate">
                        <FaEnvelope className="text-slate-300" /> {app.applicantEmail}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Selection */}
                <div className="shrink-0">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 px-1">Pipeline Action</p>
                  <select
                    value={app.status || "Pending"}
                    onChange={(e) => handleStatus(e, app._id, app.applicantUID, index)}
                    className="w-full lg:w-56 h-12 px-4 rounded-2xl bg-slate-50 border-slate-200 text-slate-700 font-bold text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all cursor-pointer outline-none shadow-inner">
                    <option value="Pending">Pending</option>
                    <option value="Call For Interview">Call for Interview</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Reject Candidate</option>
                  </select>
                </div>
              </div>

              {/* Links Row */}
              <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href={app.resume} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-50 text-slate-700 hover:bg-blue-600 hover:text-white font-bold text-sm transition-all border border-slate-100 active:scale-95">
                  <FaFileAlt /> Resume
                </a>

                {app.linkedIn && (
                  <a href={app.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-sm transition-all border border-blue-100 active:scale-95">
                    <FaLinkedin /> LinkedIn
                  </a>
                )}

                {app.github && (
                  <a href={app.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 text-white hover:bg-black font-bold text-sm transition-all active:scale-95 shadow-md shadow-slate-200">
                    <FaGithub /> GitHub
                  </a>
                )}

                {app.portfolio && (
                  <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-sm transition-all border border-indigo-100 active:scale-95">
                    <FaGlobe /> Portfolio
                  </a>
                )}
              </div>
            </div>
          )) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] py-32 text-center">
                <FaUserCircle className="text-slate-100 text-8xl mx-auto mb-4 animate-pulse" />
                <h3 className="text-slate-400 font-black text-xl uppercase tracking-widest">No candidates in "{activeFilter}"</h3>
                <p className="text-slate-300 font-medium mt-2">Try switching filters to see other applicants.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewApplication;