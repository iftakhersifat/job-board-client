import React, { use, useState } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import { jobCategories } from "../../Data/jobCategories";
import { jobLocations } from "../../Data/jobLocations";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

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
    

    axios.post('http://localhost:5000/jobs', rest)
      .then(result => {
        if (result.data.insertedId) {
          Swal.fire({
            title: "Job Added Successfully!",
            text: "This new job has been added and published successfully.",
            icon: "success",
            confirmButtonColor: "#f97316",
          }).then(() => navigate('/myPostedJobs'));
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='max-w-6xl mx-auto mt-12 px-4 md:px-6'>
      <h1 className='text-4xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 mb-12'>
        Add New Job
      </h1>

      <form onSubmit={handleJobAdd} className='space-y-8'>

        {/* Basic Info */}
        <div className="bg-white shadow-lg rounded-3xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-700 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name='title' placeholder="Job Title" className="input input-bordered w-full focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none rounded-xl" required />
            <input type="text" name='company' placeholder="Company Name" className="input input-bordered w-full rounded-xl focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none" />
            <input type="url" name='company_logo' placeholder="Company Logo URL" className="input input-bordered w-full md:col-span-2 rounded-xl focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none" />
          </div>
        </div>

        {/* Job Location */}
        <div className="bg-white shadow-lg rounded-3xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-700 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">Job Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select name="division" className="px-3 py-2 border border-gray-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none w-full rounded-xl" value={division}
              onChange={e => { setDivision(e.target.value); setDistrict(""); }} required>
              <option value="">Select Division</option>
              {Object.keys(jobLocations).map((div, i) => <option key={i} value={div}>{div}</option>)}
            </select>

            <select name="district" className="px-3 py-2 border border-gray-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none w-full rounded-xl" value={district}
              onChange={e => setDistrict(e.target.value)} disabled={!division} required>
              <option value="">Select District</option>
              {division && jobLocations[division].map((dist, i) => <option key={i} value={dist}>{dist}</option>)}
            </select>

            <input type="text" name="location" placeholder="Specific Area / Place" className="input input-bordered w-full rounded-xl focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none" required />
          </div>
        </div>

        {/* Job Type & Category */}
        <div className="bg-white shadow-lg rounded-3xl p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold mb-1 block bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">Job Type</label>
            <select name="jobType" className="px-3 py-2 border border-gray-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none w-full rounded-xl">
              <option>On-Site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div>
            <label className="font-semibold mb-1 block bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">Job Category</label>
            <select name="category" className="px-3 py-2 border border-gray-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none w-full rounded-xl" required>
              <option value="" disabled>Select a Category</option>
              {jobCategories.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Deadline & Salary */}
        <div className="bg-white shadow-lg rounded-3xl p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="font-semibold mb-1 block bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">Application Deadline</label>
            <input type="date" name='deadline' className="input input-bordered w-full rounded-xl focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none" />
          </div>
          <div>
            <label className="font-semibold mb-1 block bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">Min Salary</label>
            <input type="text" name='min' className="input input-bordered w-full rounded-xl focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none" required />
          </div>
          <div>
            <label className="font-semibold mb-1 block bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">Max Salary</label>
            <input type="text" name='max' className="input input-bordered w-full rounded-xl focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none" />
          </div>
          <div>
            <label className="font-semibold mb-1 block bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">Currency</label>
            <select name="currency" className="px-3 py-2 border border-gray-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none w-full rounded-xl" required>
              <option value="" disabled>Select Currency</option>
              <option>BDT</option>
              <option>USD</option>
              <option>EU</option>
            </select>
          </div>
        </div>

        {/* Description, Requirements, Responsibilities */}
        <div className="bg-white shadow-lg rounded-3xl p-6 border border-gray-200 space-y-4">
          <textarea name='description' placeholder="Job Description" className="textarea textarea-bordered w-full h-28 rounded-xl focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none"></textarea>
          <textarea name='requirements' placeholder="Requirements (comma separated)" className="textarea textarea-bordered w-full h-24 rounded-xl focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none"></textarea>
          <textarea name='responsibilities' placeholder="Responsibilities (comma separated)" className="textarea textarea-bordered w-full h-24 rounded-xl focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none"></textarea>
        </div>

        {/* HR Info */}
        <div className="bg-white shadow-lg rounded-3xl p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name='hr_name' placeholder="HR Name" className="input input-bordered w-full rounded-xl focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none" required />
          <input type="email" name='hr_email' defaultValue={user.email} placeholder="HR Email" className="input input-bordered w-full rounded-xl focus:border-orange-400 focus:ring-1 focus:ring-orange-400 focus:outline-none" />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button type="submit"
            className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all">
            Add Job
          </button>
        </div>

      </form>
    </div>
  );
};

export default JobAdd;
