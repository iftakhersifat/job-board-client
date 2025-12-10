import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch job info
  useEffect(() => {
    axios.get(`http://localhost:5000/jobs/${id}`)
      .then(res => {
        if (res.data.status === "Active") {
          Swal.fire("Not Allowed!", "This job is already approved.", "error");
          navigate("/dashboard/posted-jobs");
        } else {
          // Ensure requirements & responsibility are strings for textarea
          setJob({
            ...res.data,
            requirements: Array.isArray(res.data.requirements) ? res.data.requirements.join(", ") : res.data.requirements || "",
            responsibility: Array.isArray(res.data.responsibility) ? res.data.responsibility.join(", ") : res.data.responsibility || "",
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

  // Input Change Handler
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // Update Job to DB
  const handleUpdate = (e) => {
    e.preventDefault();

    // Convert requirements & responsibility back to array before sending
    const updatedJob = {
      ...job,
      requirements: job.requirements.split(",").map(req => req.trim()).filter(req => req),
      responsibility: job.responsibility.split(",").map(resp => resp.trim()).filter(resp => resp),
      hr_name: job.hr
    };

    axios.put(`http://localhost:5000/jobs/update/${id}`, updatedJob)
      .then(() => {
        Swal.fire("Updated!", "Job information updated successfully", "success");
        navigate("/myPostedJobs");
      })
      .catch(() => {
        Swal.fire("Error!", "Job update failed", "error");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner text-blue-600 w-12 h-12"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 shadow-2xl bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-200">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">Edit Job</h1>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Job Title */}
        <div className="form-control">
          <label className="label font-semibold">Job Title</label>
          <input type="text" name="title" value={job.title || ""} onChange={handleChange}
            className="input input-bordered w-full focus:border-blue-500 focus:ring focus:ring-blue-200 transition" required />
        </div>

        {/* Company */}
        <div className="form-control">
          <label className="label font-semibold">Company</label>
          <input type="text" name="company" value={job.company || ""} onChange={handleChange}
            className="input input-bordered w-full focus:border-blue-500 focus:ring focus:ring-blue-200 transition" required />
        </div>

        {/* Job Type */}
        <div className="form-control">
          <label className="label font-semibold">Job Type</label>
          <select name="jobType" value={job.jobType || ""} onChange={handleChange}
            className="select select-bordered w-full focus:border-blue-500 focus:ring focus:ring-blue-200 transition">
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Remote</option>
            <option>Internship</option>
          </select>
        </div>

        {/* Job Category */}
        <div className="form-control">
          <label className="label font-semibold">Job Category</label>
          <input type="text" name="category" value={job.category || ""} onChange={handleChange}
            className="input input-bordered w-full focus:border-blue-500 focus:ring focus:ring-blue-200 transition" />
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label font-semibold">Location</label>
          <input type="text" name="division" value={job.division || ""} onChange={handleChange}
            className="input input-bordered w-full focus:border-blue-500 focus:ring focus:ring-blue-200 transition" />
        </div>

        {/* Deadline */}
        <div className="form-control">
          <label className="label font-semibold">Application Deadline</label>
          <input type="date" name="deadline" value={job.deadline || ""} onChange={handleChange}
            className="input input-bordered w-full focus:border-blue-500 focus:ring focus:ring-blue-200 transition" />
        </div>

        {/* Description */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold">Job Description</label>
          <textarea name="description" value={job.description || ""} onChange={handleChange}
            className="textarea textarea-bordered w-full h-28 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"></textarea>
        </div>

        {/* Requirements */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold">Job Requirements <span className="text-sm text-gray-400">(Separate by commas)</span></label>
          <textarea name="requirements" value={job.requirements || ""} onChange={handleChange}
            className="textarea textarea-bordered w-full h-24 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"></textarea>
        </div>

        {/* Responsibility */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold">Job Responsibility <span className="text-sm text-gray-400">(Separate by commas)</span></label>
          <textarea name="responsibility" value={job.responsibility || ""} onChange={handleChange}
            className="textarea textarea-bordered w-full h-24 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"></textarea>
        </div>

        {/* HR Info */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold">HR Info</label>
          <input type="text" name="hr" value={job.hr || ""} onChange={handleChange}
            className="input input-bordered w-full focus:border-blue-500 focus:ring focus:ring-blue-200 transition" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary md:col-span-2 mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 transition">
          Update Job
        </button>

      </form>
    </div>
  );
};

export default EditJob;
