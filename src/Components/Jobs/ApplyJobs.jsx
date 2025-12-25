import React, { use } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEnvelope, FaFileAlt, FaGithub, FaGlobe, FaLinkedin, FaPhoneAlt, FaUser, FaLock, FaCheckCircle, FaChevronLeft } from 'react-icons/fa';

const ApplyJobs = () => {
    const { id } = useParams();
    const { user } = use(AuthContext);
    const navigate = useNavigate();

    const handleApplyForm = (e) => {
        e.preventDefault();

        const formData = {
            job_id: id,
            applicantUID: user.uid,
            applicantEmail: user.email,
            appliedDate: new Date().toISOString(),
            fullName: e.target.fullName.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            portfolio: e.target.portfolio.value,
            linkedIn: e.target.linkedin.value,
            github: e.target.github.value,
            resume: e.target.resume.value,
            status: "Applied"
        };

        axios.post("http://localhost:5000/applications", formData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Application Submitted!',
                        text: 'The hiring team will review your profile shortly.',
                        icon: 'success',
                        confirmButtonColor: '#4F46E5',
                        customClass: { popup: 'rounded-[20px]' }
                    }).then(() => navigate('/myApplications'));
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <div className='min-h-screen bg-[#F3F4F6] font-sans antialiased text-slate-900'>
            {/* Top Navigation Mockup / Breadcrumb */}
            <div className="bg-white border-b border-slate-200 py-4 px-6 mb-8">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors">
                        <FaChevronLeft size={12} /> Back to Job Details
                    </button>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <FaLock className="text-emerald-500" /> Secure Application
                    </div>
                </div>
            </div>

            <div className='max-w-6xl mx-auto px-6 pb-20'>
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* LEFT: MAIN FORM (Real-life Standard) */}
                    <div className="lg:w-2/3 space-y-6">
                        <form onSubmit={handleApplyForm} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-slate-100">
                                <h2 className="text-2xl font-bold">Submit your application</h2>
                                <p className="text-slate-500 text-sm mt-1">Please review your information carefully before submitting.</p>
                            </div>

                            <div className="p-8 space-y-10">
                                {/* Personal Info Section */}
                                <section>
                                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                        Contact Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <RealInput label="Full Name" name="fullName" placeholder="Enter your full name" required />
                                        <RealInput label="Email Address" name="email" type="email" placeholder="email@example.com" required />
                                        <RealInput label="Phone Number" name="phone" type="tel" placeholder="+880 1XXX XXXXXX" />
                                        <RealInput label="Portfolio / Website" name="portfolio" type="url" placeholder="https://..." />
                                    </div>
                                </section>

                                {/* Professional Links */}
                                <section>
                                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                        Professional Presence
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <RealInput label="LinkedIn Profile" name="linkedin" placeholder="linkedin.com/in/username" required />
                                        <RealInput label="GitHub Profile" name="github" placeholder="github.com/username" required />
                                        <div className="md:col-span-2">
                                            <RealInput label="Resume/CV Link" name="resume" placeholder="Public link to your CV (Drive, Dropbox, etc.)" required />
                                            <p className="text-xs text-slate-400 mt-2">Recommended: PDF format for better compatibility.</p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Form Footer */}
                            <div className="bg-slate-50 p-8 flex items-center justify-between border-t border-slate-200">
                                <div className="flex items-center gap-3">
                                    <input required type="checkbox" className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                                    <span className="text-sm text-slate-600 font-medium">I agree to the <span className="text-indigo-600 underline cursor-pointer">Applicant Terms</span></span>
                                </div>
                                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95">
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT: JOB SUMMARY SIDEBAR (Real-life Standard) */}
                    <div className="lg:w-1/3">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-8 shadow-sm">
                            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-[0.15em] mb-6">Job Summary</h3>
                            
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-2">
                                    <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Company" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg leading-tight">Senior Product Designer</h4>
                                    <p className="text-slate-500 text-sm mt-1">Google Inc.</p>
                                    <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase mt-2">
                                        <FaCheckCircle size={10} /> Verified Listing
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100 mb-6" />

                            <div className="space-y-4">
                                <SummaryItem label="Location" value="Remote / Dhaka" />
                                <SummaryItem label="Job Type" value="Full-Time" />
                                <SummaryItem label="Experience" value="3-5 Years" />
                            </div>

                            <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                <p className="text-[11px] text-indigo-700 font-medium leading-relaxed">
                                    Your application will be sent directly to the hiring manager at Google Inc. Make sure your links are valid.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Reusable Label/Input Pair for "Real-life" feel
const RealInput = ({ label, name, type = "text", placeholder, required = false }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            required={required}
            type={type}
            name={name}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all placeholder:text-slate-300 text-sm font-medium text-slate-800"
        />
    </div>
);

const SummaryItem = ({ label, value }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400 font-medium">{label}</span>
        <span className="text-slate-800 font-bold">{value}</span>
    </div>
);

export default ApplyJobs;