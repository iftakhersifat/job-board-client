import React, { use } from 'react';
import { Link } from 'react-router';

const PostedJobList = ({postedJobPromise}) => {
    const posted = use(postedJobPromise);
    console.log(posted)
    return (
        <div className='max-w-6xl mx-auto mt-12'>
            <h1>{posted.length}</h1>

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
            {posted.map((post, index) => (
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