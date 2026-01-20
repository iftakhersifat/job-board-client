import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEnvelope, FaFileAlt, FaGithub, FaGlobe, FaLinkedin, FaPhoneAlt, FaUser, FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const ApplyJobs = () => {
    const { id } = useParams();
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const [job, setJob] = useState(null);

    useEffect(() => {
        axios.get(`https://job-board-server-five.vercel.app/jobs/${id}`)
            .then(res => setJob(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleApplyForm = (e) => {
        e.preventDefault();

        const formData = {
            id,
            applicantUID: user.uid,
            applicant: user.displayName || user.email,
            applicantEmail: user.email,
            fullName: e.target.fullName.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            portfolio: e.target.portfolio.value,
            linkedIn: e.target.linkedin.value,
            github: e.target.github.value,
            resume: e.target.resume.value
        };

        axios.post("https://job-board-server-five.vercel.app/applications", formData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Application Received!",
                        text: "Your profile has been shared with the hiring team.",
                        icon: "success",
                        confirmButtonColor: '#4f46e5',
                        padding: '2rem',
                        customClass: { popup: 'rounded-[2rem]' }
                    }).then(() => navigate('/myApplications'));
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <div className='min-h-screen bg-[#F9FAFB] mt-16 pt-16 pb-24 px-4 md:px-8'>
            <div className='max-w-6xl mx-auto'>
                
                <div className="mb-10">
                    <Link to={`/jobs/${id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-all mb-4">
                        <FaArrowLeft /> Back to Job Details
                    </Link>
                    <h1 className="text-4xl font-[1000] text-slate-900 tracking-tight">Submit Application</h1>
                    <p className="text-slate-500 font-medium">Applying for <span className="text-indigo-600 font-bold">{job?.title}</span> at {job?.company}</p>
                </div>

                <div className='flex flex-col lg:flex-row gap-12 items-start'>
                    
                    {/* Left Side */}
                    <div className='w-full lg:w-2/3'>
                        <form onSubmit={handleApplyForm} className="space-y-8">
                            
                            {/* Information */}
                            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                                    <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Personal Details</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                        <input required name="fullName" type="text" placeholder="e.g. Your Name" 
                                               className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all font-semibold text-slate-700" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Contact Email</label>
                                        <input required name="email" type="email" placeholder="your@gmail.com"
                                               className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all font-semibold text-slate-700" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                                        <input name="phone" type="tel" placeholder="+880 1XXX XXXXXX"
                                               className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all font-semibold text-slate-700" />
                                    </div>
                                </div>
                            </div>

                            {/* Links */}
                            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                                    <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Profiles & Portfolio</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">LinkedIn Profile</label>
                                        <input required name="linkedin" type="url" placeholder="https://linkedin.com/in/username"
                                               className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all font-semibold text-slate-700" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Portfolio</label>
                                        <input required name="portfolio" type="url" placeholder="https://portfolio.com/username"
                                               className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all font-semibold text-slate-700" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">GitHub</label>
                                        <input required name="github" type="url" placeholder="https://github.com/username"
                                               className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all font-semibold text-slate-700" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Resume / CV Link (PDF)</label>
                                        <input required name="resume" type="url" placeholder="Link to Google Drive or Dropbox file"
                                               className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all font-semibold text-slate-700" />
                                    </div>
                                </div>
                            </div>

                            {/* Submission Area */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 bg-white border border-slate-200 rounded-3xl shadow-sm">
                                <div className="flex items-start gap-3">
                                    <input required type="checkbox" id="terms" className="mt-1 w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer" />
                                    <label htmlFor="terms" className="text-xs font-bold text-slate-500 leading-snug cursor-pointer">
                                        I confirm that all the information provided is <br className="hidden md:block"/> accurate and matches my professional experience.
                                    </label>
                                </div>
                                <button type="submit" className="w-full md:w-auto px-12 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-indigo-600 shadow-xl shadow-slate-200 hover:shadow-indigo-100 transition-all active:scale-95">
                                    Send Application
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side */}
                    <div className='w-full lg:w-1/3 lg:sticky lg:top-32'>
                        <div className='bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm'>
                            <div className="relative p-8 text-center overflow-hidden bg-white">

                        <div className="absolute top-[-20%] left-[-10%] w-40 h-40 bg-indigo-200 rounded-full blur-[50px] opacity-60"></div>
                        <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-blue-200 rounded-full blur-[50px] opacity-60"></div>
                        
                        {/* Content Area */}
                        <div className="relative z-10">
                            <div className="inline-block relative">
                                <img 
                                    src={job?.company_logo || "/assets/placeholder-logo.png"} 
                                    alt="logo" 
                                    className='w-20 h-20 rounded-[1.5rem] mx-auto bg-white/80 backdrop-blur-sm border border-white shadow-xl object-contain p-3 mb-5 transition-transform duration-500 hover:scale-110'/></div>
                            <h2 className='text-2xl font-[1000] text-slate-800 tracking-tight leading-none'>{job?.company}</h2>
                            <div className="mt-3 flex items-center justify-center gap-2">
                                <p className="text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase">
                                    {job?.location}
                                </p>
                            </div>
                            </div>
                           </div>
                            
                            <div className='p-8 space-y-6'>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
                                        <FaBriefcase />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Position</p>
                                        <p className="text-sm font-bold text-slate-700">{job?.title}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600">
                                        <FaMoneyBillWave />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Salary Range</p>
                                        <p className="text-sm font-bold text-slate-700">{job?.salaryRange?.min} - {job?.salaryRange?.max} {job?.salaryRange?.currency?.toUpperCase()}</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                                        <FaCheckCircle /> Verified Hiring Team
                                    </div>
                                    <p className="text-[11px] text-slate-400 font-medium mt-2 leading-relaxed">
                                        Applications are directly sent to the recruiter's dashboard for immediate review.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ApplyJobs;