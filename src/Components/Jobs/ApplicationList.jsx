import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ApplicationList = ({myApplicationList}) => {
    const [applicationList, setApplicationList] = useState([]);

  // set initial state from list promise
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

            <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>List</th>
              <th>Company</th>
              <th>Job</th>
              <th>Job-Type</th>
              <th>Status</th>
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
                <td>{user.status}</td>
                <td>
                  <button
                    className="btn btn-error btn-xs" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default ApplicationList;