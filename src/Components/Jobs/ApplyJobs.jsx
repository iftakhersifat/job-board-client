import React, { use } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEnvelope, FaFileAlt, FaGithub, FaGlobe, FaLinkedin, FaPhoneAlt, FaUser } from 'react-icons/fa';

const ApplyJobs = () => {
    const { id } = useParams();
    const { user } = use(AuthContext);

    const navigate = useNavigate();

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

        axios.post("http://localhost:5000/applications", formData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Your Application has been Submitted",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => navigate('/myApplications'));
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <div className='mt-12 flex justify-center px-4 sm:px-6 lg:px-0'>
            <form onSubmit={handleApplyForm} className="w-full max-w-3xl">
                <fieldset className="bg-white/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-lg">
                    {/* Title */}
                    <legend className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 bg-clip-text text-transparent">
                        Apply for This Job
                    </legend>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Full Name</label>
                            <div className='relative'>
                                <span className='absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-lg'><FaUser /></span>
                                <input
                                    required
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Your Full Name"
                                    className="w-full pl-12 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
                            <div className='relative'>
                                <span className='absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-lg'><FaEnvelope /></span>
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Your Email"
                                    className="w-full pl-12 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Phone Number</label>
                            <div className='relative'>
                                <span className='absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-lg'><FaPhoneAlt /></span>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Your Phone Number"
                                    className="w-full pl-12 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* LinkedIn */}
                        <div>
                            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">LinkedIn Profile</label>
                            <div className='relative'>
                                <span className='absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-lg'><FaLinkedin /></span>
                                <input
                                    required
                                    type="url"
                                    id="linkedin"
                                    name="linkedin"
                                    placeholder="LinkedIn profile link"
                                    className="w-full pl-12 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* GitHub */}
                        <div>
                            <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">GitHub Profile</label>
                            <div className='relative'>
                                <span className='absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-lg'><FaGithub /></span>
                                <input
                                    required
                                    type="url"
                                    id="github"
                                    name="github"
                                    placeholder="GitHub profile link"
                                    className="w-full pl-12 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Portfolio */}
                        <div>
                            <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Portfolio Link</label>
                            <div className='relative'>
                                <span className='absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-lg'><FaGlobe /></span>
                                <input
                                    type="url"
                                    id="portfolio"
                                    name="portfolio"
                                    placeholder="Portfolio website link"
                                    className="w-full pl-12 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Resume (full width) */}
                        <div className="md:col-span-2">
                            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Resume Link</label>
                            <div className='relative'>
                                <span className='absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-lg'><FaFileAlt /></span>
                                <input
                                    required
                                    type="url"
                                    id="resume"
                                    name="resume"
                                    placeholder="Your Resume link"
                                    className="w-full pl-12 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="mb-6 flex items-center mt-4">
                        <input required type="checkbox" id="terms" name="terms"
                            className="mr-2 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400" />
                        <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-200">
                            I agree to the <a href="#" className="text-orange-500 underline">Terms & Conditions</a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit"
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        Apply Now
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

export default ApplyJobs;
