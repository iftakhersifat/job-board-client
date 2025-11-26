import React, { use, useState } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import { jobCategories } from "../../Data/jobCategories";
import { jobLocations } from "../../Data/jobLocations";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const JobAdd = () => {
    const {user} = use(AuthContext);
    const [division, setDivision] = useState("");
    const [district, setDistrict] = useState("");

    // navigate
    const navigate = useNavigate();

    const handleJobAdd =e=>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        // console.log(data)

        const {min, max, currency, ...rest} = data
        rest.salaryRange = {min,max,currency}
        // console.log(rest)
        rest.requirements=rest.requirements.split(',').map(req=>req.trim())
        // console.log(rest)
        rest.responsibilities = rest.responsibilities.split(',').map(req=>req.trim())
        console.log(rest)
        rest.status="active";

        axios.post('http://localhost:5000/jobs',rest)
        .then(result=>{
            if(result.data.insertedId){
                Swal.fire({
                title: "This New Job has been Added and Published Successfully",
                icon: "success",
                draggable: true
              }).then(()=>{navigate('/')})
            }
        })
        .catch(error=>console.log(error))
    }
    return (
        <div className='max-w-6xl mx-auto mt-12'>
            {/* form for add a job */}
            <form onSubmit={handleJobAdd} className='max-w-2xl mx-auto'>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                <legend className="fieldset-legend">Basic Info</legend>
              
                <label className="label">Job Title</label>
                <input type="text" name='title' placeholder="Job title" className="input input-bordered w-full" required />
              
                <label className="label">Company Name</label>
                <input type="text" className="input input-bordered w-full" name='company' placeholder="Company Name" />
              
                {/* <label className="label">Location</label>
                <input type="text" className="input input-bordered w-full" name='location' placeholder="Company Location" /> */}
              
                <label className="label">Company Logo</label>
                <input type="url" className="input input-bordered w-full" name='company_logo' placeholder="Company URL" />
            </fieldset>

            {/* location */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
      <legend className="fieldset-legend">Job Location</legend>

      {/* Division Select */}
      <label className="label">Division</label>
      <select
        name="division"
        className="select select-bordered w-full"
        value={division}
        onChange={(e) => {
          setDivision(e.target.value);
          setDistrict(""); // reset district on division change
        }}
        required
      >
        <option value="">Select Division</option>
        {Object.keys(jobLocations).map((div, i) => (
          <option key={i} value={div}>
            {div}
          </option>
        ))}
      </select>

      {/* District Select */}
      <label className="label mt-3">District</label>
      <select
        name="district"
        className="select select-bordered w-full"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        disabled={!division}
        required
      >
        <option value="">Select District</option>
        {division &&
          jobLocations[division].map((dist, i) => (
            <option key={i} value={dist}>
              {dist}
            </option>
          ))}
      </select>

      {/* Specific Area */}
      <label className="label mt-3">Specific Area / Place</label>
      <input
        type="text"
        name="area"
        className="input input-bordered w-full"
        placeholder="e.g., Uttara, Banani, Halishohor"
        required
      />
    </fieldset>


            {/* job-type */}
            <fieldset className="fieldset max-w-2xl mx-auto bg-base-200 border-base-300 rounded-box  border p-4">
                <legend className="fieldset-legend">Job Type</legend>
            <div className="filter">
                <input className="btn filter-reset" type="radio" name="jobType" aria-label="All"/>
                <input className="btn" type="radio" name="jobType" value="On-Site" aria-label="On-Site"/>
                <input className="btn" type="radio" name="jobType" value="Remote" aria-label="Remote"/>
                <input className="btn" type="radio" name="jobType" value="Hybrid" aria-label="Hybrid"/>
            </div>
            </fieldset>

            {/* job-categories */}
            <fieldset className="fieldset max-w-2xl mx-auto bg-base-200 border-base-300 rounded-box  border p-4">
                <legend className="fieldset-legend">Job Categories</legend>
            <select className="select w-full" name="category" required>
            <option disabled value="">Select a Job Category</option>
              {jobCategories.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
            </fieldset>

            {/* application-deadline */}
            <fieldset className="fieldset max-w-2xl mx-auto bg-base-200 border-base-300 rounded-box  border p-4">
                <legend className="fieldset-legend">Application Deadline</legend>
                <input type="date" name='deadline' className="input" />
            </fieldset>

            {/* job salary range */}
            <fieldset className="fieldset max-w-2xl mx-auto bg-base-200 border-base-300 rounded-box  border p-4">
                <legend className="fieldset-legend">Application Deadline</legend>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

             {/* Minimum Salary */}
             <div>
               <label className="label font-medium">Minimum Salary</label>
               <input type="text" name='min' placeholder="Enter minimum salary" className="input input-bordered w-full" required />
             </div>
         
             {/* Maximum Salary */}
             <div>
               <label className="label font-medium">Maximum Salary</label>
               <input   type="text"   name='max'   placeholder="Enter maximum salary"   className="input input-bordered w-full" />
             </div>
         
             {/* Currency Selection */}
             <div>
               <label className="label font-medium">Currency</label>
               <select   defaultValue=""   className="select select-bordered w-full"   name="currency"  required>
                 <option disabled value="">Select a Currency</option>
                 <option>BDT</option>
                 <option>USD</option>
                 <option>EU</option>
               </select>
             </div>
           </div>
            </fieldset>

            {/* Description */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
              <legend className="fieldset-legend">Job Description</legend>
              <textarea className="textarea w-full" name='description' placeholder="Job Description"></textarea>
            </fieldset>

            {/* requirements: */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
            <legend className="fieldset-legend">Job Requirements:</legend>
            <textarea className="textarea w-full" name='requirements' placeholder="requirements (separate by comma)"></textarea>
            </fieldset>
        
            {/* responsibilities */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
            <legend className="fieldset-legend">Responsibilities</legend>
            <textarea className="textarea w-full" name='responsibilities' placeholder="responsibilities (separate by comma)"></textarea>
            </fieldset>

            {/* hr name & email */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
              <legend className="fieldset-legend">HR Info</legend>
            
              <label className="label">HR Name</label>
              <input type="text" name='hr_name'  placeholder="HR Name..." className="input input-bordered w-full" required />
            
              <label className="label">HR Email</label>
              <input type="text" className="input input-bordered w-full" name='hr_email' defaultValue={user.email} placeholder="HR Email..." />
            </fieldset>

            {/* job add button */}
            {/* button */}
            <button type="submit" className="btn mt-4 rounded-xl w-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500  text-white  px-6">Add Job </button>

            </form>
        </div>
    );
};

export default JobAdd;