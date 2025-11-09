import React, { use } from 'react';

const ApplicationList = ({myApplicationList}) => {
    const applicationList = use(myApplicationList);
    console.log(applicationList)
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicationList.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td><img src={user.company_logo} alt="" /></td>
                <td>{user.category} <br />
                  <span className="badge badge-ghost badge-sm">{user.location}</span>
                </td>
                <td>{user.jobType}</td>
                <td>
                  <button
                    className="btn btn-error btn-xs"
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
    );
};

export default ApplicationList;