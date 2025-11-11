import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const PostedJobList = ({postedJobPromise}) => {
    // keep jobs in state so we can update after delete
  const [postedJob, setPostedJob] = useState([]);

  // set initial state from list promise
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
        <div className='max-w-6xl mx-auto mt-12'>
            <h1>{postedJob.length}</h1>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>List</th>
        <th>Company</th>
        <th>Job Category & Location</th>
        <th>Deadline</th>
        <th></th>
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
                <td>
                  {post.title}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {post.location}
                  </span>
                </td>
                <td>{post.deadline}</td>
                <td>
                  <button
                    className="btn text-white btn-error btn-xs"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </td>
                <th>
                  <Link to={`/applications/${post._id}`}>
                    <button className="btn bg-blue-400 text-white rounded-box px-4 py-3 hover:bg-blue-600 btn-xs">
                      View Application
                    </button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
  </table>
</div>
        </div>
    );
};

export default PostedJobList;