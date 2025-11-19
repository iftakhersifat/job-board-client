import React, { use } from 'react';
import JobCard from './JobCard';

const Jobs = ({ jobsPromise }) => {
  const jobs = use(jobsPromise);

  return (
    <div className='max-w-6xl mx-auto'>
      
      {/* Hot Jobs Header */}
      <div className="text-center py-14 px-6 relative">
        <h1 className="text-4xl md:text-5xl font-extrabold mt-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600">
            Hot Jobs
          </span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-3 rounded-full"></div>
        <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-base md:text-lg">
          Discover the latest career opportunities and apply to positions that align with your passion and expertise.
        </p>
      </div>

      {/* Job Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 px-6 md:px-6 lg:px-0 gap-4'>
        {jobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
