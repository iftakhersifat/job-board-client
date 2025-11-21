import axios from 'axios';
import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import Swal from 'sweetalert2';

const ViewApplication = () => {
    const {id}= useParams();
    const view = useLoaderData();

    const handleStatus =(e, applicationID)=>{
        console.log(e.target.value, applicationID)
       axios.patch(`http://localhost:3000/applications/${applicationID}`, { status: e.target.value })
    .then(res => {
      if (res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Status Updated!",
          timer: 1500,
          showConfirmButton: false
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
    }
    
    return (
        <div className='max-w-6xl mx-auto px-6 md:px-6 lg:px-0 mt-12'>
        <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 relative mb-2"> Applicant <span className='text-violet-600'>Dashboard</span></h1>
        <div className="w-38 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-blue-500 mx-auto mt-3 rounded-full"></div>
        </div>
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
      <table className="table">
    {/* head */}
    <thead className="bg-blue-100">
      <tr>
        <th>List</th>
        <th>Email</th>
        <th>Resume & Others Link</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
       {
        view.map((post, index)=>
            <tr key={post._id}>
        <th> {index+1} </th>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">{post.applicant}</div>
            </div>
          </div>
        </td>
        <td> <a href={post.resume} target='_blank'className="text-blue-600 underline hover:text-blue-800 text-[16px]">View Resume</a> </td>
        <td>
        <select  defaultValue={post.status} onChange={(e)=>handleStatus(e, post._id)} className='border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
          <option disabled value="">Updated Status</option>
          <option>Pending</option>
          <option>Call For Interview</option>
          <option>Hired</option>
          <option>Rejected</option>
        </select>
        </td>
        
      </tr>
        
        )
       }
      
      
      
    </tbody>

  </table>
    </div>
        </div> 

    );
};

export default ViewApplication;