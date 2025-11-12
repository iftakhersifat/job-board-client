import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const PostedJobList = ({postedJobPromise}) => {
    // keep jobs in state so we can update after delete
  const [postedJob, setPostedJob] = useState([]);

    useEffect(() => {
      postedJobPromise.then(data => setPostedJob(data));
    }, [postedJobPromise]);

  // for delete button
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/jobs/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Job has been deleted.", "success");
              // remove from state so UI updates
              setPostedJob((prev) => prev.filter((job) => job._id !== id));
            }
          })
          .catch((err) =>{
            console.log(err);
            Swal.fire("Error!", "Something went wrong.", "error");
          } );
      }
    });
  };

    return (
        <div className='max-w-6xl mx-auto mt-12 px-6 md:px-6 lg:px-0'>

            {postedJob.length === 0 ? (<div className="text-center py-20">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-500 mb-2">No Jobs Posted</h1>
      <p className="text-gray-400 text-sm sm:text-base"> You haven’t posted any jobs yet. Once you post jobs, they will appear here. </p>
    </div>) : (<div> 
    <div className="text-center py-6 px-6 relative">

          <h1 className="text-4xl md:text-5xl font-extrabold mt-6">
            <span className="text-4xl text-center font-extrabold text-blue-600 ">Posted Jobs</span>
          </h1>
        
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mx-auto mt-3 rounded-full"></div>
          </div>
    
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
    <table className="table">
    {/* head */}
    <thead className="bg-blue-50">
      <tr>
        <th>List</th>
        <th>Company</th>
        <th>Job Category & Location</th>
        <th>Deadline</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
            {postedJob.map((post, index) => (
              <tr key={post._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{post.company}</div>
                    </div>
                  </div>
                </td>
                <td> {post.title} <br /> <span className="badge badge-ghost badge-sm"> {post.location} </span>
                </td>
                <td>{post.deadline}</td>
                <td>
                  <div className='md:space-x-2 space-y-2'>
                    <button className="btn btn-xs py-4 px-3 md:py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg md:text-xs text-sm transition" onClick={() => handleDelete(post._id)}>Delete</button>
                  <Link to={`/applications/${post._id}`}>

                    <button className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-700 rounded-lg md:text-xs text-sm text-wrap transition">View Application</button>
                  </Link>
                  </div>
                </td>
                
              </tr>
            ))}
          </tbody>
  </table></div>
  
</div>)}
        </div>
    );
};

export default PostedJobList;