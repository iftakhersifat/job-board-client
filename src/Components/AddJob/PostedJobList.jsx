import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const PostedJobList = ({ postedJobPromise }) => {
  const [loading, setLoading] = useState(true);
  const [postedJob, setPostedJob] = useState([]);

  // Fetch jobs from promise
  useEffect(() => {
    setLoading(true);
    postedJobPromise.then(data => {
      // Show both Pending & Active
      const userJobs = data.filter(job =>
        job.status === "Pending" || job.status === "Active"
      );
      setPostedJob(userJobs);
      setLoading(false);
    });
  }, [postedJobPromise]);

  // Delete job handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/jobs/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Job has been deleted.", "success");
              // Remove deleted job from state
              setPostedJob(prev => prev.filter(job => job._id !== id));
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner text-info w-8 h-8"></span>
      </div>
    );
  }

  if (postedJob.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-500 mb-2">
          No Jobs Posted
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          You haven’t posted any jobs yet. Once you post jobs, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto mt-8 px-6 md:px-6 lg:px-0'>
      {/* Section Title */}
      <div className="text-center py-6 px-6 relative">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600">Posted Jobs</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Jobs Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
        <table className="table">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Job & Location</th>
              <th>Deadline & Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {postedJob.map((post, index) => (
              <tr key={post._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="font-bold">{post.company}</div>
                </td>
                <td>
                  {post.title} <br />
                  <span className="badge badge-ghost badge-sm">{post?.division}</span>
                </td>
                <td>
                  <p>{post.deadline}</p>
                  {post.status === "Pending" && (
                    <span className="mt-1 inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-md font-semibold">
                      Pending Approval
                    </span>
                  )}
                  {post.status === "Active" && (
                    <span className="mt-1 inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded-md font-semibold">
                      Approved
                    </span>
                  )}
                </td>
                <td>
                  <div className='md:space-x-2 space-y-2'>
                    {/* Delete button always visible */}
                    <button
                      className="btn mt-2 btn-xs py-4 px-3 md:py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg md:text-xs text-sm transition"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>

                    {/* Edit button only for Pending jobs */}
                    {post.status === "Pending" && (
                      <Link to={`/jobs/edit/${post._id}`}>
                        <button className="btn btn-xs py-4 px-3 md:py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg md:text-xs text-sm transition">
                          Edit
                        </button>
                      </Link>
                    )}

                    {/* View Applications button only for Active jobs */}
                    {post.status === "Active" && (
                      <Link to={`/applications/${post._id}`}>
                        <button className="px-3 py-1 text-white rounded-lg md:text-xs text-sm bg-blue-500 hover:bg-blue-700 transition">
                          View Application
                        </button>
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default PostedJobList;
