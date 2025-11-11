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
        <div className='max-w-6xl mx-auto mt-12'>
            <h1>Application Id : {id} {view.length}</h1>
              <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>List</th>
        <th>Email</th>
        <th>Resume & Others Link</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
       {
        view.map((post, index)=>
            <tr key={post._id}>
        <th>
          {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">{post.applicant}</div>
            </div>
          </div>
        </td>
        <td> {post.resume}
        </td>
        <td>
        <select  value={post.status} onChange={(e)=>handleStatus(e, post._id)}>
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
    );
};

export default ViewApplication;