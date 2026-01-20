import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router';
import { FaBuilding, FaArrowLeft, FaSync, FaImage } from 'react-icons/fa';

const IMGBB_API_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const UpdateJobs = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [jobData, setJobData] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [companyLogo, setCompanyLogo] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://job-board-server-five.vercel.app/jobs/${id}`)
            .then(res => {
                if(res.data) {
                    setJobData(res.data);
                    setCompanyLogo(res.data.company_logo || "");
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setCompanyLogo(data.data.display_url);
                Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Logo uploaded!', showConfirmButton: false, timer: 2000 });
            }
        } catch (err) {
            Swal.fire("Error", "Cloud upload failed!", "error");
        } finally {
            setIsUploading(false);
        }
    };

    const handleUpdateJob = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const rawData = Object.fromEntries(formData.entries());

        const finalData = {
            ...rawData,
            company_logo: companyLogo,
            requirements: rawData.requirements.split(',').map(req => req.trim()),
            salaryRange: {
                min: rawData.min,
                max: rawData.max,
                currency: rawData.currency
            }
        };
        delete finalData._id; delete finalData.min; delete finalData.max; delete finalData.currency;

        try {
            const result = await axios.put(`https://job-board-server-five.vercel.app/jobs/update/${id}`, finalData);
            if (result.data.modifiedCount > 0) {
                Swal.fire("Success!", "Listing updated successfully", "success").then(() => navigate('/jobs-view'));
            } else {
                Swal.fire("No Changes", "Database already up to date.", "info");
            }
        } catch (error) {
            Swal.fire("Update Failed", error.message, "error");
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
            <FaSync className="animate-spin text-indigo-600" size={30} />
        </div>
    );

    return (
        <div className='min-h-screen bg-[#F8FAFC] pt-28 pb-24 px-6 lg:px-20'>
            <div className='max-w-4xl mx-auto'>
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-8 transition-all">
                    <FaArrowLeft /> Back to Dashboard
                </button>

                <form onSubmit={handleUpdateJob} className='space-y-10'>
                    {/* Role & Logo Section */}
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
                        <div className="flex items-center gap-4 mb-10 text-indigo-600">
                            <FaBuilding size={24} />
                            <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">Branding & Role</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Job Designation</label>
                                <input type="text" name='title' defaultValue={jobData?.title} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
                                <input type="text" name='company' defaultValue={jobData?.company} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" required />
                            </div>

                            {/* Image Upload Area */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Organization Logo</label>
                                <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] items-center">
                                    <div className="w-24 h-24 bg-white rounded-2xl border flex items-center justify-center overflow-hidden">
                                        {companyLogo ? <img src={companyLogo} className="w-full h-full object-contain p-2" /> : <FaImage className="text-slate-200" size={32} />}
                                    </div>
                                    <label className="flex-1 cursor-pointer">
                                        <div className="bg-white border border-slate-200 px-6 py-4 rounded-xl text-center hover:border-indigo-500 transition-all">
                                            <p className="text-xs font-black text-indigo-600 uppercase">
                                                {isUploading ? "Uploading to Cloud..." : "Pick from Gallery"}
                                            </p>
                                        </div>
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Section */}
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-indigo-500 uppercase tracking-widest ml-1">Approval Status</label>
                            <select name="status" defaultValue={jobData?.status} className="w-full px-6 py-4 bg-indigo-50 border-2 border-indigo-100 rounded-2xl font-black text-indigo-600 outline-none">
                                <option value="Active">Active (Publish)</option>
                                <option value="Pending">Pending Review</option>
                                <option value="Rejected">Rejected (Hide)</option>
                            </select>
                        </div>
                    </div>

                    {/* Salary & Requirements */}
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <input type="text" name='min' placeholder="Min" defaultValue={jobData?.salaryRange?.min} className="w-full px-6 py-4 bg-slate-50 border rounded-2xl font-bold" />
                            <input type="text" name='max' placeholder="Max" defaultValue={jobData?.salaryRange?.max} className="w-full px-6 py-4 bg-slate-50 border rounded-2xl font-bold" />
                            <select name="currency" defaultValue={jobData?.salaryRange?.currency} className="w-full px-6 py-4 bg-slate-50 border rounded-2xl font-bold">
                                <option>BDT</option><option>USD</option>
                            </select>
                        </div>
                        <textarea name='requirements' defaultValue={jobData?.requirements?.join(', ')} placeholder="Requirements (comma separated)" className="w-full px-6 py-4 bg-slate-50 border rounded-2xl font-medium min-h-[120px] outline-none"></textarea>
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" disabled={isUploading} className="px-20 py-6 bg-slate-900 text-white font-black text-sm uppercase tracking-[0.4em] rounded-full shadow-2xl hover:bg-indigo-600 transition-all transform hover:-translate-y-1">
                            {isUploading ? "Uploading Logo..." : "Save Synchronized Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateJobs;