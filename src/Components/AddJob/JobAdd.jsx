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
            confirmButtonColor: "#4f46e5",
          }).then(() => navigate('/myPostedJobs'));
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='max-w-6xl mx-auto mt-12 px-4 md:px-6'>
      <h1 className='text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-8'>
        Add New Job
      </h1>

      <form onSubmit={handleJobAdd} className='space-y-6'>

        {/* Basic Info */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name='title' placeholder="Job Title" className="input input-bordered w-full" required />
            <input type="text" name='company' placeholder="Company Name" className="input input-bordered w-full" />
            <input type="url" name='company_logo' placeholder="Company Logo URL" className="input input-bordered w-full md:col-span-2" />
          </div>
        </div>

        {/* Job Location */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Job Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select name="division" className="select select-bordered w-full" value={division}
              onChange={e => { setDivision(e.target.value); setDistrict(""); }} required>
              <option value="">Select Division</option>
              {Object.keys(jobLocations).map((div, i) => <option key={i} value={div}>{div}</option>)}
            </select>

            <select name="district" className="select select-bordered w-full" value={district}
              onChange={e => setDistrict(e.target.value)} disabled={!division} required>
              <option value="">Select District</option>
              {division && jobLocations[division].map((dist, i) => <option key={i} value={dist}>{dist}</option>)}
            </select>

            <input type="text" name="area" placeholder="Specific Area / Place" className="input input-bordered w-full" required />
          </div>
        </div>

        {/* Job Type & Category */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold mb-1 block">Job Type</label>
            <select name="jobType" className="select select-bordered w-full">
              <option>On-Site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div>
            <label className="font-semibold mb-1 block">Job Category</label>
            <select name="category" className="select select-bordered w-full" required>
              <option value="" disabled>Select a Category</option>
              {jobCategories.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Application Deadline & Salary */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold mb-1 block">Application Deadline</label>
            <input type="date" name='deadline' className="input input-bordered w-full" />
          </div>
          <div>
            <label className="font-semibold mb-1 block">Minimum Salary</label>
            <input type="text" name='min' className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="font-semibold mb-1 block">Maximum Salary</label>
            <input type="text" name='max' className="input input-bordered w-full" />
          </div>
          <div>
            <label className="font-semibold mb-1 block">Currency</label>
            <select name="currency" className="select select-bordered w-full" required>
              <option value="" disabled>Select Currency</option>
              <option>BDT</option>
              <option>USD</option>
              <option>EU</option>
            </select>
          </div>
        </div>

        {/* Description, Requirements, Responsibilities */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 space-y-4">
          <textarea name='description' placeholder="Job Description" className="textarea textarea-bordered w-full h-28"></textarea>
          <textarea name='requirements' placeholder="Requirements (comma separated)" className="textarea textarea-bordered w-full h-24"></textarea>
          <textarea name='responsibilities' placeholder="Responsibilities (comma separated)" className="textarea textarea-bordered w-full h-24"></textarea>
        </div>

        {/* HR Info */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name='hr_name' placeholder="HR Name" className="input input-bordered w-full" required />
          <input type="email" name='hr_email' defaultValue={user.email} placeholder="HR Email" className="input input-bordered w-full" />
        </div>

        {/* Submit Button */}
        <button type="submit"
          className="w-full md:w-auto px-6 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:scale-105 transition-transform">
          Add Job
        </button>

      </form>
    </div>
  );
};

export default JobAdd;
