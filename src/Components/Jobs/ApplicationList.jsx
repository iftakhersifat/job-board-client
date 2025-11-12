import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ApplicationList = ({myApplicationList}) => {
    const [applicationList, setApplicationList] = useState([]);

  useEffect(() => {
    myApplicationList.then(data => setApplicationList(data));
  }, [myApplicationList]);

    const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/applications/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Application has been deleted.', 'success');
              setApplicationList(prev => prev.filter(user => user._id !== id));
            }
          })
          .catch(err => console.log(err));
      }
    });
  };
    return (
        <div className='max-w-6xl mx-auto px-6 md:px-6 lg:px-0 mt-24'>

           {applicationList.length === 0 ? (<div className="text-center py-20">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-500 mb-2">No Applications</h1>
      <p className="text-gray-400 text-sm sm:text-base"> You haven’t applied to any jobs yet. Once you apply, your applications will appear here.</p> </div>): (<div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
        <table className="table w-full">
          <thead className="bg-blue-50">
            <tr>
              <th>List</th>
              <th>Company</th>
              <th>Job</th>
              <th>Job-Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicationList.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td><img src={user.company_logo} alt="company_logo" /></td>
                <td>{user.category} <br />
                  <span className="badge badge-ghost badge-sm">{user.location}</span>
                </td>
                <td>{user.jobType}</td>
                <td>
                  <button
                    className="btn btn-xs py-4 px-3 md:py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg md:text-xs text-sm transition" onClick={() => handleDelete(user._id)}> Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)} 
        </div>
    );
};

export default ApplicationList;