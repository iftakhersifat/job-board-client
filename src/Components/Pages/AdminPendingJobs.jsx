import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AdminPendingJobs = () => {
  const [pendingJobs, setPendingJobs] = useState([]);
  const [expandedJobs, setExpandedJobs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/jobs?status=Pending')
      .then(res => setPendingJobs(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (id) => {
    setExpandedJobs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const approveJob = (id) => {
    axios.patch(`http://localhost:5000/jobs/${id}/approve`)
      .then(() => {
        Swal.fire('Approved!', 'Job is now active.', 'success');
        setPendingJobs(prev => prev.filter(job => job._id !== id));
      })
      .catch(err => console.log(err));
  };

  const rejectJob = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, reject it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`http://localhost:5000/jobs/${id}/reject`)
          .then(() => {
            Swal.fire('Rejected!', 'Job has been removed.', 'error');
            setPendingJobs(prev => prev.filter(job => job._id !== id));
          })
          .catch(err => console.log(err));
      }
    });
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading pending jobs...</div>;
  }

  if (pendingJobs.length === 0) {
    return <div className="text-center py-20 text-gray-500">No pending jobs at the moment.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4 md:px-6 lg:px-0">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Pending Jobs for Approval
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pendingJobs.map(job => (
          <div key={job._id} className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1">

            {/* Header */}
            <div
              className="flex justify-between items-center px-6 py-4 cursor-pointer bg-gray-50 rounded-t-2xl hover:bg-gray-100 transition"
              onClick={() => toggleExpand(job._id)}
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">{job.title || 'Untitled Job'}</h3>
              {expandedJobs[job._id] ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {/* Company & Status */}
            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                {job.company_logo && (
                  <img src={job.company_logo} alt="Company Logo" className="w-12 h-12 object-contain rounded-md border border-gray-200" />
                )}
                <p className="text-gray-700 font-medium">{job.company || 'Unknown Company'}</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">Pending</span>
            </div>

            {/* Expandable Details */}
            {expandedJobs[job._id] && (
              <div className="px-6 py-4 text-gray-700 space-y-2 transition-all">
                <p><strong>Job Type:</strong> {job.jobType || 'N/A'}</p>
                <p><strong>Category:</strong> {job.category || 'N/A'}</p>
                <p><strong>Location:</strong> {`${job.division || 'N/A'}, ${job.district || 'N/A'}, ${job.area || 'N/A'}`}</p>
                <p><strong>Application Deadline:</strong> {job.deadline || 'N/A'}</p>
                <p><strong>Description:</strong> {job.description || 'N/A'}</p>
                <p>
                  <strong>Requirements:</strong>{' '}
                  {job.requirements
                    ? Array.isArray(job.requirements)
                      ? job.requirements.join(', ')
                      : job.requirements
                    : 'N/A'}
                </p>
                <p>
                  <strong>Responsibilities:</strong>{' '}
                  {job.responsibilities
                    ? Array.isArray(job.responsibilities)
                      ? job.responsibilities.join(', ')
                      : job.responsibilities
                    : 'N/A'}
                </p>
                <p><strong>HR Name:</strong> {job.hr_name || 'N/A'}</p>
                <p><strong>HR Email:</strong> {job.hr_email || 'N/A'}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => approveJob(job._id)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                <FaCheck /> Approve
              </button>
              <button
                onClick={() => rejectJob(job._id)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                <FaTimes /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPendingJobs;
