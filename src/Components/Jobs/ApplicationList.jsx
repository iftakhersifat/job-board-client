import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ApplicationList = ({ myApplicationList }) => {
  const [loading, setLoading] = useState(true);
  const [applicationList, setApplicationList] = useState([]);

  useEffect(() => {
    setLoading(true);
    myApplicationList.then(data => {
      setApplicationList(data);
      setLoading(false);
    });
  }, [myApplicationList]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/applications/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Application has been removed.', 'success');
              setApplicationList(prev => prev.filter(app => app._id !== id));
            }
          })
          .catch(err => console.log(err));
      }
    });
  };

  return (
    <div className='max-w-6xl mx-auto px-6 mt-12'>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner text-blue-500 w-10 h-10"></span>
        </div>
      )}

      {/* Empty */}
      {!loading && applicationList.length === 0 && (
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-500">No Applications</h1>
          <p className="text-gray-400 mt-2">
            Once you apply to jobs, they will appear here.
          </p>
        </div>
      )}

      {/* Application List */}
      {!loading && applicationList.length > 0 && (
        <div>
          <div className="text-center py-6 relative">
            <h1 className="text-4xl font-extrabold text-blue-600 mt-3">
              Application List
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-200">
            <table className="table w-full">
              <thead className="bg-blue-50">
                <tr className="text-gray-800 text-sm">
                  <th>#</th>
                  <th>Company</th>
                  <th>Job Details</th>
                  <th>Job Type</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {applicationList.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="font-semibold">{index + 1}</td>

                    {/* Company Logo */}
                    <td>
                      <img
                        src={user.company_logo}
                        alt="company_logo"
                        className="w-12 h-12 object-contain rounded-md border p-1 bg-white"
                      />
                    </td>

                    {/* Job Info */}
                    <td className="font-medium">
                      <p className="text-gray-800">{user.category}</p>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md mt-1 inline-block">
                        {user.location}
                      </span>
                    </td>

                    {/* Job Type */}
                    <td>
                      <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-lg">
                        {user.jobType}
                      </span>
                    </td>

                    {/* Delete */}
                    <td>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm transition"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
};

export default ApplicationList;
